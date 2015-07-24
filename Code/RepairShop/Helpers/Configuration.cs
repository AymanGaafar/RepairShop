namespace RepairShop.Helpers
{
    using System;
    using System.IO;

    public class Configuration
    {
        private static Configuration _Instance;
        public static Configuration Instance
        {
            get
            {
                if(_Instance == null)
                {
                    _Instance = ReadConfigFile();
                }

                return _Instance;
            }
        }
        
        public string AppName { get; set; }
        public string DatabaseConnection { get; set; }
        public string DatabaseName { get; set; }
        public string DatabasePassword { get; set; }
        public string AdminUsername { get; set; }
        public string AdminPassword { get; set; }
        public string CountryOfOperation { get; set; }

        private static Configuration ReadConfigFile()
        {
            var path = $"{AppContext.BaseDirectory}/config/config.json";

            if (!File.Exists(path))
            {
                return null;
            }

            var jsonFile = File.ReadAllText(path);

            return System.Web.Helpers.Json.Decode<Configuration>(jsonFile);
        }
        
        public string GetDbConnection()
        {
            return $"data source={DatabaseConnection};"
                + $"initial catalog={DatabaseName};"
                + "integrated security=True;"
                + "MultipleActiveResultSets=True;"
                + "App=EntityFramework";
        }
    }
}