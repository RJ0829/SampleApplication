using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SampleApplication.DataService;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SampleApplication.API.Controllers
{
    public class LookUpController : ApiController
    {
        private LookUpService _service;

        public LookUpController() {
            _service = new LookUpService();
        }

        [HttpGet]
        // GET api/lookup
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.GetAllLookUpData().ToList());
        }

        [HttpGet]
        [ActionName("filter")]
        // GET api/lookup/filter?pTableName={value}&pFieldName={value}
        public HttpResponseMessage GetFilteredData(string pTableName, string pFieldName)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _service.GetFilteredLookUpData(pTableName, pFieldName).ToList());
        }

        // GET api/lookup/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/lookup
        public void Post([FromBody]string value)
        {
        }

        [HttpPost]
        // POST api/lookup/insert
        public HttpResponseMessage Insert(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);
            Models.LookUp lookUpData = new Models.LookUp();
            lookUpData.GroupID = json.GroupID;
            lookUpData.TableName = json.TableName;
            lookUpData.FieldName = json.FieldName;
            lookUpData.ValueCode = json.ValueCode;
            lookUpData.ValueDescription = json.ValueDescription;
            lookUpData.DisplayOrder = json.DisplayOrder;
            lookUpData.OwnerFieldName = json.OwnerFieldName;
            lookUpData.OwnerValue = json.OwnerValue;
            lookUpData.DefaultValue = json.DefaultValue;
            lookUpData.SystemRequired = json.SystemRequired;
            lookUpData.Aliased = json.Aliased;
            lookUpData.ValueForAction = json.ValueForAction;

            /* Temp */
            byte[] dateTime = BitConverter.GetBytes(DateTime.Now.Ticks);
            lookUpData.RecordLastUpdated = dateTime;

            return Request.CreateResponse(HttpStatusCode.OK, _service.Insert(lookUpData));
        }

        [HttpPut]
        // PUT api/lookup/update
        public HttpResponseMessage Update(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);
            Models.LookUp lookUpData = new Models.LookUp();
            lookUpData.GroupID = json.GroupID;
            lookUpData.TableName = json.TableName;
            lookUpData.FieldName = json.FieldName;
            lookUpData.ValueCode = json.ValueCode;
            lookUpData.ValueDescription = json.ValueDescription;
            lookUpData.DisplayOrder = json.DisplayOrder;
            lookUpData.OwnerFieldName = json.OwnerFieldName;
            lookUpData.OwnerValue = json.OwnerValue;
            lookUpData.DefaultValue = json.DefaultValue;
            lookUpData.SystemRequired = json.SystemRequired;
            lookUpData.Aliased = json.Aliased;
            lookUpData.ValueForAction = json.ValueForAction;

            /* Temp */
            byte[] dateTime = BitConverter.GetBytes(DateTime.Now.Ticks);
            lookUpData.RecordLastUpdated = dateTime;

            return Request.CreateResponse(HttpStatusCode.OK, _service.Update(lookUpData));
        }

        [HttpDelete]
        // Delete api/lookup/delete
        public HttpResponseMessage Delete(HttpRequestMessage req)
        {
            var jsonData = req.Content.ReadAsStringAsync().Result;
            dynamic json = JValue.Parse(jsonData);
            Models.LookUp lookUpData = new Models.LookUp();
            lookUpData.GroupID = json.GroupID;
            lookUpData.TableName = json.TableName;
            lookUpData.FieldName = json.FieldName;
            lookUpData.ValueCode = json.ValueCode;
            lookUpData.ValueDescription = json.ValueDescription;
            lookUpData.DisplayOrder = json.DisplayOrder;
            lookUpData.OwnerFieldName = json.OwnerFieldName;
            lookUpData.OwnerValue = json.OwnerValue;
            lookUpData.DefaultValue = json.DefaultValue;
            lookUpData.SystemRequired = json.SystemRequired;
            lookUpData.Aliased = json.Aliased;
            lookUpData.ValueForAction = json.ValueForAction;

            /* Temp */
            byte[] dateTime = BitConverter.GetBytes(DateTime.Now.Ticks);
            lookUpData.RecordLastUpdated = dateTime;

            return Request.CreateResponse(HttpStatusCode.OK, _service.Delete(lookUpData));
        }

        
    }
}
