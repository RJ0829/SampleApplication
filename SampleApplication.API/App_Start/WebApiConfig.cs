using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SampleApplication.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Routes.MapHttpRoute(
            //   name: "DefaultApi",
            //   routeTemplate: "api/{controller}/{id}",
            //   defaults: new { id = RouteParameter.Optional }
            //);

            //Start - Added by Raymond Sopena - Nov 7, 2013

            //To handle 1 Level Nested Resources

            config.Routes.MapHttpRoute(
                  name: "OneLevelNestedWithId",
                  routeTemplate: "api/{controller}/{parentid}/{action}/{childid}",
                  defaults: new { childid = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                  name: "OneLevelNested",
                  routeTemplate: "api/{controller}/{parentid}/{action}"
            );

            config.Routes.MapHttpRoute(
                 name: "ApiById",
                 routeTemplate: "api/{controller}/{id}",
                 defaults: new { id = RouteParameter.Optional },
                 constraints: new { id = @"^[0-9]+$" }
             );

            config.Routes.MapHttpRoute(
                name: "ApiByName",
                routeTemplate: "api/{controller}/{action}/{name}",
                defaults: null,
                constraints: new { name = @"^[a-z]+$" }
            );

            config.Routes.MapHttpRoute(
                name: "ApiByAction",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { action = "Get" }
            );

            //End - Added by Raymond Sopena - Nov 7, 2013

            //JSON by default
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);


            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            config.EnableSystemDiagnosticsTracing();
        }
    }
}
