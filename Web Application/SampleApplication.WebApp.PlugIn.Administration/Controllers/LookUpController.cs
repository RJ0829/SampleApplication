using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleApplication.WebApp.PlugIn.Administration.Controllers
{
    public class LookUpController : Controller
    {
        //
        // GET: /LookUp/

        public ActionResult Index()
        {
            string hostUrl = System.Configuration.ConfigurationManager.AppSettings["hostUrl"].ToString();
            string cssPath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/Content/style.css";
            string jsPath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/ViewScript/LookUp.js";

            ViewBag.AdministrationCssPath = cssPath;
            ViewBag.LookUpJsPath = jsPath;

            return View();
        }

        public ActionResult AddNewLookUpData()
        {
            return PartialView("New");
        }

        public ActionResult EditLookUpData()
        {
            return PartialView("Edit");
        }

    }
}
