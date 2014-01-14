using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SampleApplication.DataService;
using SampleApplication.DataAccess.Models;
using SampleApplication.DataAccess.Repositories;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;
using System.Web.Http;

namespace SampleApplication.API.Controllers
{
	
	public class EquipmentController : ApiController
	{
		private EquipmentService _service;

		public EquipmentController()
		{
			_service = new EquipmentService();
		}

		[HttpGet]
		// GET api/euqipment
		public HttpResponseMessage Get()
		{
			int DomainId = 1;
			return Request.CreateResponse(HttpStatusCode.OK, _service.GetAllEquipment().ToList());
		}

		[HttpGet]
		[ActionName("GetByName")]
		public HttpResponseMessage GetByName(string pName)
		{
			return Request.CreateResponse(HttpStatusCode.OK, _service.GetByName(pName).ToList());
		}

	}
}