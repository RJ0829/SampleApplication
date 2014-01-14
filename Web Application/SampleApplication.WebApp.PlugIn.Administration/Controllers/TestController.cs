using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace SampleApplication.WebApp.PlugIn.Administration.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult Index()
        {
            string hostUrl = System.Configuration.ConfigurationManager.AppSettings["hostUrl"].ToString();
            string cssPath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/Content/style.css";
            string jsPath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/ViewScript/Test.js";

            ViewBag.AdministrationCssPath = cssPath;
            ViewBag.TestJsPath = jsPath;

            return View();
        }

        public ActionResult AddNewTestData()
        {
            return PartialView("New");
        }

        public ActionResult ViewTestData()
        {
            return PartialView("View");
        }

        public ActionResult EditTestData()
        {
            return PartialView("Edit");
        }

        public ActionResult OpenTestSampleDetails()
        {
            return PartialView("TestSampleDetails");
        }

        public ActionResult OpenTestRequirementDetails()
        {
            return PartialView("TestRequirementDetails");
        }

        public ActionResult OpenTestStepDetails()
        {
            return PartialView("TestStepDetails");
        }

        public ActionResult OpenTestTutorialStepDetails()
        {
            return PartialView("TestTutorialStepDetails");
        }

        [System.Web.Http.HttpPost]
        public ActionResult UploadSteps()
        {
            bool result = false;
            string imageFile = "";
            string videoFile = "";
            
            foreach (string file in Request.Files)
            {
                HttpPostedFileBase uploadFile = Request.Files[file] as HttpPostedFileBase;

                if (uploadFile != null && uploadFile.ContentLength > 0)
                {
                    string path = "";
                    string NewFileName = "steps_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(uploadFile.FileName);

                    if (file == "txt_TestStepsDetail_Image") {
                        path = Path.Combine(System.Configuration.ConfigurationManager.AppSettings["uploadfolderImage"].ToString(), NewFileName); 
                    }
                    if (file == "txt_TestStepsDetail_Video") {
                        path = Path.Combine(System.Configuration.ConfigurationManager.AppSettings["uploadfolderVideo"].ToString(), NewFileName); 
                    }
                                        
                    try
                    {
                        uploadFile.SaveAs(path);

                        if (file == "txt_TestStepsDetail_Image")
                        {
                            imageFile = NewFileName;
                        }
                        if (file == "txt_TestStepsDetail_Video")
                        {
                            videoFile = NewFileName;
                        }
                     
                    }
                    catch (Exception ex)
                    {
                        result = false;
                    }
                }
                else
                {
                    result = false;
                }
            }

            if (imageFile != "" || videoFile != "") {
                result = true;
            }

            if (result)
            {
                return Json(new { success = true, imageFile = imageFile, videoFile = videoFile }, "application/json");
            }
            else
            {
                return Json(new { success = false, imageFile = "", videoFile = "" }, "application/json");
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult UploadTutorialSteps()
        {
            bool result = false;
            string imageFile = "";
            string videoFile = "";

            foreach (string file in Request.Files)
            {
                HttpPostedFileBase uploadFile = Request.Files[file] as HttpPostedFileBase;

                if (uploadFile != null && uploadFile.ContentLength > 0)
                {
                    string path = "";
                    string NewFileName = "tutorialsteps_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(uploadFile.FileName);

                    if (file == "txt_TestTutorialStepsDetail_Image")
                    {
                        path = Path.Combine(System.Configuration.ConfigurationManager.AppSettings["uploadfolderImage"].ToString(), NewFileName);
                    }
                    if (file == "txt_TestTutorialStepsDetail_Video")
                    {
                        path = Path.Combine(System.Configuration.ConfigurationManager.AppSettings["uploadfolderVideo"].ToString(), NewFileName);
                    }

                    try
                    {
                        uploadFile.SaveAs(path);

                        if (file == "txt_TestTutorialStepsDetail_Image")
                        {
                            imageFile = NewFileName;
                        }
                        if (file == "txt_TestTutorialStepsDetail_Video")
                        {
                            videoFile = NewFileName;
                        }

                    }
                    catch (Exception ex)
                    {
                        result = false;
                    }
                }
                else
                {
                    result = false;
                }
            }

            if (imageFile != "" || videoFile != "")
            {
                result = true;
            }

            if (result)
            {
                return Json(new { success = true, imageFile = imageFile, videoFile = videoFile }, "application/json");
            }
            else
            {
                return Json(new { success = false, imageFile = "", videoFile = "" }, "application/json");
            }
        }


    }
}
