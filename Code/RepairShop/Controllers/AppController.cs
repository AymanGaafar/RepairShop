namespace RepairShop.Controllers
{
    using RepairShop.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;

    [Authorize]
    public class AppController : Controller
    {
        //private RepairShopDbContext db = new RepairShopDbContext();

        // Get: App/BrandDetails
        public ActionResult BrandDetails()
        {
            return PartialView("/wwwroot/app/brand/brand-details.cshtml");
        }

        // Get: App/BrandForm
        public ActionResult BrandForm()
        {
            return PartialView("/wwwroot/app/brand/brand-form.cshtml");
        }

        // Get: App/Brands
        public ActionResult Brands()
        {
            return PartialView("/wwwroot/app/brand/brands.cshtml");
        }

        // Get: App/ClientDetails
        public ActionResult ClientDetails()
        {
            return PartialView("/wwwroot/app/client/client-details.cshtml");
        }

        // Get: App/ClientForm
        public ActionResult ClientForm()
        {
            return PartialView("/wwwroot/app/client/client-form.cshtml");
        }

        // Get: App/Clients
        public ActionResult Clients()
        {
            return PartialView("/wwwroot/app/client/clients.cshtml");
        }

        // Get: App/Companies
        public ActionResult Companies()
        {
            return PartialView("/wwwroot/app/company/companies.cshtml");
        }

        // Get: App/CompanyDetails
        public ActionResult CompanyDetails()
        {
            return PartialView("/wwwroot/app/company/company-details.cshtml");
        }

        // Get: App/CompanyForm
        public ActionResult CompanyForm()
        {
            return PartialView("/wwwroot/app/company/company-form.cshtml");
        }

        // Get: App/ConditionDetails
        public ActionResult ConditionDetails()
        {
            return PartialView("/wwwroot/app/condition/condition-details.cshtml");
        }

        // Get: App/ConditionForm
        public ActionResult ConditionForm()
        {
            return PartialView("/wwwroot/app/condition/condition-form.cshtml");
        }

        // Get: App/Conditions
        public ActionResult Conditions()
        {
            return PartialView("/wwwroot/app/condition/conditions.cshtml");
        }
        
        // GET: App
        [AllowAnonymous]
        public ActionResult Index()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return RedirectPermanent("/login");
                //return RedirectToAction("Index", "Login");
                //return RedirectToRoute("Login");
            }
            
            return View("/wwwroot/app.cshtml");
        }
        
        // Get: App/Jobs
        public ActionResult Jobs()
        {
            return PartialView("/wwwroot/app/job/jobs.cshtml");
        }

        // Get: App/JobDetails
        public ActionResult JobDetails()
        {
            return PartialView("/wwwroot/app/job/job-details.cshtml");
        }

        // Get: App/JobForm
        public ActionResult JobForm()
        {
            return PartialView("/wwwroot/app/job/job-form.cshtml");
        }

        [AllowAnonymous]
        public string MetaData()
        {
            Response.ContentType = "application/json; charset=utf-8";

            var metaData = new Breeze.ContextProvider.EF6.EFContextProvider<MetaDataDbContext>().Metadata();
            
            return metaData;
        }

        // Get: App/ModelDetails
        public ActionResult ModelDetails()
        {
            return PartialView("/wwwroot/app/model/model-details.cshtml");
        }

        // Get: App/ModelForm
        public ActionResult ModelForm()
        {
            return PartialView("/wwwroot/app/model/model-form.cshtml");
        }

        // Get: App/Models
        public ActionResult Models()
        {
            return PartialView("/wwwroot/app/model/models.cshtml");
        }

        // Get: PrintJob/{Id}
        //public async Task<ActionResult> PrintJob(string code)
        //{
        //    var Job = await db.Jobs
        //        .Include(JOB => JOB.Client)
        //        .Include(JOB => JOB.Condition)
        //        .Include(JOB => JOB.Model)
        //        .Include(JOB => JOB.WorkDoneBy)
        //        .Include("JobRepairReasons.RepairReason")
        //        .Include("JobWorkDone.WorkDone")
        //        .Where(JOB => JOB.Code == code)
        //        .FirstOrDefaultAsync();
            
        //    if(Job == null)
        //    {
        //        return HttpNotFound();
        //    }

        //    return View("/wwwroot/print-job.cshtml", Job);
        //}

        // Get: App/RepairReasonDetails
        public ActionResult RepairReasonDetails()
        {
            return PartialView("/wwwroot/app/repair-reason/repair-reason-details.cshtml");
        }

        // Get: App/RepairReasonForm
        public ActionResult RepairReasonForm()
        {
            return PartialView("/wwwroot/app/repair-reason/repair-reason-form.cshtml");
        }

        // Get: App/RepairReasons
        public ActionResult RepairReasons()
        {
            return PartialView("/wwwroot/app/repair-reason/repair-reasons.cshtml");
        }

        // Get: App/Sidebar
        public ActionResult Sidebar()
        {
            return View("/wwwroot/app/layout/sidebar.cshtml");
        }

        // Get: App/UserDetails
        public ActionResult UserDetails()
        {
            return PartialView("/wwwroot/app/user/user-details.cshtml");
        }

        // Get: App/UserForm
        public ActionResult UserForm()
        {
            return PartialView("/wwwroot/app/user/user-form.cshtml");
        }

        // Get: App/Users
        public ActionResult Users()
        {
            return PartialView("/wwwroot/app/user/users.cshtml");
        }

        // Get: App/WorkDoneDetails
        public ActionResult WorkDoneDetails()
        {
            return PartialView("/wwwroot/app/work-done/work-done-details.cshtml");
        }

        // Get: App/WorkDoneForm
        public ActionResult WorkDoneForm()
        {
            return PartialView("/wwwroot/app/work-done/work-done-form.cshtml");
        }

        // Get: App/WorkDone
        public ActionResult WorkDone()
        {
            return PartialView("/wwwroot/app/work-done/work-done.cshtml");
        }
    }
}