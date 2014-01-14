using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SampleApplication.DataAccess.Models;
using SampleApplication.DataAccess.Repositories;

namespace SampleApplication.DataService
{
	public class EquipmentService
	{
		private IEquipmentRepository _repository;

		public EquipmentService()
		{
			this._repository = new EquipmentRepository();
		}

		public EquipmentService(IEquipmentRepository repository)
		{
			this._repository = repository;
		}
        
		public List<Models.EquipmentData> GetAllEquipment()
		{
			LookUpService lookupsrv = new LookUpService();
			List<Equipment> equipmentList = this._repository.GetAll().OrderByDescending(x=>x.CreatedDate).ToList();
			Models.EquipmentData eItem;
			List<Models.EquipmentData> eList = new List<Models.EquipmentData>();
			List<Models.LookUp> lookupdata = lookupsrv.GetAllLookUpData();
			foreach (var e in equipmentList)
			{
				eItem = new Models.EquipmentData();
				eItem.EquipmentID = e.EquipmentID;
				eItem.Descriptor = e.Descriptor;
				eItem.Description = e.Description;
				eItem.SmallImage = e.SmallImage;
				eItem.MediumImage = e.MediumImage;
				eItem.LargeImage = e.LargeImage;
				eItem.IsTestKit = e.IsTestKit;
				eItem.EquipmentClassId = e.EquipmentClass;
				if (e.EquipmentClass != null && e.EquipmentClass != "-1")
				{
					var lookUp_EqptClass = lookupdata.Where(x => x.ValueCode == e.EquipmentClass && x.TableName == "Equipment" && x.FieldName == "EquipmentClass").FirstOrDefault();
					if (lookUp_EqptClass != null)
					{
						eItem.EquipmentClass = lookUp_EqptClass.ValueDescription ?? "";
					}
				}
				else
				{
					eItem.EquipmentClass = "";
				}
				if (eItem.IsTestKit == true)
				{
					eItem.TestKitStatus = "checked";
				}
				else
				{
					eItem.TestKitStatus = "";
				}
				eItem.Supplier = (e.Supplier==""||e.Supplier==null||e.Supplier=="-1")?"":e.Supplier;
				eItem.SupplierCode = e.SupplierCode;
				eItem.CreatedDate = e.CreatedDate.ToString("dd/MM/yyyy");
				eList.Add(eItem);
			}
			return eList;
		}

		public List<Models.EquipmentData> GetByName(string pName)
		{
			List<Equipment> equipmentList = this._repository.GetByName(pName).ToList();
			Models.EquipmentData eItem;
			List<Models.EquipmentData> eList = new List<Models.EquipmentData>();
			foreach (var e in equipmentList)
			{
				
				eItem = new Models.EquipmentData();
				eItem.EquipmentID = e.EquipmentID;
				eItem.Descriptor = e.Descriptor;
				eItem.Description = e.Description;
				eItem.SmallImage = e.SmallImage;
				eItem.MediumImage = e.MediumImage;
				eItem.LargeImage = e.LargeImage;
				eItem.IsTestKit = e.IsTestKit;
				
				if (eItem.IsTestKit == true)
				{
					eItem.TestKitStatus = "checked";
				}
				else
				{
					eItem.TestKitStatus = "";
				}
				eItem.Supplier = e.Supplier;
				eItem.SupplierCode = e.SupplierCode;
				eItem.CreatedDate = e.CreatedDate.ToString("dd/MM/yyyy");
				eList.Add(eItem);
			}
			return eList;
		}

	}
}
