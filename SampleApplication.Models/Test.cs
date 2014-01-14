using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleApplication.Models
{
    namespace Test {

        public class ListSummary
        {
            public int TestId { get; set; }
            public string TestCode { get; set; }
            public string TestName { get; set; }
            public int TestCategoryId { get; set; }
            public string TestCategory { get; set; }
            public string TestCommonName { get; set; }
        }

        public class TestCheck {

            public int TestId { get; set; }
            public string TestCode { get; set; }
            public string TestName { get; set; }
            public bool IsPrimary { get; set; }

        }

        public class TestData {

            public TestDetails TestDetails { get; set; }
            public List<TestSynonym> TestSynonym { get; set; }
            public List<TestSampleDetails> TestSampleDetails { get; set; }
            public List<TestRequirements> TestRequirements { get; set; }
            public List<TestSteps> TestSteps { get; set; }
            public List<TestTutorialStepDetails> TestTutorialStepDetails { get; set; }

        }

        public class TestDetails {

            public int TestID { get; set; }
            public int DomainID { get; set; }
            public int TestCategoryID { get; set; }
            public string TestCategory { get; set; }
            public string TestCode { get; set; }
            public string TestName { get; set; }
            public string Description { get; set; }
            public string GuideVersion { get; set; }
            public Nullable<decimal> EstimatedDuration { get; set; }
            public string LaboratoryId { get; set; }
            public string Laboratory { get; set; }
            public string ReferenceLaboratory { get; set; }
            public Nullable<int> CreatedUserId { get; set; }

        }

        public class TestSynonym {

            public int SynonymId { get; set; }
            public string PrimaryCode { get; set; }
            public string Code { get; set; }
            public string AltName { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }

        }
        
        public class TestSampleDetailsApplication {
            public string SampleApplicationId { get; set; }
            public string SampleApplication { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }
            public List<TestSampleDetailsApplicationEquipment> equipment { get; set; }
        }

        public class TestSampleDetailsApplicationEquipment
        {
            public int EquipmentId { get; set; }
            public string Equipment { get; set; }
            public string Unit { get; set; }
            public int NumberofSamples { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }
            public Nullable<decimal> MinQty { get; set; }
            public Nullable<decimal> IdealQty { get; set; }
            public List<TestSampleDetailsApplicationEquipmentCondition> condition { get; set; }
        }

        public class TestSampleDetailsApplicationEquipmentCondition {
            public string StandardConditionId { get; set; }
            public string StandardCondition { get; set; }
            public string SpecialCondition { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }
        }

        public class TestSampleDetails {

            public int TestID { get; set; }
            public string SampleTypeId { get; set; }
            public string SampleType { get; set; }
            public string AnalysisSampleTypeId { get; set; }
            public string AnalysisSampleType { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }
            public List<TestSampleDetailsApplication> application { get; set; }

        }

        public class TestRequirementsStandardRequirement {

            public string StandardRequirementId { get; set; }
            public string StandardRequirement { get; set; }
            public string RequirementDescription { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }

        }

        public class TestRequirements {

            public int RequirementId { get; set; }
            public int TestId { get; set; }
            public string RequirementTypeId { get; set; }
            public string RequirementType { get; set; }
            public bool IsAdded { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsModified { get; set; }
            public List<TestRequirementsStandardRequirement> StandardRequirement { get; set; }

        }

        public class TestSteps {

            public int StepID { get; set; }
            public int TestID { get; set; }
            public int CompetencyLevelID { get; set; }
            public string CompetencyLevel { get; set; }
            public string StepName { get; set; }
            public int StepOrder { get; set; }
            public string StepDescription { get; set; }
            public string ImageUrl { get; set; }
            public string VideoUrl { get; set; }
            public int CreatedUserId { get; set; }
            public bool IsDeleted { get; set; }

        }

        public class TestTutorialStepDetails {

            public int TutorialStepID { get; set; }
            public int TestID { get; set; }
            public string StepDescription { get; set; }
            public int StepOrderID { get; set; }
            public string VideoURL { get; set; }
            public string ImageURL { get; set; }
            public int DomainID { get; set; }
            public int CreatedUserId { get; set; }
            public bool IsDeleted { get; set; }

        }
    }
    
}
