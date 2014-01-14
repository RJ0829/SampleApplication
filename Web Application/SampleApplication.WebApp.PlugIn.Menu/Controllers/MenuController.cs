using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

namespace SampleApplication.WebApp.PlugIn.Menu.Controllers
{

    public class TempDisplayMenuHelper
    {
        public string PageName { get; set; }
        public string PageURL { get; set; }
        public bool IsDefaultPage { get; set; }
        public string MenuImage { get; set; }
        public string hasChildren { get; set; }
        public bool DisplayMenu { get; set; }
        public int DisplayOrder { get; set; }
        public string level { get; set; }
        public List<TempDisplayMenuHelper> SubMenu { get; set; }
    }
    
    public class MenuController : Controller
    {
        [AllowAnonymous]
        public ActionResult TempBuildMenu()
        {
            string hostUrl = System.Configuration.ConfigurationManager.AppSettings["hostUrl"].ToString();
            string cssPath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/Content/menu.css";
            string imagePath = hostUrl + "Areas/" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Name.ToString() + "/Images/";

            ViewBag.MenuCssPath = cssPath;

            StringBuilder strMenu = new StringBuilder();

            strMenu.Append("<ul id='mainmenu' class='menu menuItemsFont'>");

            strMenu.Append(@"<li id='home'><h3><span class='iconCss'></span><a href='#'><img src='" + imagePath + "home.png' class='mainmenuImage' />&nbsp;&nbsp;Home<input type='hidden' id='hasChildren' value='false' /><input type='hidden' id='url' value='Home HTML' /><input type='hidden' id='level' value='1' /></a></h3></li>");
            
            List<TempDisplayMenuHelper> _displayMenus = new List<TempDisplayMenuHelper>();
            TempDisplayMenuHelper _displayMenu = null;

            List<TempDisplayMenuHelper> _displaySubMenus = null;
            TempDisplayMenuHelper _displaySubMenu = null;


            //1st level 
            _displayMenu = new TempDisplayMenuHelper();
            _displayMenu.PageName = "System";
            _displayMenu.PageURL = "";
            _displayMenu.MenuImage = "administration.png";
            _displayMenu.level = "2";
            _displayMenu.hasChildren = "true";
            
            _displaySubMenus = new List<TempDisplayMenuHelper>();

            _displaySubMenu = new TempDisplayMenuHelper();
            _displaySubMenu.PageName = "Look Up";
            _displaySubMenu.PageURL = hostUrl + "LookUp";
            _displaySubMenu.MenuImage = "lookup.png";
            _displaySubMenu.hasChildren = "false";
            _displaySubMenu.level = "3";
            _displaySubMenus.Add(_displaySubMenu);

         

            _displayMenu.SubMenu = _displaySubMenus;
            _displayMenus.Add(_displayMenu);

            //2nd level
            _displayMenu = new TempDisplayMenuHelper();
            _displayMenu.PageName = "Collection";
            _displayMenu.PageURL = "";
            _displayMenu.MenuImage = "administration.png";
            _displayMenu.level = "2";
            _displayMenu.hasChildren = "true";
            
            _displaySubMenus = new List<TempDisplayMenuHelper>();

            _displaySubMenu = new TempDisplayMenuHelper();
            _displaySubMenu.PageName = "Test";
            _displaySubMenu.PageURL = hostUrl + "Test";
            _displaySubMenu.MenuImage = "test.png";
            _displaySubMenu.hasChildren = "false";
            _displaySubMenu.level = "3";
            _displaySubMenus.Add(_displaySubMenu);


            _displayMenu.SubMenu = _displaySubMenus;
            _displayMenus.Add(_displayMenu);

            strMenu.Append(@"<li id='administration'><h3><span class='iconCss'></span><a href='#'><img src='" + imagePath + "administration.png' class='mainmenuImage' />&nbsp;&nbsp;Administration<input type='hidden' id='hasChildren' value='true' /><input type='hidden' id='url' value='' /><input type='hidden' id='level' value='1' /></a></h3>");

            if (_displayMenus.Count > 0)
            {

                strMenu.Append("<ul class='override menu menuItemsFont'>");

                for (int ctr = 0; ctr <= (_displayMenus.Count - 1); ctr++)
                {
                    string imagFullPath = "";
                    if (_displayMenus[ctr].MenuImage != null)
                    {
                        imagFullPath = imagePath + _displayMenus[ctr].MenuImage.ToString();
                    }

                    strMenu.Append(@"<li id='" + _displayMenus[ctr].PageName.ToString().Replace(" ", "") + "'><h3><span class='iconCss'></span><a href='#'><img src='" + imagFullPath + "' class='mainmenuImage'  />&nbsp;&nbsp;" + _displayMenus[ctr].PageName.ToString() + "<input type='hidden' id='hasChildren' value='" + _displayMenus[ctr].hasChildren + "' /><input type='hidden' id='url' value='" + _displayMenus[ctr].PageURL + "' /><input type='hidden' id='level' value='" + _displayMenus[ctr].level + "' /></a></h3>");

                    if (_displayMenus[ctr].hasChildren == "true") {

                        strMenu.Append("<ul class='override menu menuItemsFont'>");

                        for (int subctr = 0; subctr <= (_displayMenus[ctr].SubMenu.Count - 1); subctr++)
                        {
                            string subimagFullPath = "";
                            if (_displayMenus[ctr].SubMenu[subctr].MenuImage != null)
                            {
                                subimagFullPath = imagePath + _displayMenus[ctr].SubMenu[subctr].MenuImage.ToString();
                            }

                            strMenu.Append(@"<li id='" + _displayMenus[ctr].SubMenu[subctr].PageName.ToString().Replace(" ", "") + "'><h3><span class='iconCss'></span><a href='#'><img src='" + subimagFullPath + "' class='mainmenuImage'  />&nbsp;&nbsp;" + _displayMenus[ctr].SubMenu[subctr].PageName.ToString() + "<input type='hidden' id='hasChildren' value='" + _displayMenus[ctr].SubMenu[subctr].hasChildren + "' /><input type='hidden' id='url' value='" + _displayMenus[ctr].SubMenu[subctr].PageURL + "' /><input type='hidden' id='level' value='" + _displayMenus[ctr].SubMenu[subctr].level + "' /></a></h3>");

                            if (_displayMenus[ctr].SubMenu[subctr].hasChildren == "true") {

                                strMenu.Append("<ul class='override menu menuItemsFont'>");

                                for (int subsubctr = 0; subsubctr <= (_displayMenus[ctr].SubMenu[subctr].SubMenu.Count - 1); subsubctr++)
                                {

                                    string subsubimagFullPath = "";
                                    if (_displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].MenuImage != null)
                                    {
                                        subsubimagFullPath = imagePath + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].MenuImage.ToString();
                                    }

                                    strMenu.Append(@"<li id='" + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].PageName.ToString().Replace(" ", "") + "'><h3><span class='iconCss'></span><a href='#'><img src='" + subsubimagFullPath + "' class='mainmenuImage'  />&nbsp;&nbsp;" + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].PageName.ToString() + "<input type='hidden' id='hasChildren' value='" + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].hasChildren + "' /><input type='hidden' id='url' value='" + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].PageURL + "' /><input type='hidden' id='level' value='" + _displayMenus[ctr].SubMenu[subctr].SubMenu[subsubctr].level + "' /></a></h3>");

                                    strMenu.Append("</li>");
                                }

