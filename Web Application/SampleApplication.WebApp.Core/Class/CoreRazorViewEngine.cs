using System;
using System.Collections.Generic;
using System.Reflection;
using System.IO;
using System.Web.Mvc;

namespace SampleApplication.WebApp.Core
{
    public class CoreRazorViewEngine : RazorViewEngine 
    {
        public CoreRazorViewEngine()
        {
            AreaMasterLocationFormats = new[]
            {
                "~/Areas/{2}/Views/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/{1}/{0}.vbhtml",
                "~/Areas/{2}/Views/Shared/{0}.cshtml",
                "~/Areas/{2}/Views/Shared/{0}.vbhtml"
            };

            AreaPartialViewLocationFormats = new[]
            {
                "~/Areas/{2}/Views/{0}.cshtml",
                "~/Areas/{2}/Views/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/{1}/{0}.vbhtml",
                "~/Areas/{2}/Views/Shared/{0}.cshtml",
                "~/Areas/{2}/Views/Shared/{0}.vbhtml"
            };

            var areaViewAndPartialViewLocationFormats = new List<string>
            {
                "~/Areas/{2}/Views/{0}.cshtml",
                "~/Areas/{2}/Views/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/{1}/{0}.vbhtml",
                "~/Areas/{2}/Views/Shared/{0}.cshtml",
                "~/Areas/{2}/Views/Shared/{0}.vbhtml"
            };

            var partialViewLocationFormats = new List<string>
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml"
            };

            var masterLocationFormats = new List<string>
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/{1}/{0}.vbhtml",
                "~/Views/Shared/{0}.cshtml",
                "~/Views/Shared/{0}.vbhtml"
            };

            var fullPluginPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin");
            foreach (var file in Directory.EnumerateFiles(fullPluginPath, "*Plugin*.dll"))
            {
                var assembly = Assembly.LoadFile(file);
                var plugin = assembly.GetName().Name;

                masterLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.cshtml");
                masterLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.vbhtml");
                masterLocationFormats.Add("~/Areas/" + plugin + "/Views/Shared/{1}/{0}.cshtml");
                masterLocationFormats.Add("~/Areas/" + plugin + "/Views/Shared/{1}/{0}.vbhtml");

                partialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/{0}.cshtml");
                partialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.cshtml");
                partialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.vbhtml");
                partialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/Shared/{0}.cshtml");
                partialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/Shared/{0}.vbhtml");

                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Views/{1}/{0}.vbhtml");
                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Areas/{2}/Views/{1}/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Areas/{2}/Views/{1}/{0}.vbhtml");
                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Areas/{2}/Views/Shared/{0}.cshtml");
                areaViewAndPartialViewLocationFormats.Add("~/Areas/" + plugin + "/Areas/{2}/Views/Shared/{0}.vbhtml");
            }

            ViewLocationFormats = partialViewLocationFormats.ToArray();
            MasterLocationFormats = masterLocationFormats.ToArray();
            PartialViewLocationFormats = partialViewLocationFormats.ToArray();
            AreaPartialViewLocationFormats = areaViewAndPartialViewLocationFormats.ToArray();
            AreaViewLocationFormats = areaViewAndPartialViewLocationFormats.ToArray();

        }
    }
}