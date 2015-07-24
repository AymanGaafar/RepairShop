namespace RepairShop.Components
{
    using System;

    class Result
    {
        public object Data { get; set; }
        public Uri Uri { get; set; }
    }

    class ResultCollection : Result
    {
        public Pagination Pagination { get; set; }
    }

    class Pagination
    {
        public const int DefaultPageSize = 20;

        public long Count { get; set; }
        public int PageSize { get; set; }
        public Uri NextPageUrl { get; set; }

        public Pagination()
        {
            PageSize = DefaultPageSize;
        }
    }
}
