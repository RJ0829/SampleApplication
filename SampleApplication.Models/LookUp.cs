using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleApplication.Models
{
    public class LookUp
    {
        public int Counter { get; set; }
        public int GroupID { get; set; }
        public string TableName { get; set; }
        public string FieldName { get; set; }
        public string ValueCode { get; set; }
        public Nullable<byte> DisplayOrder { get; set; }
        public string ValueDescription { get; set; }
        public string OwnerFieldName { get; set; }
        public string OwnerValue { get; set; }
        public Nullable<bool> DefaultValue { get; set; }
        public Nullable<bool> SystemRequired { get; set; }
        public Nullable<bool> Aliased { get; set; }
        public string ValueForAction { get; set; }
        public byte[] RecordLastUpdated { get; set; }
    }
}