                                strMenu.Append("</ul>");

                            }

                            strMenu.Append("</li>");
                        }


                        strMenu.Append("</ul>");
                    }

                    strMenu.Append("</li>");
                    
                }

                strMenu.Append("</ul>");

            }

            strMenu.Append(@"</li>");

            #region Old

            //StringBuilder strMenu = new StringBuilder();
            //string parentURL = "";

            //strMenu.Append("<ul id='accordion'>");
            //strMenu.Append(@"<li><a href=""" + parentURL + @"""><div style='float:left;'><img src='" + imagePath + "home.png' style='border-style:none' /></div><div style='float:left;padding-top:5px;'>&nbsp;&nbsp;Home</div></a></li>");
            //strMenu.Append(@"<li><a href=""" + parentURL + @"""><div style='float:left;'><img src='" + imagePath + "dashboard.png' style='border-style:none' /></div><div style='float:left;padding-top:5px;'>&nbsp;&nbsp;Dashboard</div></a></li>");

            //List<TempDisplayMenuHelper> _displayMenus = new List<TempDisplayMenuHelper>();

            //TempDisplayMenuHelper _displayMenu = null;

            //_displayMenu = new TempDisplayMenuHelper();
            //_displayMenu.PageName = "User";
            //_displayMenu.PageURL = "http://localhost:51875/useradministration/index";
            //_displayMenu.MenuImage = "";
            //_displayMenus.Add(_displayMenu);

            //_displayMenu = new TempDisplayMenuHelper();
            //_displayMenu.PageName = "Test";
            //_displayMenu.PageURL = "http://localhost:51875/allergyadministration/index";
            //_displayMenu.MenuImage = "";
            //_displayMenus.Add(_displayMenu);

            //_displayMenu = new TempDisplayMenuHelper();
            //_displayMenu.PageName = "Reference";
            //_displayMenu.PageURL = "http://localhost:51875/patientadministration/index";
            //_displayMenu.MenuImage = "";
            //_displayMenus.Add(_displayMenu);

            //_displayMenu = new TempDisplayMenuHelper();
            //_displayMenu.PageName = "Equipment";
            //_displayMenu.PageURL = "http://localhost:51875/patientadministration/index";
            //_displayMenu.MenuImage = "";
            //_displayMenus.Add(_displayMenu);

            //if (_displayMenus.Count > 0)
            //{
            //    strMenu.Append(@"<li><a href=""#""><div style='float:left;'><img src='" + imagePath + "othermenu.png' style='border-style:none'  /></div><div style='float:left;padding-top:5px;'>&nbsp;&nbsp;Administration</div></a>");
            //    strMenu.Append("<ul>");

            //    for (int ctr = 0; ctr <= (_displayMenus.Count - 1); ctr++)
            //    {
            //        string imagFullPath = "";
            //        if (_displayMenus[ctr].MenuImage != null)
            //        {
            //            imagFullPath = imagePath + _displayMenus[ctr].MenuImage.ToString();
            //        }

            //        strMenu.Append(@"<li><table cellspacing='0' cellpadding='0' style='width:100%'><tr onclick=""document.location='" + _displayMenus[ctr].PageURL.ToString() + @"';""><td style=""background-image: url('" + imagFullPath + @"');"">" + _displayMenus[ctr].PageName.ToString() + @"</td></tr></table></li>");
            //     }

            //    strMenu.Append("</ul>");
            //    strMenu.Append("</li>");
            //}

            #endregion

            strMenu.Append("</ul>");

            ViewBag.DisplayMenu = strMenu.ToString();

            return PartialView("Menu");
        }
    }

}