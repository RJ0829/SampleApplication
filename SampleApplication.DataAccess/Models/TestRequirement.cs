//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SampleApplication.DataAccess.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TestRequirement
    {
        public int RequirementId { get; set; }
        public int TestID { get; set; }
        public string RequirementType { get; set; }
        public string StandardRequirement { get; set; }
        public string RequirementDescription { get; set; }
    
        public virtual Test Test { get; set; }
    }
}
