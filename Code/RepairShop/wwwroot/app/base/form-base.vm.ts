module App.ViewModels
{
    export interface IRefreshResult<T>
    {
        cached: boolean;
        m: T;
    }

    export interface IFormBaseScope<T extends BaseViewModel> extends IBaseScope <T>
    {
        form: ng.IFormController
    }

    export class FormBaseViewModel<T extends Models.BaseModel> extends BaseViewModel
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static get $inject()
        {
            return ["$http", "$q", "$location", "$route", "$routeParams", "zStorageWip",
                Services.BreezeService.serviceId];
        };

        //#endregion

        //#region Private Properties

        private _propertyChangedSubscribtionKey: number = null;
        
        //#endregion

        //#region Protected Properties

        protected _entityType: breeze.IStructuralType = null;
        protected _isDirty: boolean = false;
        protected _isNew: boolean = true;
        protected _m: T;
        protected _propertiesDirtyCheck = new Map<string, boolean>();
        protected _returnUrl = "";
        protected _toolbar: Helpers.IToolbar = {
            title: "New Entity",
            summary: "Create new entity.",
            backColor: "gray",
            color: "white",
            actions: [
                {
                    title: "",
                    tooltip: null,//{ title: "Reset", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "refresh",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.refresh_click()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Save", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "check",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.save_click()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Save And Close", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "done_all",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.saveAndClose_click()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Save and New", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "add",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.saveAndNew_click()
                },
                {
                    title: "",
                    tooltip: null,//{ title: "Cancel", position: App.Components.TooltipPosition[App.Components.TooltipPosition.bottom] },
                    icon: "close",
                    color: "white",
                    backColor: "transparent",
                    click: (e) => this.cancel_click()
                }
            ]
        };

        //#endregion

        //#region Public Properties
        
        public get entityType(): breeze.IStructuralType { return this._entityType; }
        public get isNew(): boolean { return this._isNew; } //{ return !this._user || this._user.entityAspect.entityState.isAdded(); }
        public get m(): T { return this._m; }
        public get returnUrl(): string { return this._returnUrl; }
        public get toolbar(): Helpers.IToolbar { return this._toolbar; }

        //#endregion

        //#region Constructors

        constructor(protected $http: ng.IHttpService,
            protected $q: ng.IQService,
            protected $location: ng.ILocationService,
            protected $route: any,
            protected $routeParams: ng.route.IRouteParamsService,
            protected zStorageWip: BreezeStorageWip.IzStorageWipService,
            protected breezeFactory: Services.BreezeService,
            entityType: breeze.IStructuralType,
            protected newUrl: string,
            private listUrl: string,
            private newModelConfiguration: any)
        {
            super();

            if (breezeFactory.entityManager.hasChanges())
                breezeFactory.entityManager.rejectChanges();

            // Set Return Url
            if ($routeParams["returnUrl"] !== undefined) { this._returnUrl = decodeURI($routeParams["returnUrl"]); }

            // Store entitty type
            this._entityType = entityType;

            // Fix toolbar title
            this.toolbar.title = "New " + this.entityType.shortName;

            // Flag whether this form is used to create a new user or to edit an existing one.
            this._isNew = $route.current.$$route.originalPath == newUrl ? true : false;

            // Init zStorageWip service with the breeze entity manager.
            zStorageWip.init(breezeFactory.entityManager);

            // Get the information regarding the current form usage.
            this.startRefreshProcedure(true);
        }

        //#endregion

        //#region Private Methods

        private clearAllChanges(): void
        {
            this.clearWipStorage();

            this.clearChanges();
        }

        private clearChanges(): void
        {
            if (this.m)
            {
                this.m.entityAspect.rejectChanges();
            }

            this.resetDirtyCheck(false);
        }

        private clearEntity(): void
        {
            if (this.m)
            {
                //clear entity
            }
        }

        private clearWipStorage(): void
        {
            let wipKey = this.getWipKey();

            if (wipKey)
            {
                this.zStorageWip.removeWipEntity(wipKey);
            }
        }

        private onRefreshSuccess(isDirty: boolean = false): void
        {
            this.m.entityAspect.validateEntity();

            this.resetDirtyCheck(isDirty);

            this.unsubscribeFromPropertyChange();
            this.subscribeToPropertyChanged();

            // Update toolbar color
            this.updateToolbarColor();
        }

        private refresh(fromCache: boolean = false): ng.IPromise<IRefreshResult<T>>
        {
            // Init Vars
            let deferred = this.$q.defer<IRefreshResult<T>>();
            let entityManager = this.breezeFactory.entityManager;
            let wipKey = this.getWipKey();
            let wipEntity: T;

            if (fromCache)
            {
                wipEntity = <T> this.zStorageWip.loadWipEntity(wipKey);

                if (wipEntity)
                {
                    this._m = wipEntity;

                    deferred.resolve({ m: this.m, cached: true });
                }
            }

            if(!fromCache || !wipEntity)
            {
                var query = this.getQuery();

                if (query)
                {
                    this.breezeFactory.entityManager.executeQuery(query).then((data: breeze.QueryResult) =>
                    {
                        if (data.results.length > 0)
                        {
                            this._m = <T> data.results[0];

                            deferred.resolve({ m: this.m, cached: false });
                        }
                        else
                        {
                            deferred.reject("FormBaseViewModel.refresh: No result.");
                        }

                    }).catch((reason) =>
                    {
                        deferred.reject(reason);
                    });
                }
                else
                {
                    this._m = <T> entityManager.createEntity(this.entityType.name, this.newModelConfiguration,
                        breeze.EntityState.Added);

                    deferred.resolve({ m: this.m, cached: false });
                }
            }

            return deferred.promise;
        }

        private resetDirtyCheck(isDirty: boolean = false): void
        {
            this._isDirty = isDirty;

            if (this.m)
            {
                this.m.entityType.dataProperties.forEach((property) =>
                {
                    this._propertiesDirtyCheck.set(property.name, isDirty);
                });
            }
        }

        private save(): ng.IPromise<void>
        {
            let deferred = this.$q.defer<void>();

            if (this.canSave())
            {
                var entityManager = this.breezeFactory.entityManager;

                if (this.m.entityAspect.entityState.isDetached())
                {
                    this.m.entityAspect.setAdded();
                }

                if (entityManager.hasChanges())
                {
                    entityManager.saveChanges().then((saveResult) =>
                    {
                        if (saveResult.entities.length > 0)
                        {
                            let savedEntity = saveResult.entities[0];

                            if (savedEntity !== this.m && !savedEntity.entityAspect.entityState.isDetached())
                            {
                                savedEntity.entityAspect.setDetached();
                            }
                            
                            // Update data properties
                            savedEntity.entityType.dataProperties.forEach((value) =>
                            {
                                this.m[value.name] = savedEntity[value.name];
                            });

                            // Accept any changes in the entity
                            if (!this.m.entityAspect.entityState.isUnchanged())
                            {
                                this.m.entityAspect.acceptChanges();
                            }
                        }

                        deferred.resolve();
                    }).catch((reason) =>
                    {
                        deferred.reject(reason);
                    });
                }
                else
                {
                    deferred.resolve();
                }
            }
            else
            {
                deferred.reject("FormBaseViewModel._save: Cannot save, entity is invalid.");
            }

            return deferred.promise;
        }

        private subscribeToPropertyChanged(): void
        {
            //var propertyChangedHandler = this.propertyChanged;
            //var self = this;

            // It is very important to register to the property changed event this way
            // because of JavaScript's change of 'this' object
            this._propertyChangedSubscribtionKey = this.m.entityAspect.propertyChanged.subscribe((data) =>
            {
                //propertyChangedHandler.call(self, data);
                this.propertyChanged(data);
            });
        }

        private unsubscribeFromPropertyChange(): void
        {
            if (this._propertyChangedSubscribtionKey !== null && !!this.m)
            {
                this.m.entityAspect.propertyChanged.unsubscribe(this._propertyChangedSubscribtionKey);
            }
        }

        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            throw "FormBaseViewModel.getQuery: Not Implemented.";
        }

        protected getWipKey(): string
        {
            throw "FormBaseViewModel.getWipKey: Not Implemented";
        }

        protected propertyChanged(data: breeze.PropertyChangedEventArgs): void
        {
            let wipKey = this.getWipKey();
            let url = this.$location.url();

            wipKey = this.zStorageWip.storeWipEntity(data.entity,
                wipKey,
                data.entity.entityType.name,
                "Description",
                url);

            this._isDirty = true;
            this._propertiesDirtyCheck.set(data.propertyName, true);

            this.updateToolbarColor();
        }

        protected startRefreshProcedure(fromCache: boolean = false): ng.IPromise<IRefreshResult<T>>
        {
            this.status.isBusy = true;
            this.status.title = "Updating information, stay tuned.";
            this.status.description = "";

            if (!fromCache)
            {
                this.clearWipStorage();
            }
            else
            {
                this.clearChanges();
            }
            this.unsubscribeFromPropertyChange();
            this._m = null;

            let promise = this.refresh(fromCache);

            promise.then((refreshResult) =>
            {
                if (!this.isNew)
                {
                    this.toolbar.title = "Edit " + this.entityType.shortName;
                    this.toolbar.summary = "Edit user information for " + this.m.toString();
                }

                this.onRefreshSuccess(refreshResult.cached);
            }).finally(() =>
            {
                this.status.isBusy = false;
                this.status.title = this.status.description = "";
            });

            return promise;
        }

        protected startSaveProcedure(): ng.IPromise<void>
        {
            this.status.isBusy = true;
            this.status.title = "Saving changes.";
            this.status.description = "";

            this.resetDirtyCheck(true);
            this.updateToolbarColor();

            let promise = this.save();

            promise.then(() =>
            {
                this.clearWipStorage();
                this.resetDirtyCheck(false);

                this.updateToolbarColor();
            }).finally(() =>
            {
                this.status.isBusy = false;
                this.status.title = this.status.description = "";
            });

            return promise;
        }

        protected updateToolbarColor(): void
        {
            if (this.m)
            {
                if (this.isDirty())
                {
                    var invalid = false;

                    this._propertiesDirtyCheck.forEach((isDirty, propertyName) =>
                    {
                        if (isDirty === true && this.hasErrors(propertyName)) { invalid = true; return false; }
                    });

                    if (invalid)
                    {
                        this.toolbar.backColor = "#BB5465";
                    }
                    else
                    {
                        this.toolbar.backColor = "#E1B345";
                    }
                }
                else
                {
                    if (this.m.entityAspect.entityState.isAdded() || this.m.entityAspect.entityState.isDetached())
                    {
                        this.toolbar.backColor = "#A4BB54";
                    }
                    else
                    {
                        this.toolbar.backColor = "#7986CB";
                    }
                }
            }
            else
            {
                this.toolbar.backColor = "gray";
            }
        }

        //#endregion

        //#region Public Methods

        public cancel_click(): void 
        {
            this.clearAllChanges();
            this.unsubscribeFromPropertyChange();
            //this._m = null;

            if (this.returnUrl)
            {
                this.$location.url(this.returnUrl);
            }
            else if (this.isNew)
            {
                this.$location.url(this.listUrl);
            }
            else
            {
                this.$location.url(this.m.viewUrl);
            }
        }

        public canSave(): boolean
        {
            return !this.hasErrors();
        }

        public getErrors(property: string): breeze.ValidationError[]
        {
            if (this.m)
            {
                return this.m.entityAspect.getValidationErrors(property);
            }

            return [];
        }

        public hasErrors(property: string = ""): boolean
        {
            if (this.m)
            {
                if (property)
                {
                    return this.m.entityAspect.getValidationErrors(property).length > 0;
                }
                else
                {
                    return this.m.entityAspect.hasValidationErrors;
                }
            }

            return false;
        }

        public isDirty(property: string = "")
        {
            if (property)
            {
                return this._propertiesDirtyCheck.get(property);
            }

            return this._isDirty;
        }

        public refresh_click(): void
        {
            this.startRefreshProcedure(false);
        }

        public save_click(): void
        {
            this.startSaveProcedure().then(() =>
            {
                if (this.isNew)
                {
                    this.$location.url(this.m.editUrl + "?returnUrl=" + encodeURIComponent(this.returnUrl));
                }
            });
        }

        public saveAndClose_click(): void
        {
            this.startSaveProcedure().then(() =>
            {
                if (this.returnUrl)
                {
                    this.$location.url(this.returnUrl);
                }
                else
                {
                    this.$location.url(this.m.viewUrl);
                }
            });
        }

        public saveAndNew_click(): void
        {
            this.startSaveProcedure().then(() =>
            {
                //if (this.returnUrl)
                //{
                //    this.returnUrl;
                //}

                // refresh view model
            });
        }

        //#endregion
    }
}