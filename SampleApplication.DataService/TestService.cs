using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SampleApplication.DataAccess.Models;
using SampleApplication.DataAccess.Repositories;
using SampleApplication.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SampleApplication.DataService
{
    public class TestService
    {
        private ITestRepository _repository;

        public TestService()
        {
            this._repository = new TestRepository();
        }

        public TestService(ITestRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Get all data in the look up table
        /// </summary>
        /// <returns></returns>
        public List<Models.Test.ListSummary> GetTestListSummary(string pSearchValue, string pSearchType)
        {
            List<Models.Test.ListSummary> cTestListSummary = new List<Models.Test.ListSummary>();

            LookUpService lookUpSvc = new LookUpService();
            List<DataAccess.Models.TestSynonym> rTestSynonymListSummary = null;
            List<DataAccess.Models.Test> rTestListSummary = null;
            List<DataAccess.Models.Test> rTestListTempCode = null;
            DataAccess.Models.Test testData = null;
            string strCommonName = "";

            Models.Test.ListSummary testListSummary = null;

            List<Models.LookUp> cLookUpData = lookUpSvc.GetFilteredLookUpData("Test", "TestCategoryId");

            if (pSearchValue == "" || pSearchValue == null)
            {

                // get data from test table if there is no search value
                rTestListSummary = _repository.GetAll().ToList();

                for (int ctr = 0; ctr <= rTestListSummary.Count - 1; ctr++)
                {
                    testListSummary = new Models.Test.ListSummary();

                    testListSummary.TestId = rTestListSummary[ctr].TestID;
                    testListSummary.TestCode = rTestListSummary[ctr].TestCode;
                    testListSummary.TestName = "";

                    testListSummary.TestCategoryId = rTestListSummary[ctr].TestCategoryID;

                    Models.LookUp filterLookUp = cLookUpData.Where(l => l.ValueCode == rTestListSummary[ctr].TestCategoryID.ToString()).FirstOrDefault();

                    if (filterLookUp != null)
                    {
                        testListSummary.TestCategory = filterLookUp.ValueDescription;
                    }

                    List<DataAccess.Models.TestSynonym> l_testSynonym = _repository.GetTestSynonymByTestCode(testListSummary.TestCode).ToList();

                    for (int synonymCtr = 0; synonymCtr <= (l_testSynonym.Count - 1); synonymCtr++)
                    {
                        if (l_testSynonym.ElementAt(synonymCtr).Code != testListSummary.TestCode)
                        {
                            if (strCommonName != "")
                            {
                                strCommonName = strCommonName + ", " + l_testSynonym.ElementAt(synonymCtr).AlternateName + " (" + l_testSynonym.ElementAt(synonymCtr).Code + ")";
                            }
                            else
                            {
                                strCommonName = l_testSynonym.ElementAt(synonymCtr).AlternateName + " (" + l_testSynonym.ElementAt(synonymCtr).Code + ")";
                            }
                        }
                        else {
                            testListSummary.TestName = l_testSynonym.ElementAt(synonymCtr).AlternateName;
                        }
                        
                    }

                    testListSummary.TestCommonName = strCommonName;
                    strCommonName = "";

                    cTestListSummary.Add(testListSummary);

                }

            }
            else {

                // filter test synonym table based on search value to get test id
                if (pSearchType == "" || pSearchType == null)
                {
                    rTestSynonymListSummary = _repository.QueryTestSynonyms(t => t.AlternateName.Contains(pSearchValue)).ToList();
                }
                else {
                    if (pSearchType.Trim().ToLower() == "numeric") {
                        List<string> numericSearchType = new List<string> { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
                        rTestSynonymListSummary = _repository.QueryTestSynonyms(t => numericSearchType.Any(n => t.AlternateName.Contains(n))).ToList();
                    }
                }

                // filter test code table based on search value to get test id
                if (pSearchType == "" || pSearchType == null)
                {
                    rTestListTempCode = _repository.Query(t => t.TestCode.Contains(pSearchValue)).ToList();
                }
                else
                {
                    if (pSearchType.Trim().ToLower() == "numeric")
                    {
                        List<string> numericSearchType = new List<string> { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
                        rTestListTempCode = _repository.Query(t => numericSearchType.Any(n => t.TestCode.Contains(n))).ToList();
                    }
                }

                List<int> filtertedTestId = new List<int>();

                if (rTestSynonymListSummary.Count > 0) {
                    for (int sCtr = 0; sCtr <= rTestSynonymListSummary.Count - 1; sCtr++) { 
                        if(!filtertedTestId.Contains(rTestSynonymListSummary[sCtr].TestID)) {
                            filtertedTestId.Add(rTestSynonymListSummary[sCtr].TestID);
                        }
                    }
                }

                if (rTestListTempCode.Count > 0) {
                    for (int cCtr = 0; cCtr <= rTestListTempCode.Count - 1; cCtr++) {
                        if (!filtertedTestId.Contains(rTestListTempCode[cCtr].TestID))
                        {
                            filtertedTestId.Add(rTestListTempCode[cCtr].TestID);
                        }
                    }
                }

                for (int ctr = 0; ctr <= (filtertedTestId.Count - 1); ctr++) {

                    testData = _repository.GetById(filtertedTestId[ctr]);

                    if (!Convert.ToBoolean(testData.IsDeleted)) {

                        testListSummary = new Models.Test.ListSummary();

                        testListSummary.TestId = testData.TestID;
                        testListSummary.TestCode = testData.TestCode;
                        testListSummary.TestName = "";
                        testListSummary.TestCategoryId = testData.TestCategoryID;

                        Models.LookUp filterLookUp = cLookUpData.Where(l => l.ValueCode == testData.TestCategoryID.ToString()).FirstOrDefault();

                        if (filterLookUp != null)
                        {
                            testListSummary.TestCategory = filterLookUp.ValueDescription;
                        }

                        List<DataAccess.Models.TestSynonym> l_testSynonym = _repository.GetTestSynonymByTestCode(testListSummary.TestCode).ToList();

                        for (int synonymCtr = 0; synonymCtr <= (l_testSynonym.Count - 1); synonymCtr++)
                        {
                            if (l_testSynonym.ElementAt(synonymCtr).Code != testListSummary.TestCode)
                            {
                                if (strCommonName != "")
                                {
                                    strCommonName = strCommonName + ", " + l_testSynonym.ElementAt(synonymCtr).AlternateName + " (" + l_testSynonym.ElementAt(synonymCtr).Code + ")";
                                }
                                else
                                {
                                    strCommonName = l_testSynonym.ElementAt(synonymCtr).AlternateName + " (" + l_testSynonym.ElementAt(synonymCtr).Code + ")";
                                }
                            }
                            else
                            {
                                testListSummary.TestName = l_testSynonym.ElementAt(synonymCtr).AlternateName;
                            }
                        }

                        testListSummary.TestCommonName = strCommonName;
                        strCommonName = "";

                        cTestListSummary.Add(testListSummary);
                    }

                    

                }

            }
          
            return cTestListSummary;
        }

        public List<string> GetTestNames() {

            List<string> returnValue = new List<string>();
            List<DataAccess.Models.TestSynonym> rTestSynonym = _repository.GetAllTestSynonyms().ToList();
            
            if (rTestSynonym.Count > 0) {

                for (int sCtr = 0; sCtr <= rTestSynonym.Count - 1; sCtr++) {

                    if (!Convert.ToBoolean(rTestSynonym[sCtr].IsDeleted)) {

                        if (rTestSynonym[sCtr].AlternateName != null) {
                            if (!returnValue.Contains(rTestSynonym[sCtr].AlternateName))
                            {
                                returnValue.Add(rTestSynonym[sCtr].AlternateName.Trim());
                            }
                        }
                        
                        if (rTestSynonym[sCtr].Code != null) {
                            if (!returnValue.Contains(rTestSynonym[sCtr].Code))
                            {
                                returnValue.Add(rTestSynonym[sCtr].Code.Trim());
                            }
                        }
                        
                    }
                    
                }
            }

            return returnValue;
        }

        public Models.Test.TestCheck CheckforExistingTestPerCode(string code, int testid) 
        {
            Models.Test.TestCheck returnData = new Models.Test.TestCheck();

            DataAccess.Models.TestSynonym _testSynonym = this._repository.QueryTestSynonyms(d => d.Code == code).FirstOrDefault();

            if (_testSynonym != null) {

                if (testid != _testSynonym.TestID)
                {

                    if (_testSynonym.PrimaryCode == _testSynonym.Code)
                    {
                        returnData.TestId = _testSynonym.TestID;
                        returnData.TestCode = _testSynonym.Code;
                        returnData.TestName = _testSynonym.AlternateName;
                        returnData.IsPrimary = true;
                    }
                    else
                    {
                        returnData.TestId = _testSynonym.TestID;
                        returnData.TestCode = _testSynonym.Code;
                        returnData.TestName = _testSynonym.AlternateName;
                        returnData.IsPrimary = false;
                    }

                }
                
            }
            
            return returnData;
        }

        private string  GetLookUpDataForTestDetails(List<Models.LookUp> lookUpData, string code, string tableName, string fieldName) {

            Models.LookUp filterLookUp = lookUpData.Where(l => l.ValueCode == code && l.TableName == tableName && l.FieldName == fieldName).FirstOrDefault();

            if (filterLookUp != null)
            {
                return filterLookUp.ValueDescription;
            }
            else {
                return string.Empty;
            }

        }

        public Models.Test.TestData GetTestDetail(int id) {

            Models.Test.TestData TestData = new Models.Test.TestData();
            DataAccess.Models.Test _test = _repository.GetById(id);

            if (_test != null) {

                LookUpService lookUpSvc = new LookUpService();
                List<Models.LookUp> cLookUpData = lookUpSvc.GetAllLookUpData();

                Models.Test.TestDetails _testDetails = new Models.Test.TestDetails();

                _testDetails.TestID = _test.TestID;
                _testDetails.DomainID = _test.DomainID;
                _testDetails.TestCategoryID =_test.TestCategoryID;
                _testDetails.TestCategory = GetLookUpDataForTestDetails(cLookUpData, _test.TestCategoryID.ToString(), "Test", "TestCategoryId");
                _testDetails.TestCode =_test.TestCode;
                _testDetails.TestName ="";
                _testDetails.Description = _test.Description;
                _testDetails.GuideVersion = _test.GuideVersion;
                _testDetails.EstimatedDuration = _test.EstimatedDuration;
                _testDetails.LaboratoryId = _test.Laboratory != null ? _test.Laboratory : string.Empty;
                _testDetails.Laboratory = GetLookUpDataForTestDetails(cLookUpData, _testDetails.LaboratoryId.ToString(), "Test", "Laboratory"); ;
                _testDetails.ReferenceLaboratory = _test.ReferenceLaboratory;
                _testDetails.CreatedUserId = _test.CreatedUserId;

                //Synonyms
                List<DataAccess.Models.TestSynonym> l_testSynonym = _repository.GetTestSynonymByTestCode(_testDetails.TestCode).ToList();
                List<Models.Test.TestSynonym> cTestSynonym = new List<Models.Test.TestSynonym>();
                for (int synonymCtr = 0; synonymCtr <= l_testSynonym.Count - 1; synonymCtr++)
                {

                    if (!Convert.ToBoolean(l_testSynonym.ElementAt(synonymCtr).IsDeleted))
                    {
                        if (l_testSynonym.ElementAt(synonymCtr).Code != _test.TestCode)
                        {
                            Models.Test.TestSynonym _testSynonym = new Models.Test.TestSynonym();
                            _testSynonym.SynonymId = l_testSynonym.ElementAt(synonymCtr).SynonymId;
                            _testSynonym.PrimaryCode = l_testSynonym.ElementAt(synonymCtr).PrimaryCode;
                            _testSynonym.Code = l_testSynonym.ElementAt(synonymCtr).Code;
                            _testSynonym.AltName = l_testSynonym.ElementAt(synonymCtr).AlternateName;
                            _testSynonym.IsAdded = false;
                            _testSynonym.IsDeleted = false;
                            _testSynonym.IsModified = false;
                            cTestSynonym.Add(_testSynonym);
                        }
                        else {
                            _testDetails.TestName = l_testSynonym.ElementAt(synonymCtr).AlternateName;
                        }
                        

                    }
                    
                }

                //Sample and Conditions
                List<Models.Test.TestSampleDetails> cTestSamples = new List<Models.Test.TestSampleDetails>();
                for (int sampleDetailsCtr = 0; sampleDetailsCtr <= _test.TestSamples.Count - 1; sampleDetailsCtr++)
                {

                    if (cTestSamples.Where(d => d.SampleTypeId == _test.TestSamples.ElementAt(sampleDetailsCtr).SampleType).ToList().Count == 0) {

                        Models.Test.TestSampleDetails _testSamples = new Models.Test.TestSampleDetails();
                        _testSamples.TestID = _test.TestSamples.ElementAt(sampleDetailsCtr).TestID;
                        _testSamples.SampleTypeId = _test.TestSamples.ElementAt(sampleDetailsCtr).SampleType;
                        _testSamples.SampleType = GetLookUpDataForTestDetails(cLookUpData, _testSamples.SampleTypeId.ToString(), "TestSample", "SampleType");
                        _testSamples.AnalysisSampleTypeId = _test.TestSamples.ElementAt(sampleDetailsCtr).AnalysisSampleType;
                        _testSamples.AnalysisSampleType = GetLookUpDataForTestDetails(cLookUpData, _testSamples.AnalysisSampleTypeId.ToString(), "TestSample", "AnalysisSampleType");
                        _testSamples.IsAdded = false;
                        _testSamples.IsDeleted = false;
                        _testSamples.IsModified = false;

                        var application = _test.TestSamples.Where(d => d.SampleType == _test.TestSamples.ElementAt(sampleDetailsCtr).SampleType).ToList();

                        List<Models.Test.TestSampleDetailsApplication> cApplication = new List<Models.Test.TestSampleDetailsApplication>();
                        for (int appplicationCtr = 0; appplicationCtr <= application.Count - 1; appplicationCtr++) {

                            if (cApplication.Where(d => d.SampleApplicationId == application[appplicationCtr].SampleClassRule).ToList().Count == 0) {

                                Models.Test.TestSampleDetailsApplication _application = new Models.Test.TestSampleDetailsApplication();
                                _application.SampleApplicationId = application[appplicationCtr].SampleClassRule;
                                _application.SampleApplication = GetLookUpDataForTestDetails(cLookUpData, application[appplicationCtr].SampleClassRule.ToString(), "TestSample", "SampleSampClassRule");
                                _application.IsAdded = false;
                                _application.IsDeleted = false;
                                _application.IsModified = false;

                                var equipment = application.Where(d => d.SampleClassRule == application[appplicationCtr].SampleClassRule).ToList();

                                List<Models.Test.TestSampleDetailsApplicationEquipment> cEquipment = new List<Models.Test.TestSampleDetailsApplicationEquipment>();
                                for (int eCtr = 0; eCtr <= equipment.Count - 1; eCtr++) {

                                    Models.Test.TestSampleDetailsApplicationEquipment _eqpt = new Models.Test.TestSampleDetailsApplicationEquipment();
                                    _eqpt.EquipmentId = equipment[eCtr].EquipmentID;

                                    _eqpt.Equipment = equipment[eCtr].EquipmentID.ToString();

                                    _eqpt.NumberofSamples = equipment[eCtr].SmaplesRequired;
                                    _eqpt.MinQty = equipment[eCtr].MinimumQuantity;
                                    _eqpt.IdealQty = equipment[eCtr].IdealQuantity;

                                    _eqpt.IsAdded = false;
                                    _eqpt.IsDeleted = false;
                                    _eqpt.IsModified = false;

                                    var _conditionData = this._repository.GetTestSampleConditionBySampleId(equipment[eCtr].SampleId).ToList();
                                    List<Models.Test.TestSampleDetailsApplicationEquipmentCondition> cCondition = new List<Models.Test.TestSampleDetailsApplicationEquipmentCondition>();
                                    for (int cCtr = 0; cCtr <= _conditionData.Count - 1; cCtr++) {

                                        Models.Test.TestSampleDetailsApplicationEquipmentCondition _cData = new Models.Test.TestSampleDetailsApplicationEquipmentCondition();
                                        _cData.StandardConditionId = _conditionData[cCtr].StandardCondition;
                                        _cData.StandardCondition = GetLookUpDataForTestDetails(cLookUpData, _conditionData[cCtr].StandardCondition.ToString(), "SampleTransportCondition", "StandardCondition");
                                        _cData.SpecialCondition = _conditionData[cCtr].SpecialCondition;
                                        _cData.IsAdded = false;
                                        _cData.IsDeleted = false;
                                        _cData.IsModified = false;
                                        cCondition.Add(_cData);
                                    }
                                    _eqpt.condition = cCondition;
                                    
                                    cEquipment.Add(_eqpt);
                                }

                                _application.equipment = cEquipment;
                                cApplication.Add(_application);

                            }
                            
                        }

                        _testSamples.application = cApplication;

                        cTestSamples.Add(_testSamples);
                    }
                    
                }

                //Requirements
                List<Models.Test.TestRequirements> cTestRequirements = new List<Models.Test.TestRequirements>();
                for (int requirementDetailsCtr = 0; requirementDetailsCtr <= _test.TestRequirements.Count - 1; requirementDetailsCtr++)
                {

                    if (cTestRequirements.Where(d => d.RequirementTypeId == _test.TestRequirements.ElementAt(requirementDetailsCtr).RequirementType).ToList().Count == 0) {

                        Models.Test.TestRequirements _testRequirements = new Models.Test.TestRequirements();

                        _testRequirements.RequirementId = _test.TestRequirements.ElementAt(requirementDetailsCtr).RequirementId;
                        _testRequirements.TestId = _test.TestRequirements.ElementAt(requirementDetailsCtr).TestID;
                        _testRequirements.RequirementTypeId = _test.TestRequirements.ElementAt(requirementDetailsCtr).RequirementType;
                        _testRequirements.RequirementType = GetLookUpDataForTestDetails(cLookUpData, _testRequirements.RequirementTypeId.ToString(), "TestRequirement", "RequirementType");
                        _testRequirements.IsAdded = false;
                        _testRequirements.IsDeleted = false;
                        _testRequirements.IsModified = false;

                        var standartrequirementData = _test.TestRequirements.Where(d => d.RequirementType == _test.TestRequirements.ElementAt(requirementDetailsCtr).RequirementType).ToList();
                        List<Models.Test.TestRequirementsStandardRequirement> cTestRequirementsStandardRequirement = new List<Models.Test.TestRequirementsStandardRequirement>();
                        for (int ctr = 0; ctr <= standartrequirementData.Count - 1; ctr++) {
                            Models.Test.TestRequirementsStandardRequirement _TestRequirementsStandardRequirement = new Models.Test.TestRequirementsStandardRequirement();
                            _TestRequirementsStandardRequirement.StandardRequirementId = standartrequirementData[ctr].StandardRequirement;
                            _TestRequirementsStandardRequirement.StandardRequirement = GetLookUpDataForTestDetails(cLookUpData, standartrequirementData[ctr].StandardRequirement.ToString(), "TestRequirement", "StandardRequirement");
                            _TestRequirementsStandardRequirement.RequirementDescription = standartrequirementData[ctr].RequirementDescription;
                            _TestRequirementsStandardRequirement.IsAdded = false;
                            _TestRequirementsStandardRequirement.IsDeleted = false;
                            _TestRequirementsStandardRequirement.IsModified = false;
                            cTestRequirementsStandardRequirement.Add(_TestRequirementsStandardRequirement);

                        }

                        _testRequirements.StandardRequirement = cTestRequirementsStandardRequirement;
                        cTestRequirements.Add(_testRequirements);
                        

                    }
                                        

                }

                //Steps
                List<Models.Test.TestSteps> cTestSteps = new List<Models.Test.TestSteps>();

                for (int stepsDetailsCtr = 0; stepsDetailsCtr <= _test.TestSteps.Count - 1; stepsDetailsCtr++)
                {
                    if (!_test.TestSteps.ElementAt(stepsDetailsCtr).IsDeleted) {

                        Models.Test.TestSteps _testSteps = new Models.Test.TestSteps();

                        _testSteps.StepID = _test.TestSteps.ElementAt(stepsDetailsCtr).StepID;
                        _testSteps.TestID = _test.TestSteps.ElementAt(stepsDetailsCtr).TestID;
                        _testSteps.CompetencyLevelID = _test.TestSteps.ElementAt(stepsDetailsCtr).CompetencyLevelID;
                        _testSteps.CompetencyLevel = GetLookUpDataForTestDetails(cLookUpData, _testSteps.CompetencyLevelID.ToString(), "TestStep", "CompetencyLevelID");
                        _testSteps.StepName = _test.TestSteps.ElementAt(stepsDetailsCtr).StepName;
                        _testSteps.StepOrder = _test.TestSteps.ElementAt(stepsDetailsCtr).StepOrder;
                        _testSteps.StepDescription = _test.TestSteps.ElementAt(stepsDetailsCtr).StepDescription;
                        _testSteps.ImageUrl = _test.TestSteps.ElementAt(stepsDetailsCtr).ImageUrl;
                        _testSteps.VideoUrl = _test.TestSteps.ElementAt(stepsDetailsCtr).VideoUrl;
                        _testSteps.CreatedUserId = _test.TestSteps.ElementAt(stepsDetailsCtr).CreatedUserId;
                        _testSteps.IsDeleted = _test.TestSteps.ElementAt(stepsDetailsCtr).IsDeleted;

                        cTestSteps.Add(_testSteps);

                    }
                    
                }

                //Tutorial Steps
                List<Models.Test.TestTutorialStepDetails> cTestTutorialSteps = new List<Models.Test.TestTutorialStepDetails>();

                for (int tutorialStepsDetailsCtr = 0; tutorialStepsDetailsCtr <= _test.TestTutorialSteps.Count - 1; tutorialStepsDetailsCtr++)
                {
                    if (!_test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).IsDeleted) {

                        Models.Test.TestTutorialStepDetails _testTutorialSteps = new Models.Test.TestTutorialStepDetails();

                        _testTutorialSteps.TutorialStepID = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).TutorialStepID;
                        _testTutorialSteps.TestID = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).TestID;
                        _testTutorialSteps.StepDescription = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).StepDescription;
                        _testTutorialSteps.StepOrderID = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).StepOrderID;
                        _testTutorialSteps.VideoURL = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).VideoURL;
                        _testTutorialSteps.ImageURL = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).ImageURL;
                        _testTutorialSteps.DomainID = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).DomainID;
                        _testTutorialSteps.CreatedUserId = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).CreatedUserId;
                        _testTutorialSteps.IsDeleted = _test.TestTutorialSteps.ElementAt(tutorialStepsDetailsCtr).IsDeleted;

                        cTestTutorialSteps.Add(_testTutorialSteps);

                    }
                    
                }

                //Fill data
                TestData.TestDetails = _testDetails;
                TestData.TestSynonym = cTestSynonym;
                TestData.TestSampleDetails = cTestSamples;
                TestData.TestRequirements = cTestRequirements;
                TestData.TestSteps = cTestSteps;
                TestData.TestTutorialStepDetails = cTestTutorialSteps;
            
            }

            return TestData;

        }

        public int Insert(dynamic testData)
        {
            DataAccess.Models.Test testEntity = new DataAccess.Models.Test();

            testEntity.DomainID = testData.DomainId;
            testEntity.TestCategoryID = testData.TestDetails[0].TestCategoryId;
            testEntity.TestCode = testData.TestDetails[0].TestCode;
            testEntity.Description = testData.TestDetails[0].Description;
            testEntity.GuideVersion = testData.TestDetails[0].GuideVersion;
            testEntity.EstimatedDuration = testData.TestDetails[0].EstimatedDuration;
            testEntity.Laboratory = testData.TestDetails[0].LaboratoryId;
            testEntity.ReferenceLaboratory = testData.TestDetails[0].ReferenceLaboratory;
            testEntity.IsDeleted = false;
            testEntity.CreatedDate = System.DateTime.Now;
            testEntity.CreatedUserId = testData.UserId;

            //TestSamples and Conditions
            #region Test Samples and Conditions 

            foreach (var testSample in testData.TestSampleDetails)
            {
                Boolean sampleTypeIsDeleted = testSample.IsDeleted;

                if (!sampleTypeIsDeleted)
                {

                    DataAccess.Models.TestSample testSampleEntity = new DataAccess.Models.TestSample();

                    foreach (var sampleApplication in testSample.application) {

                        Boolean sampleApplicationIsDeleted = sampleApplication.IsDeleted;

                        if (!sampleApplicationIsDeleted) {

                            foreach (var equipment in sampleApplication.equipment)
                            {

                                Boolean sampleEquipmentIsDeleted = equipment.IsDeleted;

                                if (!sampleEquipmentIsDeleted) {

                                    testSampleEntity.SampleType = testSample.SampleTypeId;
                                    testSampleEntity.AnalysisSampleType = testSample.AnalysisSampleTypeId;
                                    testSampleEntity.EquipmentID = equipment.EquipmentId;
                                    testSampleEntity.SmaplesRequired = equipment.NumberofSamples;
                                    testSampleEntity.SampleClassRule = sampleApplication.SampleApplicationId;

                                    testSampleEntity.Unit = equipment.UnitId;
                                    testSampleEntity.MinimumQuantity = equipment.MinQty;
                                    testSampleEntity.IdealQuantity = equipment.IdealQty;

                                    if (equipment.condition != null) {

                                        foreach (var condition in equipment.condition)
                                        {

                                            Boolean sampleConditionIsDeleted = condition.IsDeleted;

                                            if (!sampleConditionIsDeleted)
                                            {

                                                DataAccess.Models.SampleTransportCondition testSampleConditionEntity = new SampleTransportCondition();
                                                testSampleConditionEntity.StandardCondition = condition.StandardConditionId;
                                                testSampleConditionEntity.SpecialCondition = condition.SpecialCondition;
                                                testSampleEntity.SampleTransportConditions.Add(testSampleConditionEntity);
                                            }

                                        }
                                    }
                                   

                                    testEntity.TestSamples.Add(testSampleEntity);
                                }

                            }
                        }
                    }
                
                }

            }

            #endregion


            //Test Requirement
            foreach (var requirement in testData.TestRequirements)
            {
                Boolean requirementIsDeleted = requirement.IsDeleted;
                
                if (!requirementIsDeleted) {

                    foreach (var standardrequirement in requirement.StandardRequirement)
                    {

                        DataAccess.Models.TestRequirement testRequirementEntity = new DataAccess.Models.TestRequirement();
                        testRequirementEntity.RequirementType = requirement.RequirementTypeId;
                        testRequirementEntity.StandardRequirement = standardrequirement.StandardRequirementId;
                        testRequirementEntity.RequirementDescription = standardrequirement.RequirementDescription;
                        testEntity.TestRequirements.Add(testRequirementEntity);
                    }
                
                }
            
            }

            //Test Steps
            foreach (var step in testData.TestSteps)
            {
                Boolean stepIsDeleted = step.IsDeleted;

                if (!stepIsDeleted)
                {
                    DataAccess.Models.TestStep testStepEntity = new DataAccess.Models.TestStep();
                    testStepEntity.CompetencyLevelID = step.CompetencyLevelId;
                    testStepEntity.StepName = step.StepName;
                    testStepEntity.StepOrder = step.StepOrder;
                    testStepEntity.StepDescription = step.Description;
                    testStepEntity.ImageUrl = step.ImageURL;
                    testStepEntity.VideoUrl = step.VideoURL;
                    testStepEntity.CreatedDate = System.DateTime.Now;
                    testStepEntity.IsDeleted = false;
                    testStepEntity.CreatedUserId = testData.UserId;
                    testEntity.TestSteps.Add(testStepEntity);
                }

            }

            //Test Tutorial Steps
            foreach (var tutorialStep in testData.TestTutorialStepDetails)
            {
                Boolean tutorialStepIsDeleted = tutorialStep.IsDeleted;

                if (!tutorialStepIsDeleted)
                {
                    DataAccess.Models.TestTutorialStep testTutorialStepEntity = new DataAccess.Models.TestTutorialStep();
                    testTutorialStepEntity.StepOrderID = tutorialStep.StepOrder;
                    testTutorialStepEntity.StepDescription = tutorialStep.Description;
                    testTutorialStepEntity.ImageURL = tutorialStep.ImageURL;
                    testTutorialStepEntity.VideoURL = tutorialStep.VideoURL;
                    testTutorialStepEntity.CreatedDate = System.DateTime.Now;
                    testTutorialStepEntity.DomainID = testData.DomainId;
                    testTutorialStepEntity.IsDeleted = false;
                    testTutorialStepEntity.CreatedUserId = testData.UserId;
                    testEntity.TestTutorialSteps.Add(testTutorialStepEntity);
                }

            }

            this._repository.Insert(testEntity);

            //insert primary code and name
            DataAccess.Models.TestSynonym testSynonynmEntity = new DataAccess.Models.TestSynonym();
            testSynonynmEntity.TestID = testEntity.TestID;
            testSynonynmEntity.PrimaryCode = testData.TestDetails[0].TestCode;
            testSynonynmEntity.Code = testData.TestDetails[0].TestCode;
            testSynonynmEntity.AlternateName = testData.TestDetails[0].TestName;
            testSynonynmEntity.CreatedDate = System.DateTime.Now;
            testSynonynmEntity.IsDeleted = false;
            testSynonynmEntity.CreatedUserId = testData.UserId;
            this._repository.InsertTestSynonym(testSynonynmEntity);

            //Testsynonym
            foreach (var synonym in testData.TestSynonym)
            {
                Boolean synonymIsDeleted = synonym.IsDeleted;

                if (!synonymIsDeleted) {

                    testSynonynmEntity = new DataAccess.Models.TestSynonym();
                    testSynonynmEntity.TestID = testEntity.TestID;
                    testSynonynmEntity.PrimaryCode = synonym.PrimaryCode;
                    testSynonynmEntity.Code = synonym.Code;
                    testSynonynmEntity.AlternateName = synonym.AltName;
                    testSynonynmEntity.CreatedDate = System.DateTime.Now;
                    testSynonynmEntity.IsDeleted = false;
                    testSynonynmEntity.CreatedUserId = testData.UserId;
                    this._repository.InsertTestSynonym(testSynonynmEntity);

                }
             }

            return 1;
        }

        public int Update(dynamic testData)
        {
            int id = testData.TestDetails[0].TestId;
            DataAccess.Models.Test testEntity = _repository.GetById(id);

            if (testEntity != null) {

                testEntity.DomainID = testData.DomainId;
                testEntity.TestCategoryID = testData.TestDetails[0].TestCategoryId;
                testEntity.TestCode = testData.TestDetails[0].TestCode;
                testEntity.Description = testData.TestDetails[0].Description;
                testEntity.GuideVersion = testData.TestDetails[0].GuideVersion;
                testEntity.EstimatedDuration = testData.TestDetails[0].EstimatedDuration;
                testEntity.Laboratory = testData.TestDetails[0].LaboratoryId;
                testEntity.ReferenceLaboratory = testData.TestDetails[0].ReferenceLaboratory;
                testEntity.IsDeleted = false;
                testEntity.LastUpdate = System.DateTime.Now;
                testEntity.LastUpdateUser = testData.UserId;
            }

            this._repository.Update(testEntity);

            //TestSamples and Conditions
            #region Test Sample and Conditions
            
            foreach (var sample in testData.TestSampleDetails)
            {
                Boolean sampleIsDeleted = sample.IsDeleted;
                Boolean sampleIsAdded = sample.IsAdded;
                string sampleTypeId = sample.SampleTypeId;
                int testId = id;

                if (sampleIsDeleted)
                {

                    List<DataAccess.Models.TestSample> testSampleEntity = testEntity.TestSamples.Where(ts => ts.TestID == testId && ts.SampleType == sampleTypeId).ToList();

                    for (int sampleCtr = 0; sampleCtr <= testSampleEntity.Count - 1; sampleCtr++)
                    {
                        List<DataAccess.Models.SampleTransportCondition> sampleTransConditionEntity = this._repository.GetTestSampleConditionBySampleId(testSampleEntity[sampleCtr].SampleId).ToList();

                        for (int condCtr = 0; condCtr <= sampleTransConditionEntity.Count - 1; condCtr++)
                        {
                            this._repository.DeleteTestSampleCondition(sampleTransConditionEntity[condCtr]);
                        }

                        this._repository.DeleteTestSample(testSampleEntity[sampleCtr]);
                    }
                }
                else if (sampleIsAdded)
                {
                    #region Add data via Sample Type
                    
                    DataAccess.Models.TestSample testSampleEntity = new DataAccess.Models.TestSample();

                    foreach (var sampleApplication in sample.application)
                    {

                        Boolean sampleApplicationIsDeleted = sampleApplication.IsDeleted;

                        if (!sampleApplicationIsDeleted)
                        {

                            foreach (var equipment in sampleApplication.equipment)
                            {

                                Boolean sampleEquipmentIsDeleted = equipment.IsDeleted;

                                if (!sampleEquipmentIsDeleted)
                                {

                                    testSampleEntity.TestID = id;
                                    testSampleEntity.SampleType = sample.SampleTypeId;
                                    testSampleEntity.AnalysisSampleType = sample.AnalysisSampleTypeId;
                                    testSampleEntity.EquipmentID = equipment.EquipmentId;
                                    testSampleEntity.SmaplesRequired = equipment.NumberofSamples;
                                    testSampleEntity.SampleClassRule = sampleApplication.SampleApplicationId;

                                    testSampleEntity.Unit = equipment.UnitId;
                                    testSampleEntity.MinimumQuantity = equipment.MinQty;
                                    testSampleEntity.IdealQuantity = equipment.IdealQty;


                                    if (equipment.condition != null) {

                                        foreach (var condition in equipment.condition)
                                        {

                                            Boolean sampleConditionIsDeleted = condition.IsDeleted;

                                            if (!sampleConditionIsDeleted)
                                            {

                                                DataAccess.Models.SampleTransportCondition testSampleConditionEntity = new SampleTransportCondition();
                                                testSampleConditionEntity.StandardCondition = condition.StandardConditionId;
                                                testSampleConditionEntity.SpecialCondition = condition.SpecialCondition;
                                                testSampleEntity.SampleTransportConditions.Add(testSampleConditionEntity);
                                            }

                                        }
                                    }
                                    

                                    this._repository.AddTestSample(testSampleEntity);

                                }

                            }
                        }
                    }

                    #endregion
                }
                else
                {
                    foreach (var application in sample.application)
                    {

                        Boolean applicationIsDeleted = application.IsDeleted;
                        Boolean applicationIsAdded = application.IsAdded;

                        if (applicationIsDeleted) {

                            string applicationId = application.SampleApplicationId;
                            List<DataAccess.Models.TestSample> testSampleEntity = testEntity.TestSamples.Where(ts => ts.TestID == testId && ts.SampleType == sampleTypeId && ts.SampleClassRule == applicationId).ToList();

                            for (int sampleCtr = 0; sampleCtr <= testSampleEntity.Count - 1; sampleCtr++)
                            {
                                List<DataAccess.Models.SampleTransportCondition> sampleTransConditionEntity = this._repository.GetTestSampleConditionBySampleId(testSampleEntity[sampleCtr].SampleId).ToList();

                                for (int condCtr = 0; condCtr <= sampleTransConditionEntity.Count - 1; condCtr++)
                                {
                                    this._repository.DeleteTestSampleCondition(sampleTransConditionEntity[condCtr]);
                                }

                                this._repository.DeleteTestSample(testSampleEntity[sampleCtr]);
                            }
                        }
                        else if (applicationIsAdded)
                        {

                            #region Add data via Sample Application

                            DataAccess.Models.TestSample testSampleEntity = new DataAccess.Models.TestSample();

                            foreach (var equipment in application.equipment)
                            {

                                Boolean sampleEquipmentIsDeleted = equipment.IsDeleted;

                                if (!sampleEquipmentIsDeleted)
                                {

                                    testSampleEntity.TestID = id;
                                    testSampleEntity.SampleType = sample.SampleTypeId;
                                    testSampleEntity.AnalysisSampleType = sample.AnalysisSampleTypeId;
                                    testSampleEntity.EquipmentID = equipment.EquipmentId;
                                    testSampleEntity.SmaplesRequired = equipment.NumberofSamples;
                                    testSampleEntity.SampleClassRule = application.SampleApplicationId;

                                    testSampleEntity.Unit = equipment.UnitId;
                                    testSampleEntity.MinimumQuantity = equipment.MinQty;
                                    testSampleEntity.IdealQuantity = equipment.IdealQty;

                                    if (equipment.condition != null) {

                                        foreach (var condition in equipment.condition)
                                        {

                                            Boolean sampleConditionIsDeleted = condition.IsDeleted;

                                            if (!sampleConditionIsDeleted)
                                            {

                                                DataAccess.Models.SampleTransportCondition testSampleConditionEntity = new SampleTransportCondition();
                                                testSampleConditionEntity.StandardCondition = condition.StandardConditionId;
                                                testSampleConditionEntity.SpecialCondition = condition.SpecialCondition;
                                                testSampleEntity.SampleTransportConditions.Add(testSampleConditionEntity);
                                            }

                                        }

                                    }
                                    

                                    this._repository.AddTestSample(testSampleEntity);

                                }

                            }

                            #endregion

                        }
                        else {

                            foreach (var equipment in application.equipment)
                            {

                                Boolean sampleEquipmentIsAdded = equipment.IsAdded;
                                Boolean sampleEquipmentIsDeleted = equipment.IsDeleted;
                                Boolean sampleEquipmentIsModified = equipment.IsModified;

                                if (sampleEquipmentIsAdded) {

                                    #region Add data via Sample Equipment

                                    DataAccess.Models.TestSample testSampleEntity = new DataAccess.Models.TestSample();

                                    testSampleEntity.TestID = id;
                                    testSampleEntity.SampleType = sample.SampleTypeId;
                                    testSampleEntity.AnalysisSampleType = sample.AnalysisSampleTypeId;
                                    testSampleEntity.EquipmentID = equipment.EquipmentId;
                                    testSampleEntity.SmaplesRequired = equipment.NumberofSamples;
                                    testSampleEntity.SampleClassRule = application.SampleApplicationId;

                                    testSampleEntity.Unit = equipment.UnitId;
                                    testSampleEntity.MinimumQuantity = equipment.MinQty;
                                    testSampleEntity.IdealQuantity = equipment.IdealQty;

                                    if (equipment.condition != null) {

                                        foreach (var condition in equipment.condition)
                                        {

                                            Boolean sampleConditionIsDeleted = condition.IsDeleted;

                                            if (!sampleConditionIsDeleted)
                                            {

                                                DataAccess.Models.SampleTransportCondition testSampleConditionEntity = new SampleTransportCondition();
                                                testSampleConditionEntity.StandardCondition = condition.StandardConditionId;
                                                testSampleConditionEntity.SpecialCondition = condition.SpecialCondition;
                                                testSampleEntity.SampleTransportConditions.Add(testSampleConditionEntity);
                                            }

                                        }

                                    }

                                    this._repository.AddTestSample(testSampleEntity);

                                    #endregion

                                }

                                if (sampleEquipmentIsDeleted) {

                                    string applicationid = application.SampleApplicationId;
                                    int equipmentid = equipment.EquipmentId;
                                    List<DataAccess.Models.TestSample> testSampleEntity = testEntity.TestSamples.Where(ts => ts.TestID == testId && ts.SampleType == sampleTypeId && ts.SampleClassRule == applicationid && ts.EquipmentID == equipmentid).ToList();

                                    for (int sampleCtr = 0; sampleCtr <= testSampleEntity.Count - 1; sampleCtr++)
                                    {
                                        List<DataAccess.Models.SampleTransportCondition> sampleTransConditionEntity = this._repository.GetTestSampleConditionBySampleId(testSampleEntity[sampleCtr].SampleId).ToList();

                                        for (int condCtr = 0; condCtr <= sampleTransConditionEntity.Count - 1; condCtr++)
                                        {
                                            this._repository.DeleteTestSampleCondition(sampleTransConditionEntity[condCtr]);
                                        }

                                        this._repository.DeleteTestSample(testSampleEntity[sampleCtr]);
                                    }

                                }

                                if (sampleEquipmentIsModified)
                                {

                                    string applicationid = application.SampleApplicationId;
                                    int equipmentid = equipment.EquipmentId;
                                    List<DataAccess.Models.TestSample> testSampleEntity = testEntity.TestSamples.Where(ts => ts.TestID == testId && ts.SampleType == sampleTypeId && ts.SampleClassRule == applicationid && ts.EquipmentID == equipmentid).ToList();

                                    for (int sampleCtr = 0; sampleCtr <= testSampleEntity.Count - 1; sampleCtr++)
                                    {

                                        testSampleEntity[sampleCtr].SmaplesRequired = equipment.NumberofSamples;
                                        testSampleEntity[sampleCtr].MinimumQuantity = equipment.MinQty;
                                        testSampleEntity[sampleCtr].IdealQuantity = equipment.IdealQty;

                                        if (equipment.condition != null) {

                                            foreach (var condition in equipment.condition)
                                            {

                                                Boolean sampleConditionIsDeleted = condition.IsDeleted;
                                                Boolean sampleConditionIsAdded = condition.IsAdded;
                                                Boolean sampleConditionIsModified = condition.IsModified;

                                                if (sampleConditionIsAdded)
                                                {

                                                    DataAccess.Models.SampleTransportCondition testSampleConditionEntity = new SampleTransportCondition();
                                                    testSampleConditionEntity.SampleId = testSampleEntity[sampleCtr].SampleId;
                                                    testSampleConditionEntity.StandardCondition = condition.StandardConditionId;
                                                    testSampleConditionEntity.SpecialCondition = condition.SpecialCondition;
                                                    this._repository.AddTestSampleCondition(testSampleConditionEntity);
                                                }

                                                if (sampleConditionIsDeleted)
                                                {

                                                    List<DataAccess.Models.SampleTransportCondition> testSampleCondition = this._repository.GetTestSampleConditionBySampleId(testSampleEntity[sampleCtr].SampleId).ToList();

                                                    for (int ctr = 0; ctr <= testSampleCondition.Count - 1; ctr++)
                                                    {

                                                        string _standardConditionId = condition.StandardConditionId;
                                                        if (testSampleCondition[ctr].StandardCondition == _standardConditionId)
                                                        {

                                                            this._repository.DeleteTestSampleCondition(testSampleCondition[ctr]);

                                                        }

                                                    }

                                                }

                                                if (sampleConditionIsModified)
                                                {

                                                    List<DataAccess.Models.SampleTransportCondition> testSampleCondition = this._repository.GetTestSampleConditionBySampleId(testSampleEntity[sampleCtr].SampleId).ToList();

                                                    for (int ctr = 0; ctr <= testSampleCondition.Count - 1; ctr++)
                                                    {

                                                        string _standardConditionId = condition.StandardConditionId;
                                                        if (testSampleCondition[ctr].StandardCondition == _standardConditionId)
                                                        {
                                                            testSampleCondition[ctr].SpecialCondition = condition.SpecialCondition;
                                                            this._repository.UpdateTestSampleCondition(testSampleCondition[ctr]);

                                                        }

                                                    }
                                                }
                                            }
                                        }

                                        this._repository.UpdateTestSample(testSampleEntity[sampleCtr]);
                                        
                                    }
                                
                                }

                            }

                        }

                    }
                }

            }

            #endregion

            //Test Requirement
            #region Test Requirement
            
            foreach (var requirement in testData.TestRequirements)
            {
                Boolean requirementIsDeleted = requirement.IsDeleted;
                Boolean requirementIsAdded = requirement.IsAdded;
                
                if (requirementIsAdded)
                {

                    foreach (var standardrequirement in requirement.StandardRequirement)
                    {

                        DataAccess.Models.TestRequirement testRequirementEntity = new DataAccess.Models.TestRequirement();
                        testRequirementEntity.TestID = id;
                        testRequirementEntity.RequirementType = requirement.RequirementTypeId;
                        testRequirementEntity.StandardRequirement = standardrequirement.StandardRequirementId;
                        testRequirementEntity.RequirementDescription = standardrequirement.RequirementDescription;
                        this._repository.AddTestRequirement(testRequirementEntity);
                    }

                }
                else if (requirementIsDeleted)
                {

                    string _requirementTypeId = requirement.RequirementTypeId;
                    List<DataAccess.Models.TestRequirement> testRequirementEntity = testEntity.TestRequirements.Where(ts => ts.TestID == id && ts.RequirementType == _requirementTypeId).ToList();

                    for (int requirementCtr = 0; requirementCtr <= testRequirementEntity.Count - 1; requirementCtr++)
                    {
                        this._repository.DeleteTestRequirement(testRequirementEntity[requirementCtr]);
                    }
                }
                else {


                    foreach (var standardrequirement in requirement.StandardRequirement)
                    {

                        Boolean standardrequirementIsDeleted = standardrequirement.IsDeleted;
                        Boolean standardrequirementIsAdded = standardrequirement.IsAdded;
                        Boolean standardrequirementIsModified = standardrequirement.IsModified;

                        if (standardrequirementIsAdded) {

                            DataAccess.Models.TestRequirement testRequirementEntity = new DataAccess.Models.TestRequirement();
                            testRequirementEntity.TestID = id;
                            testRequirementEntity.RequirementType = requirement.RequirementTypeId;
                            testRequirementEntity.StandardRequirement = standardrequirement.StandardRequirementId;
                            testRequirementEntity.RequirementDescription = standardrequirement.RequirementDescription;
                            this._repository.AddTestRequirement(testRequirementEntity);

                        }

                        if (standardrequirementIsDeleted) {

                            string requirementtypeid = requirement.RequirementTypeId;
                            string standardrequirementid = standardrequirement.StandardRequirementId;

                            List<DataAccess.Models.TestRequirement> testRequirementEntity = testEntity.TestRequirements.Where(ts => ts.TestID == id && ts.RequirementType == requirementtypeid && ts.StandardRequirement == standardrequirementid).ToList();

                            for (int requirementCtr = 0; requirementCtr <= testRequirementEntity.Count - 1; requirementCtr++)
                            {
                                this._repository.DeleteTestRequirement(testRequirementEntity[requirementCtr]);
                            }
                        }

                        if (standardrequirementIsModified)
                        {

                            string requirementtypeid = requirement.RequirementTypeId;
                            string standardrequirementid = standardrequirement.StandardRequirementId;

                            List<DataAccess.Models.TestRequirement> testRequirementEntity = testEntity.TestRequirements.Where(ts => ts.TestID == id && ts.RequirementType == requirementtypeid && ts.StandardRequirement == standardrequirementid).ToList();

                            for (int requirementCtr = 0; requirementCtr <= testRequirementEntity.Count - 1; requirementCtr++)
                            {
                                testRequirementEntity[requirementCtr].RequirementDescription = standardrequirement.RequirementDescription;
                                this._repository.UpdateTestRequirement(testRequirementEntity[requirementCtr]);
                            }
                        }

                        
                    }

                }

            }

            #endregion

            //Test Steps
            #region Test Steps
            
            foreach (var step in testData.TestSteps)
            {
                Boolean stepIsDeleted = step.IsDeleted;
                Boolean stepIsAdded = step.IsAdded;
                Boolean stepIsModified = step.IsModified;
                int stepId = step.StepId;

                if (stepIsAdded)
                {
                    DataAccess.Models.TestStep testStepEntity = new DataAccess.Models.TestStep();
                    testStepEntity.TestID = id;
                    testStepEntity.CompetencyLevelID = step.CompetencyLevelId;
                    testStepEntity.StepName = step.StepName;
                    testStepEntity.StepOrder = step.StepOrder;
                    testStepEntity.StepDescription = step.Description;
                    testStepEntity.ImageUrl = step.ImageURL;
                    testStepEntity.VideoUrl = step.VideoURL;
                    testStepEntity.CreatedDate = System.DateTime.Now;
                    testStepEntity.IsDeleted = false;
                    testStepEntity.CreatedUserId = testData.UserId;
                    this._repository.AddTestStep(testStepEntity);
                    
                }


                if (stepIsDeleted)
                {

                    DataAccess.Models.TestStep testStepEntity = testEntity.TestSteps.Where(ts => ts.StepID == stepId).FirstOrDefault();
                    if (testStepEntity != null)
                    {
                        testStepEntity.DeletedDate = System.DateTime.Now;
                        testStepEntity.IsDeleted = true;
                        testStepEntity.DeletedUserId = testData.UserId;
                        this._repository.UpdateTestStep(testStepEntity);
                    }

                }

                if (stepIsModified)
                {
                    DataAccess.Models.TestStep testStepEntity = testEntity.TestSteps.Where(ts => ts.StepID == stepId).FirstOrDefault();
                    if (testStepEntity != null)
                    {
                        testStepEntity.CompetencyLevelID = step.CompetencyLevelId;
                        testStepEntity.StepName = step.StepName;
                        testStepEntity.StepOrder = step.StepOrder;
                        testStepEntity.StepDescription = step.Description;
                        testStepEntity.ImageUrl = step.ImageURL;
                        testStepEntity.VideoUrl = step.VideoURL;
                        this._repository.UpdateTestStep(testStepEntity);
                        
                    }

                }


            }

            #endregion

            //Test Tutorial Steps
            #region Test Tutorial Steps
            
            foreach (var tutorialStep in testData.TestTutorialStepDetails)
            {
                Boolean tutorialStepIsDeleted = tutorialStep.IsDeleted;
                Boolean tutorialStepIsAdded = tutorialStep.IsAdded;
                Boolean tutorialStepIsModified = tutorialStep.IsModified;
                int tutorialStepId = tutorialStep.TutorialStepId;

                if (tutorialStepIsAdded)
                {
                    DataAccess.Models.TestTutorialStep testTutorialStepEntity = new DataAccess.Models.TestTutorialStep();
                    testTutorialStepEntity.TestID = id;
                    testTutorialStepEntity.StepOrderID = tutorialStep.StepOrder;
                    testTutorialStepEntity.StepDescription = tutorialStep.Description;
                    testTutorialStepEntity.ImageURL = tutorialStep.ImageURL;
                    testTutorialStepEntity.VideoURL = tutorialStep.VideoURL;
                    testTutorialStepEntity.CreatedDate = System.DateTime.Now;
                    testTutorialStepEntity.DomainID = testData.DomainId;
                    testTutorialStepEntity.IsDeleted = false;
                    testTutorialStepEntity.CreatedUserId = testData.UserId;
                    this._repository.AddTestTutorialStep(testTutorialStepEntity);
                }

                if (tutorialStepIsDeleted)
                {

                    DataAccess.Models.TestTutorialStep testTutorialStepEntity = testEntity.TestTutorialSteps.Where(ts => ts.TutorialStepID == tutorialStepId).FirstOrDefault();
                    if (testTutorialStepEntity != null)
                    {
                        testTutorialStepEntity.DeletedDate = System.DateTime.Now;
                        testTutorialStepEntity.IsDeleted = true;
                        testTutorialStepEntity.DeletedUserId = testData.UserId;
                        this._repository.UpdateTestTutorialStep(testTutorialStepEntity);
                    }

                }

                if (tutorialStepIsModified)
                {
                    DataAccess.Models.TestTutorialStep testTutorialStepEntity = testEntity.TestTutorialSteps.Where(ts => ts.TutorialStepID == tutorialStepId).FirstOrDefault();
                    if (testTutorialStepEntity != null)
                    {
                        testTutorialStepEntity.StepOrderID = tutorialStep.StepOrder;
                        testTutorialStepEntity.StepDescription = tutorialStep.Description;
                        testTutorialStepEntity.ImageURL = tutorialStep.ImageURL;
                        testTutorialStepEntity.VideoURL = tutorialStep.VideoURL;
                        this._repository.UpdateTestTutorialStep(testTutorialStepEntity);

                    }

                }

            }

            #endregion

            //Testsynonym
            #region Test Synonym
            List<DataAccess.Models.TestSynonym> _testsynonym = _repository.GetTestSynonymByTestId(id).ToList();
            for (int synCtr = 0; synCtr <= _testsynonym.Count - 1; synCtr++)
            {
                this._repository.DeleteTestSynonym(_testsynonym[synCtr]);
            }

            //insert primary code and name
            DataAccess.Models.TestSynonym testSynonynmEntity = new DataAccess.Models.TestSynonym();
            testSynonynmEntity.TestID = testEntity.TestID;
            testSynonynmEntity.PrimaryCode = testData.TestDetails[0].TestCode;
            testSynonynmEntity.Code = testData.TestDetails[0].TestCode;
            testSynonynmEntity.AlternateName = testData.TestDetails[0].TestName;
            testSynonynmEntity.CreatedDate = System.DateTime.Now;
            testSynonynmEntity.IsDeleted = false;
            testSynonynmEntity.CreatedUserId = testData.UserId;
            this._repository.InsertTestSynonym(testSynonynmEntity);

            foreach (var synonym in testData.TestSynonym)
            {
                Boolean synonymIsDeleted = synonym.IsDeleted;

                if (!synonymIsDeleted)
                {

                    testSynonynmEntity = new DataAccess.Models.TestSynonym();
                    testSynonynmEntity.TestID = testEntity.TestID;
                    testSynonynmEntity.PrimaryCode = synonym.PrimaryCode;
                    testSynonynmEntity.Code = synonym.Code;
                    testSynonynmEntity.AlternateName = synonym.AltName;
                    testSynonynmEntity.CreatedDate = System.DateTime.Now;
                    testSynonynmEntity.IsDeleted = false;
                    testSynonynmEntity.CreatedUserId = testData.UserId;
                    this._repository.InsertTestSynonym(testSynonynmEntity);

                }
            }

            #endregion

            return 1;
        }

        public int Delete(dynamic testData)
        {
            int id = testData.TestId;
            DataAccess.Models.Test testEntity = _repository.GetById(id);
            
            if (testEntity != null) {

                testEntity.IsDeleted = true;
                testEntity.DeletedDate = System.DateTime.Now;
                testEntity.DeletedUserId = testData.UserId;

                for (int stepsCtr = 0; stepsCtr <= testEntity.TestSteps.Count - 1; stepsCtr++)
                {
                    testEntity.TestSteps.ElementAt(stepsCtr).DeletedDate = System.DateTime.Now;
                    testEntity.TestSteps.ElementAt(stepsCtr).DeletedUserId = testData.UserId;
                    testEntity.TestSteps.ElementAt(stepsCtr).IsDeleted = true;
                }

                for (int tutorialStepsCtr = 0; tutorialStepsCtr <= testEntity.TestTutorialSteps.Count - 1; tutorialStepsCtr++)
                {
                    testEntity.TestTutorialSteps.ElementAt(tutorialStepsCtr).DeletedDate = System.DateTime.Now;
                    testEntity.TestTutorialSteps.ElementAt(tutorialStepsCtr).DeletedUserId = testData.UserId;
                    testEntity.TestTutorialSteps.ElementAt(tutorialStepsCtr).IsDeleted = true;
                }

                List<DataAccess.Models.TestSynonym> l_testSynonym = _repository.GetTestSynonymByTestCode(testEntity.TestCode).ToList();
                for (int synonymCtr = 0; synonymCtr <= l_testSynonym.Count - 1; synonymCtr++)
                {
                    l_testSynonym.ElementAt(synonymCtr).DeletedDate = System.DateTime.Now;
                    l_testSynonym.ElementAt(synonymCtr).DeletedUserId = testData.UserId;
                    l_testSynonym.ElementAt(synonymCtr).IsDeleted = true;
                    this._repository.UpdateTestSynonym(l_testSynonym.ElementAt(synonymCtr));
                }


            }
           
            this._repository.Update(testEntity);

            return 1;
        }
    }
}
