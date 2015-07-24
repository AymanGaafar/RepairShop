namespace RepairShop.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectPermanent("/");
                //return RedirectToAction("Index", "App");
                //return RedirectToRoute("App");
            }

            return View("/wwwroot/login.cshtml");
        }
    }
}