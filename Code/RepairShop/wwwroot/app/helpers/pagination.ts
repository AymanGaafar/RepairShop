module App.Helpers
{
    export interface IPagination
    {
        count: number;
        currentPage: number;
        isFirstPage: boolean;
        isLastPage: boolean;
        numberOfPages: number;
        onNavigated: IEvent;
        onNavigating: IEvent;
        pages: number[];
        pageSize: number;

        goToPage(page: number): void;
        nextPage(): void;
        nextPageUrl(): void;
        pageUrl(pageNumber: number): string;
        previousPage(): void;
        previousPageUrl(): string;
    }

    interface INavigationEventArgs extends IEventArgs
    {
        currentPage: number;
    }

    export interface INavigatingEventArgs extends INavigationEventArgs
    {
        newPage: number;
        stopPropagation: boolean;
    }

    export interface INavigatedEventArgs extends INavigationEventArgs
    {
        oldPage: number;
    }

    export class Pagination implements IPagination
    {
        public static DefaultPageSize: number = 20;

        private _count: number = 1;
        private _currentPage: number = 1;
        private _onNavigated: IEvent = new Event("onNavigated");
        private _onNavigating: IEvent = new Event("onNavigating");
        private _pages: number[] = [];

        public pageSize: number = Pagination.DefaultPageSize;

        public constructor()
        {
            this.pageSize = Pagination.DefaultPageSize;
        }

        private calculatePages(): void
        {
            this._pages.splice(0, this._pages.length);

            for (var index = this.currentPage - 5; index <= this.currentPage + 5; index++)
            {
                if (index >= 1 && index <= this.numberOfPages)
                {
                    this._pages.push(index);
                }
            }
        }

        public get count(): number
        {
            return this._count;
        }

        public set count(value: number)
        {
            this._count = value;

            this.calculatePages();

            if (this.currentPage > value)
            {
                this.goToPage(value);
            }
        }

        public get currentPage(): number
        {
            return this._currentPage;
        }

        public set currentPage(value: number)
        {
            if (value >= 1 && value <= this.count)
            {
                this._currentPage = value;
            }
        }

        public get isFirstPage(): boolean
        {
            return this.currentPage == 1;
        }

        public get isLastPage(): boolean
        {
            return this.currentPage == this.count;
        }

        public goToPage(page: number): void
        {
            var onNavigatingEventArgs: INavigatingEventArgs;
            var onNavigatedEventArgs: INavigatedEventArgs;

            if (1 <= page && page <= this.numberOfPages)
            {
                onNavigatingEventArgs = {
                    currentPage: this.currentPage,
                    handled: false,
                    newPage: page,
                    stopPropagation: false
                };

                this.onNavigating.fire(this, onNavigatingEventArgs);

                if (!onNavigatingEventArgs.stopPropagation)
                {
                    this.currentPage = page;

                    this.calculatePages();

                    onNavigatedEventArgs = {
                        currentPage: this.currentPage,
                        handled: false,
                        oldPage: page
                    }

                    this.onNavigated.fire(this, onNavigatedEventArgs);
                }
            }
        }

        public get numberOfPages(): number
        {
            return Math.ceil(this.count / this.pageSize);
        }

        public get onNavigated(): IEvent
        {
            return this._onNavigated;
        }

        public get onNavigating(): IEvent
        {
            return this._onNavigating;
        }

        public nextPage(): void
        {
            this.goToPage(this.currentPage + 1);
        }

        public nextPageUrl(): string
        {
            return this.pageUrl(this.currentPage + 1);
        }

        public get pages(): number[]
        {
            console.log(this._pages);

            return this._pages;
        }

        public pageUrl(pageNumber: number = this.currentPage): string
        {
            if (pageNumber > 0 && pageNumber <= this.count)
            {
                return "$skip=" + ((this.currentPage - 1) * this.pageSize).toString()
                    + "&$inlinecount=allpages";
            }

            return null;
        }

        public previousPage(): void
        {
            this.goToPage(this.currentPage - 1);
        }

        public previousPageUrl(): string
        {
            return this.pageUrl(this.currentPage - 1);
        }
    }
}