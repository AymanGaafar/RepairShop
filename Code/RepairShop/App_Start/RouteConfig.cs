namespace RepairShop
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            routes.MapRoute(
                name: "Login",
                url: "login/{*url}",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "PrintJob",
                url: "printjob/{code}",
                defaults: new { controller = "App", action = "PrintJob" }
            );

            routes.MapRoute(
                name: "NormalRouting",
                url: "app/{action}",
                defaults: new { controller = "App", action = "Index" }
            );

            routes.MapRoute(
                name: "App",
                url: "{*url}",
                defaults: new { controller = "App", action = "Index" }
            );
        }
    }
}
