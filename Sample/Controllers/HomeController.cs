using Sample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace Sample.Controllers
{


    public class HomeController : Controller
    {

        public string get_schools(string a , string b, string c)
        {

            return ("hi");
        }
    
       

  //    SchoolDb db = new SchoolDb();


        public string get_data(string type) {
         
           ViewBag.Message = type;
           return "done";
        
        }


        public ActionResult schoolDetail() {
            return View();
        
        }


        public ActionResult Index()
        {

    //       var model = db.School_basic_data.ToList();


            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }
        public ActionResult State() {
      
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        
        }

        public ActionResult Detail(string id)
        {
            ViewBag.Message =id ;
            return View();
        }

        public ActionResult pledge()
        {
            return View();

        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }




}
