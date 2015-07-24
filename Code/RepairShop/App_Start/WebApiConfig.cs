namespace RepairShop
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Security.OAuth;
    using Newtonsoft.Json.Serialization;
    using RepairShop.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Configuration;
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.OData.Batch;
    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using System.Web.Http.OData.Routing;
    using System.Web.Http.OData.Routing.Conventions;
    //using System.Web.OData.Batch;
    //using System.Web.OData.Builder;
    //using System.Web.OData.Extensions;

    public class CompositeKeyRoutingConvention : EntityRoutingConvention
    {
        public override string SelectAction(System.Web.Http.OData.Routing.ODataPath odataPath, System.Web.Http.Controllers.HttpControllerContext controllerContext, ILookup<string, System.Web.Http.Controllers.HttpActionDescriptor> actionMap)
        {
            var action = base.SelectAction(odataPath, controllerContext, actionMap);
            if (action != null)
            {
                var routeValues = controllerContext.RouteData.Values;
                if (routeValues.ContainsKey(ODataRouteConstants.Key))
                {
                    var keyRaw = routeValues[ODataRouteConstants.Key] as string;
                    IEnumerable<string> compoundKeyPairs = keyRaw.Split(',');
                    if (compoundKeyPairs == null || compoundKeyPairs.Count() == 0)
                    {
                        return action;
                    }

                    foreach (var compoundKeyPair in compoundKeyPairs)
                    {
                        string[] pair = compoundKeyPair.Split('=');
                        if (pair == null || pair.Length != 2)
                        {
                            continue;
                        }
                        var keyName = pair[0].Trim();
                        var keyValue = pair[1].Trim();

                        routeValues.Add(keyName, keyValue);
                    }
                }
            }

            return action;
        }
    }

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            // This should be used with breeze
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "{controller}/{action}"
            //    //defaults: new { controller = "Api" }
            //);

            // Regular WebApi
            config.Routes.MapHttpRoute(
                "DefaultApi", // name
                "api/{controller}/{id}", // routeTemplate
                new { id = RouteParameter.Optional } // defaults
            );

            ConfigOData(config);
        }

        private static void ConfigOData(HttpConfiguration config)
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();

            var conventions = ODataRoutingConventions.CreateDefault();
            conventions.Insert(0, new CompositeKeyRoutingConvention());

            builder.ComplexType<Address>();

            builder.EntitySet<Brand>("Brands").EntityType.Collection
                .Action("FormLookups")
                .Returns<Components.BrandFormLookups>();
            builder.EntitySet<Client>("Clients");
            builder.EntitySet<Company>("Companies");
            builder.EntitySet<Condition>("Conditions");
            builder.EntitySet<Job>("Jobs").EntityType.Collection
                .Action("FormLookups")
                .Returns<Components.JobFormLookups>();
            builder.EntitySet<JobRepairReason>("JobRepairReasons");
            builder.EntitySet<JobWorkDone>("JobWorkDone");
            builder.EntitySet<Model>("Models").EntityType.Collection
                .Action("FormLookups")
                .Returns<Components.ModelFormLookups>();
            builder.EntitySet<RepairReason>("RepairReasons");
            builder.EntitySet<User>("Users");
            builder.EntitySet<WorkDone>("WorkDone");

            builder.ComplexType<Components.KeyValueResult<string, string>>();
            
            var EDM = builder.GetEdmModel();

            // OData v4.0
            //config.MapODataServiceRoute("odata", "odata", EDM,
            //    new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer));

            config.Routes.MapODataServiceRoute("odata", "odata", EDM,
                new DefaultODataPathHandler(),
                conventions,
                new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer));
        }
    }
}
