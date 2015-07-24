module App.ViewModels
{
    export class JobFormViewModel extends FormBaseViewModel <Models.Job>
    {
        //#region Private Static Properties
        //#endregion

        //#region Public Static Properties

        public static $inject = FormBaseViewModel.$inject.concat(["$scope", Services.CacheService.serviceId]);
        public static get controllerId(): string { return "JobFormViewModel"; }

        //#endregion

        //#region Private Properties

        private set _allLoading(value: boolean)
        {
            this._loadingClients =
            this._loadingConditions =
            this._loadingModels =
            this._loadingRepairReasons =
            this._loadingUsers =
            this._loadingWorkDone = value;
        }
        private _loadingClients: boolean = false;
        private _loadingConditions: boolean = false;
        private _loadingModels: boolean = false;
        private _loadingRepairReasons: boolean = false;
        private _loadingUsers: boolean = false;
        private _loadingWorkDone: boolean = false;
        private _lookups: Helpers.IJobFormLookups = null;

        private _repairReasonsHash: any = {};
        private _workDoneHash: any = {};

        //#endregion
        
        //#region Public Properties
        
        public get loadingClients(): boolean { return this._loadingClients; }
        public get loadingConditions(): boolean { return this._loadingConditions; }
        public get loadingModels(): boolean { return this._loadingModels; }
        public get loadingRepairReasons(): boolean { return this._loadingRepairReasons; }
        public get loadingUsers(): boolean { return this._loadingUsers; }
        public get loadingWorkDone(): boolean { return this._loadingWorkDone; }
        public get lookups(): Helpers.IJobFormLookups { return this._lookups; }

        //#endregion
        
        //#region Constructors

        constructor($http, $q, $location, $route, $routeParams, zStorageWip, breezeFactory,
            private $scope: IFormBaseScope<JobFormViewModel>, private cacheFactory: Services.CacheService)
        {
            super($http,
                $q,
                $location,
                $route,
                $routeParams,
                zStorageWip,
                breezeFactory,
                breezeFactory.entityManager.metadataStore.getEntityType("Job"),
                Models.Job.newUrl,
                Models.Job.listUrl,
                {
                    JobId: breeze.core.getUuid(),
                    ClientId: null,
                    WorkDoneById: null,
                    ModelId: null,
                    ConditionId: null,
                    RecievedOn: null
                });

            $scope.vm = this;

            // Retrieve lookups
            this._allLoading = true;
            
            this.retrieveLookups(true).finally(() =>
            {
                this._allLoading = false;
            });
        }
        
        //#endregion

        //#region Private Methods

        private newEntity(newEntityUrl: string): void
        {
            this.$location.url(newEntityUrl + "?returnUrl=" + encodeURIComponent(this.$location.url()));
        }

        private retrieveLookups(fromCache: boolean = false): ng.IPromise<void>
        {
            var deferred = this.$q.defer<void>();

            if (fromCache && this.cacheFactory.hasItem(Models.Client.cacheListName)
                && this.cacheFactory.hasItem(Models.Condition.cacheListName)
                && this.cacheFactory.hasItem(Models.Model.cacheListName)
                && this.cacheFactory.hasItem(Models.RepairReason.cacheListName)
                && this.cacheFactory.hasItem(Models.User.cacheListName)
                && this.cacheFactory.hasItem(Models.WorkDone.cacheListName))
            {
                this._lookups =
                {
                    clients: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.Client.cacheListName),
                    conditions: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.Condition.cacheListName),
                    models: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.Model.cacheListName),
                    repairReasons: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.RepairReason.cacheListName),
                    users: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.User.cacheListName),
                    workDone: this.cacheFactory.getItem<Helpers.IKeyValueResult<string, string>[]>(Models.WorkDone.cacheListName)
                };

                deferred.resolve();
            }
            else
            {
                this.$http.post<Helpers.IJobFormLookups>("/odata/Jobs/FormLookups", {})
                    .success((data: Helpers.IJobFormLookups) =>
                {
                    this.cacheFactory
                        .setItem(Models.Client.cacheListName, data.clients)
                        .setItem(Models.Condition.cacheListName, data.conditions)
                        .setItem(Models.Model.cacheListName, data.models)
                        .setItem(Models.RepairReason.cacheListName, data.repairReasons)
                        .setItem(Models.User.cacheListName, data.users)
                        .setItem(Models.WorkDone.cacheListName, data.workDone);

                    this._lookups = data;

                    deferred.resolve();
                });
            }

            return deferred.promise;
        }

        private saveOneToManyRelations(): ng.IPromise<void>
        {
            let deferred = this.$q.defer<void>();
            let entityManager = this.breezeFactory.entityManager;
            
            //#region Remove Existing unused Repair Reasons

            let repairReasonPredicate = new breeze.Predicate("JobId", "eq", this.m.JobId);

            let repairReasonsQuery = breeze.EntityQuery.from("JobRepairReasons")
                .where(repairReasonPredicate);
            
            let repairReasons = <Models.JobRepairReason[]> entityManager.executeQueryLocally(repairReasonsQuery);

            for (var repairReason of repairReasons)
            {
                if (!this.m.TempRepairReasons.some(tempRepairReason => tempRepairReason === repairReason.RepairReasonId))
                {
                    let entityState = repairReason.entityAspect.entityState;

                    if (entityState.isAdded())
                    {
                        repairReason.entityAspect.setDetached();
                    }
                    else if (entityState.isUnchangedOrModified())
                    {
                        repairReason.entityAspect.setDeleted();
                    }
                }
            }

            //#endregion

            //#region Add new Repair Reasons

            for (let tempRepairReason of this.m.TempRepairReasons)
            {
                let repairReasonPredicate = new breeze.Predicate("JobId", "eq", this.m.JobId)
                    .and("RepairReasonId", "eq", tempRepairReason);

                let repairReasonsQuery = breeze.EntityQuery.from("JobRepairReasons")
                    .where(repairReasonPredicate);

                let repairReason = <Models.JobRepairReason> entityManager.executeQueryLocally(repairReasonsQuery).shift();

                if (repairReason != undefined)
                {
                    let entityState = repairReason.entityAspect.entityState;

                    if (entityState.isDeleted())
                    {
                        repairReason.entityAspect.setUnchanged();
                    }
                    else if (entityState.isDetached())
                    {
                        repairReason.entityAspect.setAdded();
                    }
                }
                else
                {
                    entityManager.createEntity("JobRepairReason", {
                        JobId: this.m.JobId,
                        RepairReasonId: tempRepairReason
                    }, breeze.EntityState.Added);
                }
            }

            //#endregion

            //#region Remove Existing unused Work Done

            let workDonePredicate = new breeze.Predicate("JobId", "eq", this.m.JobId);

            let workDonesQuery = breeze.EntityQuery.from("JobWorkDone")
                .where(workDonePredicate);

            let workDones = <Models.JobWorkDone[]> entityManager.executeQueryLocally(workDonesQuery);

            for (var workDone of workDones)
            {
                if (!this.m.TempWorkDone.some(tempWorkDone => tempWorkDone === workDone.WorkDoneId))
                {
                    let entityState = workDone.entityAspect.entityState;

                    if (entityState.isAdded())
                    {
                        workDone.entityAspect.setDetached();
                    }
                    else if (entityState.isUnchangedOrModified())
                    {
                        workDone.entityAspect.setDeleted();
                    }
                }
            }

            //#endregion

            //#region Add new Work Done

            for (let tempWorkDone of this.m.TempWorkDone)
            {
                let workDonePredicate = new breeze.Predicate("JobId", "eq", this.m.JobId)
                    .and("WorkDoneId", "eq", tempWorkDone);

                let workDonesQuery = breeze.EntityQuery.from("JobWorkDone")
                    .where(workDonePredicate);

                let workDone = <Models.JobWorkDone> entityManager.executeQueryLocally(workDonesQuery).shift();

                if (workDone != undefined)
                {
                    let entityState = workDone.entityAspect.entityState;

                    if (entityState.isDeleted())
                    {
                        workDone.entityAspect.setUnchanged();
                    }
                    else if (entityState.isDetached())
                    {
                        workDone.entityAspect.setAdded();
                    }
                }
                else
                {
                    entityManager.createEntity("JobWorkDone", {
                        JobId: this.m.JobId,
                        WorkDoneId: tempWorkDone
                    }, breeze.EntityState.Added);
                }
            }

            //#endregion
            
            if (entityManager.hasChanges())
            {
                entityManager.saveChanges().then((saveResult) =>
                {
                    deferred.resolve();
                });
            }
            else
            {
                deferred.resolve();
            }

            return deferred.promise;
        }

        //#endregion

        //#region Protected Methods

        protected getQuery(): breeze.EntityQuery
        {
            let query = null;

            if (!this.isNew)
            {
                query = new breeze.EntityQuery().from("Jobs")
                    .expand(["JobRepairReasons", "JobWorkDone"])
                    .where(new breeze.Predicate(Models.Job.lookupProperty, "eq", this.$routeParams[Models.Job.lookupProperty]));
            }

            return query;
        }

        protected getWipKey(): string
        {
            if (!this.isNew)
            {
                return Models.Job.getWipKey(this.$routeParams[Models.Job.lookupProperty]);
            }

            return Models.Job.getWipKey();
        }

        protected startRefreshProcedure(fromCache: boolean = false)
        {
            // We will let the super.refresh() method determine
            // the return type of this method.
            let promise = super.startRefreshProcedure(fromCache);

            promise.then(() =>
            {
                this.m.TempRepairReasons.splice(0, this.m.TempRepairReasons.length);

                for (var repairReason of this.m.JobRepairReasons)
                {
                    this.m.TempRepairReasons.push(repairReason.RepairReasonId);
                }

                this.m.TempWorkDone.splice(0, this.m.TempWorkDone.length);

                for (var workDone of this.m.JobWorkDone)
                {
                    this.m.TempWorkDone.push(workDone.WorkDoneId);
                };

                //this.m.entityAspect.acceptChanges();
            });

            return promise;
        }

        protected startSaveProcedure(): ng.IPromise<void>
        {
            let deferred = this.$q.defer<void>();

            super.startSaveProcedure().then(() =>
            {
                this.status.isBusy = true;
                this.status.title = "Saving changes.";
                this.status.description = "";

                return this.saveOneToManyRelations();
            }).then(() =>
            {
                deferred.resolve();
            }).catch(reason =>
            {
                console.error(reason)

                deferred.reject(reason);
            }).finally(() =>
            {
                this.status.isBusy = false;
                this.status.title = this.status.description = "";
            });

            return deferred.promise;
        }

        //#endregion

        //#region Public Methods

        public hasRepairReason(repairReason: string): boolean
        {
            if (this.m && this.m.TempRepairReasons)
            {
                return this.m.TempRepairReasons.filter(v => v === repairReason).length > 0;
            }

            return null
        }

        public hasWorkDone(workDone: string): boolean
        {
            if (this.m && this.m.TempWorkDone)
            {
                return this.m.TempWorkDone.filter(v => v === workDone).length > 0;
            }

            return null
        }

        public newClient(): void
        {
            this.newEntity(Models.Client.newUrl);
        }

        public newCondition(): void
        {
            this.newEntity(Models.Condition.newUrl);
        }

        public newModel(): void
        {
            this.newEntity(Models.Model.newUrl);
        }

        public newRepairReason(): void
        {
            this.newEntity(Models.RepairReason.newUrl);
        }

        public newUser(): void
        {
            this.newEntity(Models.User.newUrl);
        }

        public newWorkDone(): void
        {
            this.newEntity(Models.WorkDone.newUrl);
        }

        public refreshLookups(): void
        {
            this.retrieveLookups(false);
        }

        public repairReasonChanged(repairReasonId: string, $event: any)
        {
            var hasRepairReason = this.hasRepairReason(repairReasonId);

            if ($event.target.checked)
            {
                if (hasRepairReason === false)
                {
                    this.m.TempRepairReasons.push(repairReasonId);
                }
            }
            else if (hasRepairReason === true)
            {
                this.m.TempRepairReasons.splice(this.m.TempRepairReasons.lastIndexOf(repairReasonId), 1);
            }

            this.propertyChanged({
                entity: this.m,
                newValue: this.m,
                oldValue: this.m,
                parent: null,
                property: this.m.entityType.getProperty("RepairReasons"),
                propertyName: "RepairReasons"
            });
        }

        public save_click(): void
        {
            this.startSaveProcedure().then(() =>
            {
                if (this.isNew)
                {
                    this.$location.url(this.m.editUrl);
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
        }

        public workDoneChanged(workDoneId: string, $event: any)
        {
            var hasWorkDone = this.hasWorkDone(workDoneId);

            if ($event.target.checked)
            {
                if (hasWorkDone === false)
                {
                    this.m.TempWorkDone.push(workDoneId);
                }
            }
            else if (hasWorkDone === true)
            {
                this.m.TempWorkDone.splice(this.m.TempWorkDone.lastIndexOf(workDoneId), 1);
            }

            this.propertyChanged({
                entity: this.m,
                newValue: this.m,
                oldValue: this.m,
                parent: null,
                property: this.m.entityType.getProperty("WorkDone"),
                propertyName: "WorkDone"
            });
        }

        //#endregion
    }

    class JobFormRouteConfigurator
    {
        public static $inject = ['$routeProvider'];

        public constructor($routeProvider: ng.route.IRouteProvider)
        {
            // New Job
            $routeProvider.when(Models.Job.newUrl, {
                templateUrl: "/App/JobForm",
                controller: "JobFormViewModel"
            });
            
            // Edit Job
            $routeProvider.when(Models.Job.editUrl, {
                templateUrl: "/App/JobForm",
                controller: "JobFormViewModel"
            });
        }
    }

    // Init
    angular.module(Config.appName)
        .controller(JobFormViewModel.controllerId, JobFormViewModel)
        .config(JobFormRouteConfigurator);
}