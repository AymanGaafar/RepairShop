using System.Web;
using System.Web.Optimization;

namespace RepairShop
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var wwwroot = "~/wwwroot";

            #region Login

            bundles.Add(new ScriptBundle("~/bundles/scripts/login/header")
                .Include(wwwroot + "/libraries/jquery/jquery-2.1.4.min.js")
                .Include(wwwroot + "/libraries/angularjs/angular/angular.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/scripts/login/footer")
                // Libraries

                // View Models
                .Include(wwwroot + "/app/base/base.vm.js")

                // App
                .Include(wwwroot + "/app/config/config.js")
                .Include(wwwroot + "/app/login.init.js")

                .Include(wwwroot + "/app/login/login.vm.js")
            );

            #endregion

            #region App

            bundles.Add(new StyleBundle("~/bundles/styles/app")
                //.Include(wwwroot + "/styles/font-awesome/css/font-awesome.min.css")
                .Include(wwwroot + "/styles/google-material/css/google-material.css")
                .Include(wwwroot + "/styles/bootstrap/bootstrap.min.css")
                .Include(wwwroot + "/styles/load-awesome/ball-scale-ripple-multiple.min.css")
                .Include(wwwroot + "/app/ui-components/angular-bootstrap-datetimepicker/datetimepicker.css")
                .Include(wwwroot + "/styles/common/layouts.css")
                .Include(wwwroot + "/styles/common/common.css")
                .Include(wwwroot + "/styles/app/app.structure.css")
            );

            bundles.Add(new ScriptBundle("~/bundles/scripts/app/header")
                .Include(wwwroot + "/libraries/jquery/jquery-2.1.4.min.js")
                .Include(wwwroot + "/libraries/angularjs/angular/angular.js")
            );

            bundles.Add(new ScriptBundle("~/bundles/scripts/app/footer")
                // Libraries
                .Include(wwwroot + "/libraries/angularjs/angular-route/angular-route.js")
                .Include(wwwroot + "/libraries/breezejs/breeze.debug.js")
                .Include(wwwroot + "/libraries/breezejs/Adapters/breeze.bridge.angular.js")
                .Include(wwwroot + "/libraries/datajs/datajs-1.1.3.min.js")
                .Include(wwwroot + "/libraries/breezejs/Adapters/breeze.dataService.odata.js")
                .Include(wwwroot + "/libraries/breezejs/Adapters/breeze.uriBuilder.odata.js")
                .Include(wwwroot + "/libraries/breezejs/breeze.metadata-helper.js")
                .Include(wwwroot + "/libraries/breezejs/angular.breeze.storagewip.js")
                .Include(wwwroot + "/libraries/bootstrap/bootstrap.min.js")
                .Include(wwwroot + "/libraries/momentjs/moment.js")

                // Components
                .Include(wwwroot + "/app/misc/meta-data.js")
                .Include(wwwroot + "/app/helpers/helpers.js")
                .Include(wwwroot + "/app/helpers/event.js")
                .Include(wwwroot + "/app/helpers/pagination.js")
                .Include(wwwroot + "/app/helpers/tooltip.js")

                // Models
                .Include(wwwroot + "/app/base/base.model.js")
                .Include(wwwroot + "/app/misc/address.model.js")
                .Include(wwwroot + "/app/brand/brand.model.js")
                .Include(wwwroot + "/app/client/client.model.js")
                .Include(wwwroot + "/app/company/company.model.js")
                .Include(wwwroot + "/app/condition/condition.model.js")
                .Include(wwwroot + "/app/job/job.model.js")
                .Include(wwwroot + "/app/misc/job-repair-reason.model.js")
                .Include(wwwroot + "/app/misc/job-work-done.model.js")
                .Include(wwwroot + "/app/model/model.model.js")
                .Include(wwwroot + "/app/repair-reason/repair-reason.model.js")
                .Include(wwwroot + "/app/user/user.model.js")
                .Include(wwwroot + "/app/work-done/work-done.model.js")

                // App
                .Include(wwwroot + "/app/config/config.js")
                .Include(wwwroot + "/app/app.init.js")

                // Directives
                .Include(wwwroot + "/app/ui-components/badge-button/badge-button.js")
                .Include(wwwroot + "/app/ui-components/status-reporter/status-reporter.js")
                .Include(wwwroot + "/app/ui-components/odata-paginator/odata-paginator.js")
                .Include(wwwroot + "/app/ui-components/angular-bootstrap-datetimepicker/datetimepicker.js")

                // Services
                .Include(wwwroot + "/app/services/breeze.service.js")
                .Include(wwwroot + "/app/services/cache.service.js")
                .Include(wwwroot + "/app/services/sidebar.provider.js")
                .Include(wwwroot + "/app/services/signed-in-user.service.js")

                // View Models
                // Form view models should be loaded before the details one
                // so that routing get executed correctly.
                .Include(wwwroot + "/app/base/base.vm.js")
                .Include(wwwroot + "/app/base/form-base.vm.js")
                .Include(wwwroot + "/app/base/details-base.vm.js")
                .Include(wwwroot + "/app/base/list-base.vm.js")

                .Include(wwwroot + "/app/misc/app.vm.js")
                .Include(wwwroot + "/app/layout/sidebar.vm.js")

                .Include(wwwroot + "/app/brand/brand-form.vm.js")
                .Include(wwwroot + "/app/brand/brand-details.vm.js")
                .Include(wwwroot + "/app/brand/brands.vm.js")

                .Include(wwwroot + "/app/client/client-form.vm.js")
                .Include(wwwroot + "/app/client/client-details.vm.js")
                .Include(wwwroot + "/app/client/clients.vm.js")

                .Include(wwwroot + "/app/company/company-form.vm.js")
                .Include(wwwroot + "/app/company/company-details.vm.js")
                .Include(wwwroot + "/app/company/companies.vm.js")

                .Include(wwwroot + "/app/condition/condition-form.vm.js")
                .Include(wwwroot + "/app/condition/condition-details.vm.js")
                .Include(wwwroot + "/app/condition/conditions.vm.js")

                .Include(wwwroot + "/app/job/job-form.vm.js")
                .Include(wwwroot + "/app/job/job-details.vm.js")
                .Include(wwwroot + "/app/job/jobs.vm.js")

                .Include(wwwroot + "/app/model/model-form.vm.js")
                .Include(wwwroot + "/app/model/model-details.vm.js")
                .Include(wwwroot + "/app/model/models.vm.js")

                .Include(wwwroot + "/app/repair-reason/repair-reason-form.vm.js")
                .Include(wwwroot + "/app/repair-reason/repair-reason-details.vm.js")
                .Include(wwwroot + "/app/repair-reason/repair-reasons.vm.js")

                .Include(wwwroot + "/app/user/user-form.vm.js")
                .Include(wwwroot + "/app/user/user-details.vm.js")
                .Include(wwwroot + "/app/user/users.vm.js")

                .Include(wwwroot + "/app/work-done/work-done-form.vm.js")
                .Include(wwwroot + "/app/work-done/work-done-details.vm.js")
                .Include(wwwroot + "/app/work-done/work-done.vm.js")
            );

            #endregion
        }
    }
}
