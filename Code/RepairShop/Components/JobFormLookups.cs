namespace RepairShop.Components
{
    using System;
    using System.Collections.Generic;

    class JobFormLookups
    {
        public IEnumerable<KeyValueResult<string, string>> clients { get; set; }
        public IEnumerable<KeyValueResult<string, string>> conditions { get; set; }
        public IEnumerable<KeyValueResult<string, string>> models { get; set; }
        public IEnumerable<KeyValueResult<string, string>> repairReasons { get; set; }
        public IEnumerable<KeyValueResult<string, string>> users { get; set; }
        public IEnumerable<KeyValueResult<string, string>> workDone { get; set; }
    }
}
