using System.Web;
using System.Web.Mvc;
using Thinktecture.IdentityModel.Authorization.Mvc;

namespace SampleApplication.WebApp.Core
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new ClaimsAuthorizeAttribute());
            filters.Add(new HandleErrorAttribute());
        }
    }
}