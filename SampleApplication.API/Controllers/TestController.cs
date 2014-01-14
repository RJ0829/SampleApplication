using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SampleApplication.DataService;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;
using System.Web.Http;

namespace SampleApplication.API.Controllers
{
    public class TestController : ApiController
    {
        private TestService _service;

        public TestController()
        {
            _service = new TestService();
        }

        [HttpGet]
        // GET api/test
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
        }

        [HttpGet]
        // GET api/test/{id}
        public HttpResponseMessage Get(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.GetTestDetail(id));
        }

        [HttpGet]
        [ActionName("listsummary")]
        // GET api/test/listsummary?pSearchValue={value}&pSearchType={value}
        public HttpResponseMessage GetTestSummary(string pSearchValue, string pSearchType)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.GetTestListSummary(pSearchValue, pSearchType).ToList());
        }

        [HttpGet]
        [ActionName("testnames")]
        // GET api/test/testnames
        public HttpResponseMessage GetTestNames()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.GetTestNames().ToList());
        }

        [HttpGet]
        [ActionName("CheckTestExist")]
        // Get api/test/CheckTestExist?pcode={value}&ptestid={value}
        public HttpResponseMessage CheckTestExist(string pcode,string ptestid)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.CheckforExistingTestPerCode(pcode, Convert.ToInt32(ptestid)));
        }

        [HttpPost]
        // POST api/test/insert
        public HttpResponseMessage Insert(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);

            int returnData = _service.Insert(json);

            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }

        [HttpPut]
        // Put api/test/update
        public HttpResponseMessage Update(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);

            int returnData = _service.Update(json);

            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }

        [HttpPut]
        // Put api/test/delete
        public HttpResponseMessage Delete(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);

            int returnData = _service.Delete(json);

            return Request.CreateResponse(HttpStatusCode.OK, returnData);
        }

    }
}
