using System.Web;
using System.Web.Mvc;

namespace SampleApplication.WebApp.PlugIn.Administration
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}