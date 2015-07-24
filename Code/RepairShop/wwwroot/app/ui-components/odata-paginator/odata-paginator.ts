module App.UIComponents
{
    interface IODataPaginatorController
    {
        count: number;
        currentPage: number;
        pages: number[];
        pageSize: number;

        goToPage(page: number): void;
        isCurrentPage(page: number): boolean;
        isFirstPage: boolean;
        isLastPage: boolean;
        nextPage(): void;
        nextPageQuery(): ODataPaginatorPageQuery;
        numberOfPages: number;
        pageQuery(pageNumber: number): ODataPaginatorPageQuery;
        previousPage(): void;
        previousPageQuery(): ODataPaginatorPageQuery;
    }

    interface IODataPaginatorDirective extends ng.IDirective 
    {

    }

    interface IODataPaginatorScope extends ng.IScope
    {
        count: number;
        currentPage: number;
        pageSize: number;
        vm: ODataPaginatorController;

        navigated: (e?: any) => any;
        //navigated: any;
    }

    export interface IODataPaginatorNavigatedEventArgs
    {
        count: number;
        currentPage: number;
        currentPageQuery: ODataPaginatorPageQuery;
        isFirstPage: boolean;
        isLastPage: boolean;
        nextPage: number;
        nextPageQuery: ODataPaginatorPageQuery;
        numberOfPages: number;
        pageSize: number;
        previousPage: number;
        previousPageQuery: ODataPaginatorPageQuery;
        oldPage: number;
        oldPageQuery: ODataPaginatorPageQuery;
    }

    export class ODataPaginatorPageQuery
    {
        public constructor(public skip: number, public includeCount)
        {
        }

        public get queryString(): string
        {
            return "$skip=" + this.skip.toString() + "&inlinecount=" + (this.includeCount ? "allpages" : "none");
        }
    }

    class ODataPaginatorController implements IODataPaginatorController
    {
        public static get DefaultPageSize(): number { return 20; }

        private _self: ODataPaginatorController = this;
        private _count: number = 1;
        private _currentPage: number = 1;
        private _numberOfPages = 1;
        private _pages: number[] = [];
        private _pageSize: number = ODataPaginatorController.DefaultPageSize;

        constructor(private $scope: IODataPaginatorScope) 
        {
            $scope.vm = this;

            this.bindWithScope();
        }

        private bindWithScope(): void
        {
            this.$scope.$watch("count", (newValue: any) => this.count = newValue);
            this.$scope.$watch("currentPage", (newValue: any) => this.currentPage = newValue);
            this.$scope.$watch("pageSize", (newValue: any) => this.pageSize = newValue);
        }

        private calculatePages(checkCurrentPageIndex: boolean): void
        {
            this._pages.splice(0, this._pages.length);

            var numberOfPages = this._numberOfPages = Math.ceil(this.count / this.pageSize) || 1;
            var start = this.currentPage - 4;
            var end = this.currentPage + 4;

            if (start < 2)
            {
                end += (2 - start);
                start = 2;
            }

            if (end >= numberOfPages)
            {
                var calculatedEnd = end - numberOfPages - 1;
                end = numberOfPages - 1;

                if (0 <= calculatedEnd && calculatedEnd <= 3)
                {
                    calculatedEnd += 2;
                }

                start -= Math.abs(calculatedEnd);
            }

            for (var index = start; index <= end; index++)
            {
                this._pages.push(index);
            }

            if (checkCurrentPageIndex && this.currentPage > numberOfPages)
            {
                this.goToPage(numberOfPages);
            }
        }

        private fireOnNavigated(e: IODataPaginatorNavigatedEventArgs): void
        {
            if (Helpers.isFunction(this.$scope.navigated))
            {
                this.$scope.navigated({ e: e });
            }
        }

        public get count(): number
        {
            return this._count;
        }

        public set count(value: number)
        {
            this._count = value;

            this.calculatePages(true);
        }

        public get currentPage(): number
        {
            return this._currentPage;
        }

        public isCurrentPage(page): boolean
        {
            return page == this.currentPage;
        }

        public get isFirstPage(): boolean
        {
            return this.currentPage == 1;
        }

        public get isLastPage(): boolean
        {
            return this.currentPage == this.numberOfPages;
        }

        public goToPage(newPage: number): void
        {
            //if (newPage == this.currentPage)
            //{
            //    return;
            //}

            if (0 < newPage && newPage <= this.numberOfPages)
            {
                var oldPage = this._currentPage;
                var oldPageQuery = this.pageQuery(oldPage);
                this._currentPage = newPage;

                this.calculatePages(false);

                var onNavigatedEventArgs: IODataPaginatorNavigatedEventArgs = {
                    count: this.count,
                    currentPage: newPage,
                    currentPageQuery: this.pageQuery(newPage),
                    isFirstPage: this.isFirstPage,
                    isLastPage: this.isLastPage,
                    nextPage: newPage + 1 <= this.numberOfPages ? newPage + 1 : null,
                    nextPageQuery: this.nextPageQuery(),
                    numberOfPages: this.numberOfPages,
                    pageSize: this.pageSize,
                    previousPage: newPage - 1 > 0 ? newPage - 1 : null,
                    previousPageQuery: this.previousPageQuery(),
                    oldPage: oldPage,
                    oldPageQuery: oldPageQuery
                }

                this.fireOnNavigated(onNavigatedEventArgs);
            }
        }

        public get numberOfPages(): number
        {
            return this._numberOfPages;
        }

        public nextPage(): void
        {
            this.goToPage(this.currentPage + 1);
        }

        public nextPageQuery(): ODataPaginatorPageQuery
        {
            return this.pageQuery(this.currentPage + 1);
        }

        public get pages(): number[]
        {
            return this._pages;
        }

        public get pageSize(): number
        {
            return this._pageSize;
        }

        public set pageSize(value: number)
        {
            if (!value)
            {
                return;
            }

            this._pageSize = value;

            this.calculatePages(true);
        }

        public pageQuery(pageNumber: number): ODataPaginatorPageQuery
        {
            if (pageNumber > 0 && pageNumber <= this.numberOfPages)
            {
                var skip = (pageNumber - 1) * this.pageSize;

                return new ODataPaginatorPageQuery(skip, true);
            }

            return null;
        }

        public previousPage(): void
        {
            this.goToPage(this.currentPage - 1);
        }

        public previousPageQuery(): ODataPaginatorPageQuery
        {
            return this.pageQuery(this.currentPage - 1);
        }
    }

    class ODataPaginatorDirective implements IODataPaginatorDirective 
    {
        private static stylesLoaded = false;
        public static get directiveId(): string { return "odataPaginator"; }

        public controller = ($scope) => new ODataPaginatorController($scope);
        public restrict: string = "E";
        public replace: boolean = true;
        public scope = { count: "=", currentPage: "=", navigated: "&", pageSize: "=" };
        public templateUrl: string = Config.domain + "/app/ui-components/odata-paginator/odata-paginator.html";

        public link(): void
        {
            if (!ODataPaginatorDirective.stylesLoaded)
            {
                // Add the stylesheet link tag
                var stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = Config.domain + "/app/ui-components/odata-paginator/odata-paginator.css";
                stylesheet.type = "text/css";

                document.getElementsByTagName('head')[0].appendChild(stylesheet);

                ODataPaginatorDirective.stylesLoaded = true;
            }
        }
    }

    // Init
    angular.module(Config.appName)
        .directive(ODataPaginatorDirective.directiveId, [
        () => new ODataPaginatorDirective()
    ]);
}