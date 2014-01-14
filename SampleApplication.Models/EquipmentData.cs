using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleApplication.Models
{
	public class EquipmentData
	{
		public int EquipmentID { get; set; }
		public string Descriptor { get; set; }
		public string Description { get; set; }
		public bool? IsTestKit { get; set; }
		public string TestKitStatus { get; set; }
		public string Supplier { get; set; }
		public string SupplierCode { get; set; }
		public string EquipmentClassId { get; set; }
		public string EquipmentClass { get; set; }
		public string SmallImage { get; set; }
		public string MediumImage { get; set; }
		public string LargeImage { get; set; }
		public string CreatedDate { get; set; }
		public string ContainerName { get; set; }
		
	}

	

}
