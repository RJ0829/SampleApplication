var gPageMode = "add";
var AlternateTestNameGridKeepEditing = false;
var editModeTestId = 0;

/* Start details id */

var equipmentList = [];

var selectedRowId_TestId = 0;

var selectedRowId_SampleDetails = 0;
var selectedRowId_RequirementDetails = 0;
var selectedRowId_StepDetails = 0;
var selectedRowId_TutorialStepDetails = 0;

/* End details id */

/* Start data container */

/* Main */

var TestDetailsList = [];
var TestCommonNameList = [];

var TestSampleDetailsList = [];

var TestRequirementDetails = [];

var TestStepDetails = [];

var TestTutorialStepDetails = [];

var testNameList = [];

/* end data container */

function Initialize() {

    RequestForEdit();

    $.ig.loader({
        scriptPath: hostUrl + "Scripts/Infragistics",
        cssPath: hostUrl + "Content/Infragistics",
        resources: "igGrid.*,igHierarchicalGrid.*,igTree,igCombo",
        theme: themeName,
    });

    $.ig.loader(function () {

        SetToolbar();
        $(":button").button();

        //$("#radio").buttonset();

        $("#buttonGroup").height($("#buttonGroup :button").height() + 26);

        PopulateTestNameList();

        InitializeTestListVariables();

        GetData("", "", "false");
        
    });

};

function InitializeTestListVariables() {

    TestDetailsList = [];
    TestCommonNameList = [];
    TestSampleDetailsList = [];
    TestSampleDetailsConditionList = [];
    TestSampleDetailsConditionList_Temp = [];
    TestRequirementDetails = [];
    TestStepDetails = [];
    TestTutorialStepDetails = [];

};

/* Start get data */

function GetData(pSearchValue, pSearchType, rebind) {

    var _url = 'api/test/listsummary?pSearchValue=' + pSearchValue + '&pSearchType=' + pSearchType;

    Common_GetData(_url, function (items, err) {

        if (err == '') {
            if (rebind == "true") {
                $("#testgrid").igGrid("option", "dataSource", items);
            }
            else {
                BindGrid(items);
            }
        }
        else {
            alert(err);
        }


        ResponseForEdit('');
    });

};

function GetDataById(id, mode) {

    InitializeTestListVariables();

    var _url = 'api/test/' + id;

    Common_GetData(_url, function (items, err) {

        if (err == '') {

            var _testDetails = items.TestDetails;
            var _testSynonyms = items.TestSynonym;
            var _testSampleDetails = items.TestSampleDetails;
            var _testSampleDetailConditions = items.TestSampleDetailConditions;
            var _testRequirements = items.TestRequirements;
            var _testSteps = items.TestSteps;
            var _testStepsTutorial = items.TestTutorialStepDetails;

            //details
            TestDetailsList.push({ TestId: _testDetails.TestID, TestCategoryId: _testDetails.TestCategoryID, TestCategory: _testDetails.TestCategory, TestCode: _testDetails.TestCode, TestName: _testDetails.TestName, Description: _testDetails.Description, GuideVersion: _testDetails.GuideVersion, EstimatedDuration: _testDetails.EstimatedDuration, LaboratoryId: _testDetails.LaboratoryId, Laboratory: _testDetails.Laboratory, ReferenceLaboratory: _testDetails.ReferenceLaboratory });

            //synonyms
            TestCommonNameList = _testSynonyms;
            //$.each(_testSynonyms, function (i, val) {
            //    TestCommonNameList.push(_testSynonyms[i].AlternateName);
            //});

            //samples       
            TestSampleDetailsList = _testSampleDetails;
            //$.each(_testSampleDetails, function (i, val) {
            //    TestSampleDetailsList.push({ TestId: _testSampleDetails[i].TestID, SampleId: _testSampleDetails[i].SampleId, EquipmentId: _testSampleDetails[i].EquipmentID, Equipment: _testSampleDetails[i].Equipment, SampleTypeId: _testSampleDetails[i].SampleTypeId, SampleType: _testSampleDetails[i].SampleType, AnalysisSampleTypeId: _testSampleDetails[i].AnalysisSampleTypeId, AnalysisSampleType: _testSampleDetails[i].AnalysisSampleType, SampleApplicationId: _testSampleDetails[i].SampleClassRuleId, SampleApplication: _testSampleDetails[i].SampleClassRule, NumberofSamples: _testSampleDetails[i].SmaplesRequired, UnitId: _testSampleDetails[i].UnitId, Unit: _testSampleDetails[i].Unit, MinQty: _testSampleDetails[i].MinimumQuantity, IdealQty: _testSampleDetails[i].IdealQuantity, MicroQty: _testSampleDetails[i].MicroQuantity, IsDeleted: false, IsAdded: false, IsModified: false });
            //});

            //sample conditions       
            //$.each(_testSampleDetailConditions, function (i, val) {
            //    TestSampleDetailsConditionList.push({ SampleId: _testSampleDetailConditions[i].SampleId, ConditionId: _testSampleDetailConditions[i].ConditionId, StandardConditionId: _testSampleDetailConditions[i].StandardConditionId, StandardCondition: _testSampleDetailConditions[i].StandardCondition, OtherCondition: _testSampleDetailConditions[i].SpecialCondition, IsDeleted: false, IsAdded: false, IsModified: false });
            //});

            //requirements
            TestRequirementDetails = _testRequirements;
            //$.each(_testRequirements, function (i, val) {
            //    TestRequirementDetails.push({ TestId: _testRequirements[i].TestID, RequirementId: _testRequirements[i].RequirementId, RequirementTypeId: _testRequirements[i].RequirementTypeId, RequirementType: _testRequirements[i].RequirementType, StandardRequirementId: _testRequirements[i].StandardRequirementId, StandardRequirement: _testRequirements[i].StandardRequirement, RequirementDescription: _testRequirements[i].RequirementDescription, IsDeleted: false, IsAdded: false, IsModified: false });
            //});

            //steps
            $.each(_testSteps, function (i, val) {
                TestStepDetails.push({ TestId: _testSteps[i].TestID, StepId: _testSteps[i].StepID, StepOrder: _testSteps[i].StepOrder, StepName: _testSteps[i].StepName, Description: _testSteps[i].StepDescription, CompetencyLevelId: _testSteps[i].CompetencyLevelID, CompetencyLevel: _testSteps[i].CompetencyLevel, ImageURL: _testSteps[i].ImageUrl, VideoURL: _testSteps[i].VideoUrl, IsDeleted: false, IsAdded: false, IsModified: false });
            });

            //tutorial steps
            $.each(_testStepsTutorial, function (i, val) {
                TestTutorialStepDetails.push({ TestId: _testStepsTutorial[i].TestID, TutorialStepId: _testStepsTutorial[i].TutorialStepID, StepOrder: _testStepsTutorial[i].StepOrderID, Description: _testStepsTutorial[i].StepDescription, ImageURL: _testStepsTutorial[i].ImageURL, VideoURL: _testStepsTutorial[i].VideoURL, IsDeleted: false, IsAdded: false, IsModified: false });
            });

            if (TestDetailsList.length > 0) {

                if (mode.toLowerCase() == 'view') {
                    OpenViewWindows();
                }

                if (mode.toLowerCase() == 'edit') {
                    OpenEditWindows();
                }
            }
            else {
                alert('Error getting data.');
            }


        }
        else {

            alert(err);
        }

        selectedRowId_TestId = 0;
    });

};

function PopulateTestNameList() {

    var _url = 'api/test/testnames';

    Common_GetData(_url, function (items, err) {
        if (err == '') {
            testNameList = items;
            $("#txt_TestSearchList").autocomplete({
                source: testNameList,
                close: function (event, ui) {
                    GetData($("#txt_TestSearchList").val(), "", "true");
                }
            });
        }
        else {
            alert(err);
        }
    });


};

function CheckIfCodeandAltNameExists(code, testid, callback) {

    var _url = 'api/test/CheckTestExist?pcode=' + code + '&ptestid=' + testid;

    Common_GetData(_url, function (items, err) {
        if (err == '') {
            callback(items, '');
        }
        else {
            callback('', err);
        }
    });

};

/* End get data */

/* Start bind data to grid */

function BindGrid(src) {

    $("#testgrid").igGrid({
        autoGenerateColumns: false,
        primaryKey: "TestId",
        columns: [
            { headerText: "", key: "TestId", dataType: "number", hidden: true },
            { headerText: "Common Test Name", key: "TestCommonName", dataType: "string" },
            { headerText: "Test Code", key: "TestCode", dataType: "string" },
            { headerText: "Primary Test Name", key: "TestName", dataType: "string" },
            { headerText: "Test Category", key: "TestCategory", dataType: "string" },
        ],
        dataSource: src,
        dataSourceType: 'json',
        primaryKey: "TestId",
        height: "390px",
        width: "100%",
        features: [
           {
               name: "Selection"
           },
            {
                name: "Paging",
                type: "local",
                showPageSizeDropDown: false,
                pageSize: 10,
            }
        ],
        cellClick: function (evt, ui) {
            selectedRowId_TestId = ui.rowKey;
        },
    });


};

function BindAlternateTestNameGrid(grid, src) {

    $(grid).igGrid({
        dataSource: src,
        dataSourceType: 'json',
        responseDataKey: "data",
        autoGenerateColumns: false,
        autoGenerateLayouts: false,
        primaryKey: "id",
        autoCommit: true,
        columns: [
            { headerText: "", key: "id", dataType: "string", width: "250px", hidden: true },
            { headerText: "Code", key: "Code", dataType: "string", width: "250px" },
            { headerText: "Alternate Name", key: "AltName", dataType: "string", width: "500px" },
        ],
        features: [
            {
                name: "Updating",
                enableDataDirtyException: false,
                enableAddRow: true,
                enableDeleteRow: true,
                editMode: "row",
                rowAdding: function (evt, ui) { },
                rowAdded: function (evt, ui) { },
                editRowEnding: function (evt, ui) {
                    
                    if (ui.rowAdding) {

                        ui.keepEditing = true;

                        var strCode = ui.values["Code"];
                        var AltName = ui.values["AltName"];

                        CheckIfCodeandAltNameExists(strCode, "0", function (items, err) {

                            if (err == '') {

                                var testId = items.TestId;
                                var testCode = items.TestCode;
                                var isPrimary = items.IsPrimary;
                                var testName = items.TestName;

                                if (testCode != null) {

                                    if (isPrimary) {
                                        alert('Code : ' + strCode + ' is used as primary code by ' + testName + '(' + testCode + ')');
                                    }
                                    else {
                                        alert('Code : ' + strCode + ' is used as alternate code by ' + testName + '(' + testCode + ')');
                                    }

                                }
                                else {

                                    var codeExist = false;

                                    $.each(TestCommonNameList, function (i, val) {
                                        if (TestCommonNameList[i].Code == strCode) {
                                            codeExist = true;
                                        }
                                    });

                                    if (!codeExist) {

                                        var pCode = "";
                                        if (gPageMode.toLowerCase() == "add") {
                                            if ($("#txt_NewTestCode").val() != "") {
                                                pCode = $("#txt_NewTestCode").val();
                                            }
                                        }

                                        if (gPageMode.toLowerCase() == "edit") {
                                            if ($("#txt_EditTestCode").val() != "") {
                                                pCode = $("#txt_EditTestCode").val();
                                            }
                                        }

                                        var pCodeExist = false;
                                        if (pCode != "") {
                                            if (pCode == strCode) {
                                                pCodeExist = true;
                                            }
                                        }

                                        if (!pCodeExist) {

                                            TestCommonNameList.push({ PrimaryCode: "", Code: strCode, AltName: AltName, IsDeleted: false, IsAdded: true, IsModified: false });

                                            if (gPageMode.toLowerCase() == "add") {
                                                $("#newTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                                            }

                                            if (gPageMode.toLowerCase() == "edit") {
                                                $("#editTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                                            }
                                        }
                                        else {
                                            alert('Code is set as Primary Code.');
                                        }
                                        
                                    }
                                    else
                                    {
                                        
                                        alert('Code already exist on this list.');
                                        
                                    }


                                }
                            }

                        });
                        
                    }
                    else if (ui.update) {

                        ui.keepEditing = true;

                        var strCode = ui.values["Code"];
                        var AltName = ui.values["AltName"];
                        var strOldCode = ui.oldValues["Code"];

                        CheckIfCodeandAltNameExists(strCode, editModeTestId, function (items, err) {

                            if (err == '') {

                                var testId = items.TestId;
                                var testCode = items.TestCode;
                                var isPrimary = items.IsPrimary;
                                var testName = items.TestName;

                                if (testCode != null) {

                                    if (isPrimary) {
                                        alert('Code : ' + strCode + ' is used as primary code by ' + testName + '(' + testCode + ')');
                                    }
                                    else {
                                        alert('Code : ' + strCode + ' is used as alternate code by ' + testName + '(' + testCode + ')');
                                    }

                                }
                                else {

                                    var codeExist = false;

                                    $.each(TestCommonNameList, function (i, val) {
                                        if (strOldCode != strCode) {
                                            if (TestCommonNameList[i].Code == strCode) {
                                                codeExist = true;
                                            }
                                        }
                                    });

                                    if (!codeExist) {

                                        var pCode = "";
                                        if (gPageMode.toLowerCase() == "add") {
                                            if ($("#txt_NewTestCode").val() != "") {
                                                pCode = $("#txt_NewTestCode").val();
                                            }
                                        }

                                        if (gPageMode.toLowerCase() == "edit") {
                                            if ($("#txt_EditTestCode").val() != "") {
                                                pCode = $("#txt_EditTestCode").val();
                                            }
                                        }

                                        var pCodeExist = false;
                                        if (pCode != "") {
                                            if (pCode == strCode) {
                                                pCodeExist = true;
                                            }
                                        }

                                        if (!pCodeExist) {

                                            $.each(TestCommonNameList, function (i, val) {
                                                if (TestCommonNameList[i].Code == strOldCode) {
                                                    TestCommonNameList[i].Code = strCode;
                                                    TestCommonNameList[i].AltName = AltName;
                                                    if (!TestCommonNameList[i].IsAdded) {
                                                        TestCommonNameList[i].IsModified = true;
                                                    }
                                                }
                                            });

                                            if (gPageMode.toLowerCase() == "add") {
                                                $("#newTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                                            }

                                            if (gPageMode.toLowerCase() == "edit") {
                                                $("#editTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                                            }
                                        }
                                        else {
                                            alert('Code is set as Primary Code.');
                                        }

                                    }
                                    else {

                                        alert('Code already exist on this list.');

                                    }


                                }
                            }

                        });

                    }

                },
                editRowEnded: function (evt, ui) { },
                rowDeleting: function (evt, ui) {

                    var strCode = ui.element.find('td:first').html();

                    if (window.confirm('Are you sure you want to delete Alternate Code : ' + strCode + "?")) {

                        $.each(TestCommonNameList, function (i, val) {
                            if (TestCommonNameList[i].Code == strCode) {
                                TestCommonNameList[i].IsDeleted = true;
                                TestCommonNameList[i].IsAdded = false;
                                TestCommonNameList[i].IsModified = false;
                            }
                        });

                        if (gPageMode.toLowerCase() == "add") {
                            $("#newTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                        }

                        if (gPageMode.toLowerCase() == "edit") {
                            $("#editTestAltNameGrid").igGrid("option", "dataSource", FormatAlternateNameData(TestCommonNameList));
                        }
                    }
                                        
                }
                
            },
            {
                name: "Paging",
                type: "local",
                showPageSizeDropDown: false,
                pageSize: 5
            }
        ],
        height: "270px",
        width: "750px"


    });
};

function BindNewTestStepDetailsGrid(grid, src) {

    var imageTemplate = "<img style='height:120px;width:120px;' alt=\"${ImageURL}\" src=\"" + uploadedImageUrl + "${ImageURL}\" ></img>";
    var videoTemplate = "<video style='height:120px;width:120px;' src=\"" + uploadedVideoUrl + "${VideoURL}\" ></video>";

    $(grid).igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: src,
        dataSourceType: 'json',
        responseDataKey: "data",
        autoGenerateColumns: false,
        autoGenerateLayouts: false,
        primaryKey: "StepId",
        autoCommit: true,
        columns: [
            { headerText: '', key: "StepId", dataType: "number", hidden: true },
            { headerText: "Step Order", key: "StepOrder", dataType: "string", width: "250px" },
            { headerText: "Step Name", key: "StepName", dataType: "string", width: "250px" },
            { headerText: "Description", key: "Description", dataType: "string", width: "300px" },
            { headerText: 'Competency Level', key: "CompetencyLevel", dataType: "string", width: "160px" },
        ],
        height: "390px",
        width: "1000px",
        columnLayouts: [
                           {
                               key: "otherdata",
                               responseDataKey: "data",
                               autoGenerateColumns: false,
                               generateCompactJSONResponse: false,
                               primaryKey: "StepId",
                               foreignKey: "StepId",
                               renderCheckboxes: true,
                               columns: [
                                   { headerText: '', key: "StepId", dataType: "number", hidden: true },
                                   { headerText: 'Image', key: "ImageURL", width: "140px", template: imageTemplate },
                                   { headerText: 'Video', key: "VideoURL", width: "140px", template: videoTemplate }
                               ],
                               headerCellRendered: function (evt, ui) {
                                   $(ui.th).css("text-align", "center");
                               }
                           }
        ],
        cellClick: function (evt, ui) {
            selectedRowId_StepDetails = ui.rowKey;;
        },
        features: [
                   {
                       name: "Selection"
                   },
                   {
                       name: "Paging",
                       type: "local",
                       showPageSizeDropDown: false,
                       pageSize: 10
                   }
        ]

    });
};

function BindNewTestTutorialStepDetailsGrid(grid, src) {

    var imageTemplate = "<img style='height:120px;width:120px;' alt=\"${ImageURL}\" src=\"" + uploadedImageUrl + "${ImageURL}\" ></img>";
    var videoTemplate = "<video style='height:120px;width:120px;' src=\"" + uploadedVideoUrl + "${VideoURL}\" ></video>";

    $(grid).igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: src,
        dataSourceType: 'json',
        responseDataKey: "data",
        autoGenerateColumns: false,
        autoGenerateLayouts: false,
        primaryKey: "TutorialStepId",
        autoCommit: true,
        columns: [
            { headerText: '', key: "TutorialStepId", dataType: "number", hidden: true },
            { headerText: "Step Order", key: "StepOrder", dataType: "string", width: "250px" },
            { headerText: "Step Description", key: "Description", dataType: "string", width: "250px" }
        ],
        height: "390px",
        width: "1000px",
        columnLayouts: [
                           {
                               //  Define looks and behavior for the second level in the hierarchy
                               key: "otherdata",
                               responseDataKey: "data",
                               autoGenerateColumns: false,
                               generateCompactJSONResponse: false,
                               primaryKey: "TutorialStepId",
                               foreignKey: "TutorialStepId",
                               renderCheckboxes: true,
                               columns: [
                                   { headerText: '', key: "TutorialStepId", dataType: "number", hidden: true },
                                   { headerText: 'Image', key: "ImageURL", width: "140px", height: "140px", template: imageTemplate },
                                   { headerText: 'Video', key: "VideoURL", width: "140px", height: "140px", template: videoTemplate }
                               ],
                               headerCellRendered: function (evt, ui) {
                                   $(ui.th).css("text-align", "center");
                               }
                           }
        ],
        cellClick: function (evt, ui) {
            selectedRowId_TutorialStepDetails = ui.rowKey;;
        },
        features: [
                    {
                        name: "Selection"
                    },
                   {
                       name: "Paging",
                       type: "local",
                       showPageSizeDropDown: false,
                       pageSize: 10
                   }
        ]

    });
};

/* End bind data to grid */

/* Start format data for grid display */

function FormatAlternateNameData(data) {

    var returnData = {
        "data": [{
             "id" : 0,
            "Code": "",
            "AltName": ""
        }]
    }

    var tempData = [];
    
    $.each(data, function (i, val) {
        if (!data[i].IsDeleted) {
            tempData.push({ id: i, Code: data[i].Code, AltName: data[i].AltName });
        }
    });

    if (tempData.length > 0) {

        returnData = { data: tempData };

    }

    return returnData;

};

function FormatTestSampleDetailsGridData(samplesdetailsdata, conditiondata) {

    var returnData = {
        "data": [{
            "TestId": 0,
            "SampleId": 0,
            "Equipment": null,
            "SampleType": null,
            "AnalysisSampleType": null,
            "SampleApplication": null,
            "NumberofSamples": null,
            "otherdata": {
                "data": [{
                    "SampleId": 0,
                    "Unit": null,
                    "MinQty": null,
                    "IdealQty": null,
                    "MicroQty": null,
                    "Conditions": {
                        "data": [
                                   {
                                       "SampleId": 0,
                                       "ConditionId": 0,
                                       "StandardConditionId": null,
                                       "StandardCondition": null,
                                       "OtherCondition": null
                                   },
                                   {
                                       "SampleId": 0,
                                       "ConditionId": 0,
                                       "StandardConditionId": null,
                                       "StandardCondition": null,
                                       "OtherCondition": null
                                   }
                        ]
                    }
                }]
            }
        }]
    };

    if (samplesdetailsdata.length > 0) {

        var cSampleDetailsList = [];
        var cSampleDetailsConditionList = [];
        var data = [];
        var otherdata = [];

        $.each(samplesdetailsdata, function (index) {

            if (!samplesdetailsdata[index].IsDeleted) {

                //get conditions per sample id
                if (conditiondata.length > 0) {

                    $.each(conditiondata, function (index_condition) {

                        if (conditiondata[index_condition].SampleId == samplesdetailsdata[index].SampleId) {
                            if (!conditiondata[index_condition].IsDeleted) {
                                cSampleDetailsConditionList.push({ SampleId: conditiondata[index_condition].SampleId, ConditionId: conditiondata[index_condition].ConditionId, StandardConditionId: conditiondata[index_condition].StandardConditionId, StandardCondition: conditiondata[index_condition].StandardCondition, OtherCondition: conditiondata[index_condition].OtherCondition });
                            }
                        }

                    });

                    if (cSampleDetailsConditionList.length == 0) {

                        cSampleDetailsConditionList.push({ SampleId: 0, ConditionId: 0, StandardConditionId: null, StandardCondition: null, OtherCondition: null });

                    }

                }
                else {

                    cSampleDetailsConditionList.push({ SampleId: 0, ConditionId: 0, StandardConditionId: null, StandardCondition: null, OtherCondition: null });
                }
                //

                data.push({ SampleId: samplesdetailsdata[index].SampleId, Unit: samplesdetailsdata[index].Unit, MinQty: samplesdetailsdata[index].MinQty, IdealQty: samplesdetailsdata[index].IdealQty, MicroQty: samplesdetailsdata[index].MicroQty, Conditions: { data: cSampleDetailsConditionList } });
                cSampleDetailsList.push({ TestId: samplesdetailsdata[index].TestId, SampleId: samplesdetailsdata[index].SampleId, Equipment: samplesdetailsdata[index].Equipment, SampleType: samplesdetailsdata[index].SampleType, AnalysisSampleType: samplesdetailsdata[index].AnalysisSampleType, SampleApplication: samplesdetailsdata[index].SampleApplication, NumberofSamples: samplesdetailsdata[index].NumberofSamples, otherdata: { data: data } });
            }

            cSampleDetailsConditionList = [];
            data = [];
            otherdata = [];

        });

        if (cSampleDetailsList.length > 0) {

            returnData = { data: cSampleDetailsList };

        }

    }

    return returnData;

};

function FormatTestSampleDetailsConditionGridData(conditiondata) {

    var returnData = {
        "data": [{
            "ConditionId": 0,
            "SampleId": 0,
            "StandardConditionId": null,
            "StandardCondition": null,
            "OtherCondition": null,
        }]
    };

    var cSampleDetailsConditionList = [];

    if (conditiondata.length > 0) {


        $.each(conditiondata, function (index) {

            if (!conditiondata[index].IsDeleted) {

                cSampleDetailsConditionList.push({ SampleId: conditiondata[index].SampleId, ConditionId: conditiondata[index].ConditionId, StandardConditionId: conditiondata[index].StandardConditionId, StandardCondition: conditiondata[index].StandardCondition, OtherCondition: conditiondata[index].OtherCondition });

            }

        });

        if (cSampleDetailsConditionList.length > 0) {

            returnData = { data: cSampleDetailsConditionList };

        }

    }

    return returnData;

};

function FormatTestRequirementsDetailsGridData(requirementDetailsData) {

    var cRequirementDetailsList = [];

    var returnData = {
        "data": [{
            "RequirementTypeId": null,
            "RequirementType": null,
            "otherdata": {
                "data": [{
                    "RequirementId": 0,
                    "StandardRequirementId": null,
                    "StandardRequirement": null,
                    "RequirementDescription": null
                }]
            }
        }]
    }

    if (requirementDetailsData.length > 0) {

        var uniqueRequirementType = [];
        var data = [];

        $.each(requirementDetailsData, function (i, item) {
            if ($.inArray(item.RequirementTypeId, uniqueRequirementType) == -1) {
                uniqueRequirementType.push(item.RequirementTypeId);
            }
        });

        $.each(uniqueRequirementType, function (i, item) {

            var filteredRequirementPerRequirementType = jQuery.grep(requirementDetailsData, function (element, index) {
                return (element.RequirementTypeId == uniqueRequirementType[i]);
            });

            if (filteredRequirementPerRequirementType.length > 0) {

                $.each(filteredRequirementPerRequirementType, function (ctr, innerItem) {
                    if (!filteredRequirementPerRequirementType[ctr].IsDeleted) {
                        data.push({ RequirementTypeId: filteredRequirementPerRequirementType[ctr].RequirementTypeId, RequirementId: filteredRequirementPerRequirementType[ctr].RequirementId, StandardRequirementId: filteredRequirementPerRequirementType[ctr].StandardRequirementId, StandardRequirement: filteredRequirementPerRequirementType[ctr].StandardRequirement, RequirementDescription: filteredRequirementPerRequirementType[ctr].RequirementDescription });
                    }
                });

                if (data.length > 0) {

                    cRequirementDetailsList.push({ RequirementTypeId: filteredRequirementPerRequirementType[0].RequirementTypeId, RequirementType: filteredRequirementPerRequirementType[0].RequirementType, otherdata: { data: data } });
                }

            }

            data = [];
            otherdata = [];

        });

        if (cRequirementDetailsList.length > 0) {

            returnData = { data: cRequirementDetailsList };

        }

    }

    return returnData;

};

function FormatTestStepDetailsGridData(stepDetailsData) {

    var cStepDetailsList = [];

    var returnData = {
        "data": [{
            "TestId": 0,
            "StepId": 0,
            "StepOrder": "",
            "StepName": null,
            "Description": null,
            "CompetencyLevelId": 0,
            "CompetencyLevel": null,
            "otherdata": {
                "data": [{
                    "StepId": 0,
                    "ImageURL": null,
                    "VideoURL": null
                }]
            }
        }]
    }

    if (stepDetailsData.length > 0) {

        var data = [];
        var otherdata = [];

        $.each(stepDetailsData, function (index) {

            if (!stepDetailsData[index].IsDeleted) {

                var imageURL = "";
                var videoURL = "";

                if (stepDetailsData[index].ImageURL != "") {
                    imageURL = stepDetailsData[index].ImageURL;
                }

                if (stepDetailsData[index].VideoURL != "") {
                    videoURL = stepDetailsData[index].VideoURL;
                }

                data.push({ StepId: stepDetailsData[index].StepId, ImageURL: imageURL, VideoURL: videoURL });
                cStepDetailsList.push({ TestId: stepDetailsData[index].TestId, StepId: stepDetailsData[index].StepId, StepOrder: stepDetailsData[index].StepOrder, StepName: stepDetailsData[index].StepName, Description: stepDetailsData[index].Description, CompetencyLevelId: stepDetailsData[index].CompetencyLevelId, CompetencyLevel: stepDetailsData[index].CompetencyLevel, otherdata: { data: data } });

            }

            data = [];
            otherdata = [];
        });

        if (cStepDetailsList.length > 0) {

            returnData = { data: cStepDetailsList };

        }

    }

    return returnData;

};

function FormatTestTutorialStepDetailsGridData(tutorialStepDetailsData) {

    var cTutorialStepDetailsList = [];

    var returnData = {
        "data": [{
            "TestId": 0,
            "TutorialStepId": 0,
            "StepOrder": "",
            "Description": null,
            "otherdata": {
                "data": [{
                    "TutorialStepId": 0,
                    "ImageURL": null,
                    "VideoURL": null
                }]
            }
        }]
    }

    if (tutorialStepDetailsData.length > 0) {

        var data = [];
        var otherdata = [];

        $.each(tutorialStepDetailsData, function (index) {

            if (!tutorialStepDetailsData[index].IsDeleted) {

                data.push({ TutorialStepId: tutorialStepDetailsData[index].TutorialStepId, ImageURL: tutorialStepDetailsData[index].ImageURL, VideoURL: tutorialStepDetailsData[index].VideoURL });
                cTutorialStepDetailsList.push({ TestId: tutorialStepDetailsData[index].TestId, TutorialStepId: tutorialStepDetailsData[index].TutorialStepId, StepOrder: tutorialStepDetailsData[index].StepOrder, Description: tutorialStepDetailsData[index].Description, otherdata: { data: data } });

            }

            data = [];
            otherdata = [];
        });

        if (cTutorialStepDetailsList.length > 0) {

            returnData = { data: cTutorialStepDetailsList };

        }

    }

    return returnData;

};

function FormatCategorySampleDetailsConditionCombo(val) {
    var i, category;
    for (i = 0; i < SampleConditionList.length; i++) {
        category = SampleConditionList[i];
        if (category.StandardConditionId === val) {
            val = category.StandardCondition;
        }
    }

    return val;
}

/* End format data for grid display */

/* Start Open Modal Windows */

function RequestForEdit() {
    $('#loading_test').html('<img src="/Images/loading.gif"/>');
}

function ResponseForEdit(data) {
    $('#loading_test').html(data);
}

function OpenViewWindows() {

    RequestForEdit();

    var dialog = ($('#viewTestDialog').length > 0) ? $('#viewTestDialog') : $('<div id="viewTestDialog" style="display:hidden"></div>').appendTo('body');

    $.ajax({
        url: hostUrl + '/Test/ViewTestData', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: true,
                width: 1250, height: 600,
                resizable: false,
                show: "fade", hide: "fade",
                title: TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ')',
                close: function () {
                    DestroySampleDetailsandRequirementTypeObject_Summary();
                    $(this).dialog('destroy').remove();
                }
            });

            $(":button").button();
            $(".tabs").tabs();

            /* Start Display Data */
            $("#viewTestId").val(TestDetailsList[0].TestId);

            //Display Alternate Name
            var strCommonName = "";
            $.each(TestCommonNameList, function (i, val) {
                if (strCommonName != "") {
                    strCommonName = strCommonName + "; " + TestCommonNameList[i].AltName + " (" + TestCommonNameList[i].Code + ")";

                }
                else {
                    strCommonName = TestCommonNameList[i].AltName + " (" + TestCommonNameList[i].Code + ")";
                }
            });

            var str_tr_alternatename = "<tr><td style='width:20%;' class='admin_page_label testViewDataLabelContainer'>Alternate Name</td><td colspan='3' class='testViewDataValueContainer'>&nbsp;" + strCommonName + "</td></tr>";

            $("#tbl_viewData").append(str_tr_alternatename);

            //Display Code and Laboratory
            var str_tr_testcode_lab = "<tr><td style='width:20%;' class='admin_page_label testViewDataLabelContainer'>Test Code</td><td style='width:30%;' class='testViewDataValueContainer'>&nbsp;" + TestDetailsList[0].TestCode + "</td><td style='width:20%;' class='admin_page_label testViewDataLabelContainer'>Laboratory</td><td style='width:30%;' class='testViewDataValueContainer'>" + TestDetailsList[0].Laboratory + "</td></tr></table></td></tr>";

            $("#tbl_viewData").append(str_tr_testcode_lab);

            //Display Test Category
            var str_tr_testcategory = "<tr><td style='width:20%;' class='admin_page_label testViewDataLabelContainer'>Test Category</td><td colspan='3' class='testViewDataValueContainer'>&nbsp;" + TestDetailsList[0].TestCategory + "</td></tr>";

            $("#tbl_viewData").append(str_tr_testcategory);

            //Display Specimen

            /* End Display Data */

            //$("#viewTestCode").text(TestDetailsList[0].TestCode);
            //$("#viewTestName").text(TestDetailsList[0].TestName);
            //$("#viewTestCategory").text(TestDetailsList[0].TestCategory);
            
            //$("#viewCommonTestName").text(strCommonName);

            //$("#viewDescription").text(TestDetailsList[0].Description);
            //$("#viewEstimatedCollectionTime").text(TestDetailsList[0].EstimatedDuration);
            //$("#viewLaboratory").text(TestDetailsList[0].Laboratory);
            //$("#viewRefLaboratory").text(TestDetailsList[0].ReferenceLaboratory);
            //$("#viewNumberSamples").text(TestSampleDetailsList.length);
            //$("#viewGuideVersion").text(TestDetailsList[0].GuideVersion);

            //SetUpSampleDetailsandRequirementType_Summary();
            //SetUpSampleDetailsandRequirementTypeSectionPosition_Summary();

            //DestroyGrids($("#viewTestStepsGrid"), "ighierarchicalgrid");
            //DestroyGrids($("#viewTestTutorialStepsGrid"), "ighierarchicalgrid");

            //BindNewTestStepDetailsGrid("#viewTestStepsGrid", FormatTestStepDetailsGridData(TestStepDetails));
            //BindNewTestTutorialStepDetailsGrid("#viewTestTutorialStepsGrid", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));

            $("#btn_vieweditTest").click(function () {
                $("#viewTestDialog").dialog('close');
                GetDataById($("#viewTestId").val(), 'edit');
            });

            $("#btn_viewcloseTest").click(function () {
                $("#viewTestDialog").dialog('close');
            });

            ResponseForEdit('');

        }
    });
};

function OpenEditWindows() {

    RequestForEdit();

    gPageMode = "edit";

    var dialog = ($('#editTestDialog').length > 0) ? $('#editTestDialog') : $('<div id="editTestDialog" style="display:hidden"></div>').appendTo('body');
    $.ajax({
        url: hostUrl + '/Test/EditTestData', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: false,
                width: 1250, height: 780,
                resizable: false,
                show: "fade", hide: "fade",
                title: 'Edit - ' + TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ')',
                close: function () {
                    editModeTestId = 0;
                    DestroySampleDetailsandRequirementTypeObject();
                    $(this).dialog('destroy').remove();
                }
            });

            $(":button").button();

            $("#txt_EditTestGuideVersion").spinner({ min: 1, max: 100 });
            $("#txt_EditTestEstimatedCollectionTime").spinner({ min: 1, max: 100 });

            $(".tabs").tabs();
            
            $("#txt_EditTestCode").val(TestDetailsList[0].TestCode);
            $("#txt_EditTestPrimaryName").val(TestDetailsList[0].TestName);
            $("#txt_EditTestDescription").val(TestDetailsList[0].Description);
            $("#txt_EditTestEstimatedCollectionTime").val(TestDetailsList[0].EstimatedDuration);
            $("#txt_EditTestRefLabName").val(TestDetailsList[0].ReferenceLaboratory);
            $("#txt_EditTestGuideVersion").val(TestDetailsList[0].GuideVersion);
            
            SetUpSampleDetailsandRequirementType();
            SetUpSampleDetailsandRequirementTypeSectionPosition("edit");

            DestroyGrids($("#editTestAltNameGrid"), "iggrid");
            DestroyGrids($("#editTestStepsGrid"), "ighierarchicalgrid");
            DestroyGrids($("#editTestTutorialStepsGrid"), "ighierarchicalgrid");

            BindAlternateTestNameGrid("#editTestAltNameGrid", FormatAlternateNameData(TestCommonNameList));
            BindNewTestStepDetailsGrid("#editTestStepsGrid", FormatTestStepDetailsGridData(TestStepDetails));
            BindNewTestTutorialStepDetailsGrid("#editTestTutorialStepsGrid", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));

            SetToolbarforTestStepDetails($("#btn_AddNewTestStepDetails_Edit"), $("#btn_EditTestStepDetails_Edit"), $("#btn_DeleteTestStepDetails_Edit"), "edit");
            SetToolbarforTestTutorialStepDetails($("#btn_AddNewTestTutorialStepDetails_Edit"), $("#btn_EditTestTutorialStepDetails_Edit"), $("#btn_DeleteTestTutorialStepDetails_Edit"), "edit");

            Common_PopulateDropDownviaLookUp("Test", "Laboratory", $("#select_EditTestLaboratory"), function (err) {
                if (err == '') {
                    $("#select_EditTestLaboratory").val(TestDetailsList[0].LaboratoryId);
                } else {
                    alert(err);
                }
            });

            Common_PopulateDropDownviaLookUp("Test", "TestCategoryId", $("#select_EditTestCategory"), function (err) {
                if (err == '') {
                    $("#select_EditTestCategory").val(TestDetailsList[0].TestCategoryId);
                } else {
                    alert(err);
                }
            });

            $("#btn_editSubmitTest").click(function () {

                RequestForEdit();

                var vTestCode = $("#txt_EditTestCode").val();
                var vTestPrimaryName = $("#txt_EditTestPrimaryName").val();

                var vTestCategoryId = $("#select_EditTestCategory").val();

                var vTestCategory = ""
                if (vTestCategoryId != "") {
                    vTestCategory = $("#select_EditTestCategory option:selected").text();
                }

                var vLaboratoryId = $("#select_EditTestLaboratory").val();

                var vLaboratory = ""
                if (vLaboratoryId != "") {
                    vLaboratory = $("#select_EditTestLaboratory option:selected").text();
                }

                var vRefLabName = $("#txt_EditTestRefLabName").val();
                var vTestGuideVersion = $("#txt_EditTestGuideVersion").val();
                var vTestDescription = $("#txt_EditTestDescription").val();
                var vTestEstimatedCollectionTime = $("#txt_EditTestEstimatedCollectionTime").val();

                var validateMessage = "";

                // Validation
                if (vTestCode == "") {
                    validateMessage = "Test Code is required.";
                }

                if (vTestPrimaryName == "") {
                    validateMessage = validateMessage + "\n" + "Test Primary Name is required.";
                }

                if (vTestCategory == "") {
                    validateMessage = validateMessage + "\n" + "Test Category is required.";
                }

                var sampleDetailsChk = ValidateTestSampleDetails();
                var requirementDetailsChk = ValidateRequirementDetails();

                if (sampleDetailsChk != "") {

                    validateMessage = validateMessage + "\n" + sampleDetailsChk;
                }

                if (requirementDetailsChk != "") {

                    validateMessage = validateMessage + "\n" + requirementDetailsChk;
                }

                if (validateMessage == "") {

                    var _testId = TestDetailsList[0].TestId;

                    TestDetailsList = [];
                    
                    TestDetailsList.push({ TestId: _testId, TestCategoryId: vTestCategoryId, TestCategory: vTestCategory, TestCode: vTestCode, TestName: vTestPrimaryName, Description: vTestDescription, GuideVersion: vTestGuideVersion, EstimatedDuration: vTestEstimatedCollectionTime, LaboratoryId: vLaboratoryId, Laboratory: vLaboratory, ReferenceLaboratory: vRefLabName });

                    $.each(TestCommonNameList, function (i, val) {
                        TestCommonNameList[i].PrimaryCode = vTestCode;
                    });

                    SaveTest("edit", "");

                }
                else {

                    alert(validateMessage);

                }

                ResponseForEdit('');


            });

            $("#btn_editCancelEdittTest").click(function () {
                $("#editTestDialog").dialog('close');
            });

            ResponseForEdit('');

        }
    });
};

function OpenTestStepDetailsWindow(mode, id, objStepsGrid) {

    var dialog = ($('#TestStepDetailsDialog').length > 0) ? $('#TestStepDetailsDialog') : $('<div id="TestStepDetailsDialog" style="display:hidden"></div>').appendTo('body');

    $.ajax({
        url: hostUrl + '/Test/OpenTestStepDetails', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: true,
                width: 600, height: 540,
                resizable: false,
                show: "fade", hide: "fade",
                title: mode + ' Test Step Details - ' + TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ')'
            });

            $(":button").button();

            SetTestStepDetailsWindowIcons();

            $("#txt_TestStepsDetail_StepOrder").spinner({ min: 1, max: 100 });

            /* Start get data for edit */

            if (mode.toLowerCase() == "edit") {

                var stepsData = jQuery.grep(TestStepDetails, function (element, index) {
                    return (element.StepId == id);
                });

                $('#txt_TestStepsDetail_StepOrder').val(stepsData[0].StepOrder);
                $('#txt_TestStepsDetail_StepName').val(stepsData[0].StepName);
                $('#txt_TestStepDetails_Description').val(stepsData[0].Description);

            }

            /* end fill data for edit */

            Common_PopulateDropDownviaLookUp("TestStep", "CompetencyLevelID", $("#select_TestStepDetails_Competency"), function (err) {
                if (err == '') {

                    if (mode.toLowerCase() == "edit") {
                        $('#select_TestStepDetails_Competency').val(stepsData[0].CompetencyLevelId);
                    }

                }
                else {
                    alert(err);
                }

            });

            $("#btn_CancelTestStepDetailsData").click(function () {

                $("#TestStepDetailsDialog").dialog('close');

            });

            $("#btn_SaveTestStepDetailsData").click(function () {

                /* start to do */

                var vTestStepDetailImageUrl = "";
                var vTestStepDetailVideoUrl = "";

                /* end to do */

                var vTestStepDetailStepOrder = $("#txt_TestStepsDetail_StepOrder").val();
                var vTestStepDetailStepName = $("#txt_TestStepsDetail_StepName").val();
                var vTestStepDetailDescription = $("#txt_TestStepDetails_Description").val();

                var vTestStepDetailCompetencyLevelId = $("#select_TestStepDetails_Competency").val();

                var vTestStepDetailCompetencyLevel = ""
                if (vTestStepDetailCompetencyLevelId != "") {
                    vTestStepDetailCompetencyLevel = $("#select_TestStepDetails_Competency option:selected").text();
                }

                var validateMessage = "";

                // Validation
                if (vTestStepDetailStepName == "") {
                    validateMessage = "Step name is required.";
                }

                if (vTestStepDetailCompetencyLevelId == "") {
                    validateMessage = validateMessage + "\n" + "Competency level is required.";
                }

                if (validateMessage == "") {
                    
                    //temp upload
                    var formData = new FormData($("form")[0]);
                    $.ajax({
                        url: hostUrl + 'Test/UploadSteps',
                        type: 'POST',
                        // Form data
                        data: formData,
                        //Options to tell JQuery not to process data or worry about content-type
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            
                            vTestStepDetailImageUrl = data.imageFile;
                            vTestStepDetailVideoUrl = data.videoFile;

                            if (mode.toLowerCase() == "add") {

                                TestStepDetails.push({ TestId: TestDetailsList[0].TestId, StepId: GetTempStepId(), StepOrder: vTestStepDetailStepOrder, StepName: vTestStepDetailStepName, Description: vTestStepDetailDescription, CompetencyLevelId: vTestStepDetailCompetencyLevelId, CompetencyLevel: vTestStepDetailCompetencyLevel, ImageURL: vTestStepDetailImageUrl, VideoURL: vTestStepDetailVideoUrl, IsDeleted: false, IsAdded: true, IsModified: false });
                            }

                            if (mode.toLowerCase() == "edit") {

                                $.each(TestStepDetails, function (index) {

                                    if (TestStepDetails[index].StepId == id) {

                                        TestStepDetails[index].TestId = TestStepDetails[index].TestId;
                                        TestStepDetails[index].StepId = TestStepDetails[index].StepId;
                                        TestStepDetails[index].StepOrder = vTestStepDetailStepOrder;
                                        TestStepDetails[index].StepName = vTestStepDetailStepName;
                                        TestStepDetails[index].Description = vTestStepDetailDescription;
                                        TestStepDetails[index].CompetencyLevelId = vTestStepDetailCompetencyLevelId;
                                        TestStepDetails[index].CompetencyLevel = vTestStepDetailCompetencyLevel;
                                        TestStepDetails[index].ImageURL = vTestStepDetailImageUrl;
                                        TestStepDetails[index].VideoURL = vTestStepDetailVideoUrl;
                                        TestStepDetails[index].IsDeleted = TestStepDetails[index].IsDeleted;
                                        if (!TestStepDetails[index].IsAdded) {
                                            TestStepDetails[index].IsModified = true;
                                        }

                                    }
                                });

                            }
                            
                            objStepsGrid.igHierarchicalGrid("option", "dataSource", FormatTestStepDetailsGridData(TestStepDetails));
                            $("#TestStepDetailsDialog").dialog('close');

                        },
                        error: function (xhr, status, error) {
                            alert(error);
                        }
                    });

                }
                else {

                    alert(validateMessage);

                }

            });

        }
    });
};

function OpenTestTutorialStepDetailsWindow(mode, id, objTutorialStepGrid) {
    var dialog = ($('#TestTutorialStepDetailsDialog').length > 0) ? $('#TestTutorialStepDetailsDialog') : $('<div id="TestTutorialStepDetailsDialog" style="display:hidden"></div>').appendTo('body');

    $.ajax({
        url: hostUrl + '/Test/OpenTestTutorialStepDetails', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: true,
                width: 600, height: 450,
                resizable: false,
                show: "fade", hide: "fade",
                title: mode + ' Test Tutorial Step - ' + TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ')'
            });

            $(":button").button();

            SetTestTutorialStepDetailsWindowIcons();

            $("#txt_TestTutorialStepsDetail_StepOrder").spinner({ min: 1, max: 100 });

            /* Start get data for edit */

            if (mode.toLowerCase() == "edit") {

                var tutorialStepsData = jQuery.grep(TestTutorialStepDetails, function (element, index) {
                    return (element.TutorialStepId == id);
                });

                $('#txt_TestTutorialStepsDetail_StepOrder').val(tutorialStepsData[0].StepOrder);
                $('#txt_TestTutorialStepDetails_Description').val(tutorialStepsData[0].Description);

            }

            /* end fill data for edit */

            $("#btn_CancelTestTutorialStepDetailsData").click(function () {
                $("#TestTutorialStepDetailsDialog").dialog('close');
            });

            $("#btn_SaveTestTutorialStepDetailsData").click(function () {

                /* start to do */

                var vTestTutorialStepDetailImageUrl = "";
                var vTestTutorialStepDetailVideoUrl = "";

                /* end to do */

                var vTestTutorialStepDetailStepOrder = $("#txt_TestTutorialStepsDetail_StepOrder").val();
                var vTestTutorialStepDetailDescription = $("#txt_TestTutorialStepDetails_Description").val();

                var validateMessage = "";

                if (validateMessage == "") {

                    //temp upload
                    var formData = new FormData($("form")[0]);
                    $.ajax({
                        url: hostUrl + 'Test/UploadTutorialSteps',
                        type: 'POST',
                        // Form data
                        data: formData,
                        //Options to tell JQuery not to process data or worry about content-type
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {

                            vTestTutorialStepDetailImageUrl = data.imageFile;
                            vTestTutorialStepDetailVideoUrl = data.videoFile;

                            if (mode.toLowerCase() == "add") {

                                TestTutorialStepDetails.push({ TestId: TestDetailsList[0].TestId, TutorialStepId: GetTempTutorialStepId(), StepOrder: vTestTutorialStepDetailStepOrder, Description: vTestTutorialStepDetailDescription, ImageURL: vTestTutorialStepDetailImageUrl, VideoURL: vTestTutorialStepDetailVideoUrl, IsDeleted: false, IsAdded: true, IsModified: false });
                            }

                            if (mode.toLowerCase() == "edit") {

                                $.each(TestTutorialStepDetails, function (index) {

                                    if (TestTutorialStepDetails[index].TutorialStepId == id) {

                                        TestTutorialStepDetails[index].TestId = TestTutorialStepDetails[index].TestId;
                                        TestTutorialStepDetails[index].TutorialStepId = TestTutorialStepDetails[index].TutorialStepId;
                                        TestTutorialStepDetails[index].StepOrder = vTestTutorialStepDetailStepOrder;
                                        TestTutorialStepDetails[index].Description = vTestTutorialStepDetailDescription;
                                        TestTutorialStepDetails[index].ImageURL = vTestTutorialStepDetailImageUrl;
                                        TestTutorialStepDetails[index].VideoURL = vTestTutorialStepDetailVideoUrl;
                                        TestTutorialStepDetails[index].IsDeleted = TestTutorialStepDetails[index].IsDeleted;
                                        if (!TestTutorialStepDetails[index].IsAdded) {
                                            TestTutorialStepDetails[index].IsModified = true;
                                        }

                                    }
                                });

                            }

                            objTutorialStepGrid.igHierarchicalGrid("option", "dataSource", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));
                            $("#TestTutorialStepDetailsDialog").dialog('close');

                        }
                    });

                }
                else {

                    alert(validateMessage);

                }

            });

        }
    });
};

/* End Open Modal Windows */

/* Start set toolbar */

function SetToolbar() {

    $("#btn_SearchTest").button({
        text: false,
        icons: {
            primary: "ui-icon-search"
        }
    });

    $("#btn_AddNewTest").button({
        text: false,
        icons: {
            primary: "ui-icon-plusthick"
        }
    });

    $("#btn_UploadTest").button({
        text: false,
        icons: {
            primary: "ui-icon-gear"
        }
    })
   .click(function () {
       alert('Upload');
   });

    $("#btn_ViewTest").button({
        text: false,
        icons: {
            primary: "ui-icon-script"
        }
    })
   .click(function () {
       var row = $("#testgrid").igGridSelection("selectedRow");
       if (row && selectedRowId_TestId > 0) {
           GetDataById(selectedRowId_TestId, 'view');
           $('#testgrid').igGridSelection('deselectRow', row);
       }
       else {
           alert("Please select data to view.");
       }
   });

    $("#btn_EditTest").button({
        text: false,
        icons: {
            primary: "ui-icon-pencil"
        }
    })
   .click(function () {
       var row = $("#testgrid").igGridSelection("selectedRow");
       if (row && selectedRowId_TestId > 0) {
           editModeTestId = selectedRowId_TestId;
           GetDataById(selectedRowId_TestId, 'edit');
           $('#testgrid').igGridSelection('deselectRow', row);
       }
       else {
           alert("Please select data to edit.");
       }
   });

    $("#btn_DeleteTest").button({
        text: false,
        icons: {
            primary: "ui-icon-minusthick"
        }
    })
   .click(function () {
       var row = $("#testgrid").igGridSelection("selectedRow");
       if (window.confirm('Do you want to delete selected data?')) {
           if (row && selectedRowId_TestId > 0) {
               DeleteTest(selectedRowId_TestId);
           }
           else {
               alert("Please select data to delete.");
           }
       }
   });
};

function SetToolbarforTestStepDetails(btn_add, btn_edit, btn_delete, mode) {

    var gridObject = "";

    if (mode.toLowerCase() == "add") {
        gridObject = $("#newTestStepsGrid");
    }
    if (mode.toLowerCase() == "edit") {
        gridObject = $("#editTestStepsGrid");
    }

    btn_add.button({
        text: false,
        icons: {
            primary: "ui-icon-plusthick"
        }
    }).click(function () {
        OpenTestStepDetailsWindow('Add', "", gridObject);
    });

    btn_edit.button({
        text: false,
        icons: {
            primary: "ui-icon-pencil"
        }
    })
   .click(function () {
       var row = $("#newTestStepsGrid").igGridSelection("selectedRow");
       if (row && selectedRowId_StepDetails > 0) {
           OpenTestStepDetailsWindow('Edit', selectedRowId_StepDetails, gridObject);
       }
       else {
           alert("Please select data to edit.");
       }

   });

    btn_delete.button({
        text: false,
        icons: {
            primary: "ui-icon-minusthick"
        }
    })
   .click(function () {
       var row = $("#newTestStepsGrid").igGridSelection("selectedRow");
       if (row && selectedRowId_StepDetails > 0) {
           DeleteTestStepDetails(selectedRowId_StepDetails, gridObject);
       }
       else {
           alert("Please select data to delete.");
       }
   });
};

function SetToolbarforTestTutorialStepDetails(btn_add, btn_edit, btn_delete, mode) {

    var gridObject = "";

    if (mode.toLowerCase() == "add") {
        gridObject = $("#newTestTutorialStepsGrid");
    }
    if (mode.toLowerCase() == "edit") {
        gridObject = $("#editTestTutorialStepsGrid");
    }

    btn_add.button({
        text: false,
        icons: {
            primary: "ui-icon-plusthick"
        }
    }).click(function () {
        OpenTestTutorialStepDetailsWindow('Add', "", gridObject);
    });

    btn_edit.button({
        text: false,
        icons: {
            primary: "ui-icon-pencil"
        }
    })
   .click(function () {
       var row = $("#newTestTutorialStepsGrid").igGridSelection("selectedRow");
       if (row && selectedRowId_TutorialStepDetails > 0) {
           OpenTestTutorialStepDetailsWindow('Edit', selectedRowId_TutorialStepDetails, gridObject);
       }
       else {
           alert("Please select data to edit.");
       }
   });

    btn_delete.button({
        text: false,
        icons: {
            primary: "ui-icon-minusthick"
        }
    })
   .click(function () {
       var row = $("#newTestTutorialStepsGrid").igGridSelection("selectedRow");
       if (row && selectedRowId_TutorialStepDetails > 0) {
           DeleteTestTutorialStepDetails(selectedRowId_TutorialStepDetails, gridObject);
       }
       else {
           alert("Please select data to delete.");
       }
   });
};

function SetTestStepDetailsWindowIcons() {

    $("#btn_SearchTestStepsImage").button({
        text: false,
        icons: {
            primary: "ui-icon-search"
        }
    }).click(function () {
        $("#txt_TestStepsDetail_Image").val($("#lbl_SearchTestStepsImage :file").val());
    });

    $("#btn_UploadTestStepsImage").button({
        text: false,
        icons: {
            primary: "ui-icon-gear"
        }
    }).click(function () {
        alert('Uploading Image');
    });

    $("#btn_SearchTestStepsVideo").button({
        text: false,
        icons: {
            primary: "ui-icon-search"
        }
    }).click(function () {
        alert('Searching Image');
    });

    $("#btn_UploadTestStepsVideo").button({
        text: false,
        icons: {
            primary: "ui-icon-gear"
        }
    }).click(function () {
        alert('Uploading Image');
    });
};

function SetTestTutorialStepDetailsWindowIcons() {

    $("#btn_SearchTestTutorialStepsImage").button({
        text: false,
        icons: {
            primary: "ui-icon-search"
        }
    }).click(function () {
        alert('Searching Image');
    });

    $("#btn_UploadTestTutorialStepsImage").button({
        text: false,
        icons: {
            primary: "ui-icon-gear"
        }
    }).click(function () {
        alert('Uploading Image');
    });

    $("#btn_SearchTestTutorialStepsVideo").button({
        text: false,
        icons: {
            primary: "ui-icon-search"
        }
    }).click(function () {
        alert('Searching Image');
    });

    $("#btn_UploadTestTutorialStepsVideo").button({
        text: false,
        icons: {
            primary: "ui-icon-gear"
        }
    }).click(function () {
        alert('Uploading Image');
    });
};

/* End set toolbar */

/* Start Other Methods */

function ValidateTestSampleDetails() {

    var returnMessage = "";

    var sampleDetailsDataChk = jQuery.grep(TestSampleDetailsList, function (element, index) {
        return (element.IsDeleted == false);
    });

    if (sampleDetailsDataChk.length == 0) {

        returnMessage = returnMessage + "\n" + "Please select Sample equipment";

    }
    else {

        $.each(sampleDetailsDataChk, function (i, val) {

            var sampleType = sampleDetailsDataChk[i].SampleType;
            var application = "";

            if (sampleDetailsDataChk[i].application == null) {

                returnMessage = returnMessage + "\n" + "No Sample Application and Equipment for Sample Type " + sampleType;

            }
            else {

                var applicationDetailsDataChk = jQuery.grep(sampleDetailsDataChk[i].application, function (element, index) {
                    return (element.IsDeleted == false);
                });

                if (applicationDetailsDataChk.length == 0) {

                    returnMessage = returnMessage + "\n" + "No Sample Application and Equipment for Sample Type " + sampleType;

                }
                else {


                    $.each(applicationDetailsDataChk, function (ctr, val) {

                        var application = applicationDetailsDataChk[ctr].SampleApplication;

                        if (applicationDetailsDataChk[ctr].equipment == null) {

                            returnMessage = returnMessage + "\n" + "No Equipment for Sample Type " + sampleType + ", Application " + application;

                        }
                        else {

                            var equipmentDetailsDataChk = jQuery.grep(applicationDetailsDataChk[ctr].equipment, function (element, index) {
                                return (element.IsDeleted == false);
                            });

                            if (equipmentDetailsDataChk.length == 0) {

                                returnMessage = returnMessage + "\n" + "No Equipment for Sample Type " + sampleType + ", Application " + application;

                            }
                        }

                    });

                }
            }


        });
    }
    
    return returnMessage;

};

function ValidateRequirementDetails() {

    var returnMessage = "";

    var requirementDetailsDataChk = jQuery.grep(TestRequirementDetails, function (element, index) {
        return (element.IsDeleted == false);
    });

    if (requirementDetailsDataChk.length == 0) {

        returnMessage = returnMessage + "\n" + "Please select requirement type.";

    }
    else {

        $.each(requirementDetailsDataChk, function (i, val) {

            var requirementtype = requirementDetailsDataChk[i].RequirementType;

            if (requirementDetailsDataChk[i].StandardRequirement == null) {

                returnMessage = returnMessage + "\n" + "No Standard Requirement for Requirement Type " + requirementtype;
            }
            else {

                var standardRequirementDataChk = jQuery.grep(requirementDetailsDataChk[i].StandardRequirement, function (element, index) {
                    return (element.IsDeleted == false);
                });

                if (standardRequirementDataChk.length == 0) {

                    returnMessage = returnMessage + "\n" + "No Standard Requirement for Requirement Type " + requirementtype;
                }
            }

        });

    }
    
    return returnMessage;

};

function ValidateSteps(fromStep, toStep) {

    var isStepValid = false;
    var stepNumber = 0;
    var goingBack = false;
    if (fromStep < toStep) {
        stepNumber = fromStep;
        goingBack = false;
    }
    else {
        goingBack = true;
    }

    if (!goingBack) {
        switch (stepNumber) {
            case 1:

                var vTestCode = $("#txt_NewTestCode").val();
                var vTestPrimaryName = $("#txt_NewTestPrimaryName").val();

                var vTestCategoryId = $("#select_NewTestCategory").val();

                var vTestCategory = ""
                if (vTestCategoryId != "") {
                    vTestCategory = $("#select_NewTestCategory option:selected").text();
                }

                var vTestCommonName = $("#txt_NewTestCommonName").val();

                var vLaboratoryId = $("#select_NewTestLaboratory").val();

                var vLaboratory = ""
                if (vLaboratoryId != "") {
                    vLaboratory = $("#select_NewTestLaboratory option:selected").text();
                }

                var vRefLabName = $("#txt_NewTestRefLabName").val();
                var vTestGuideVersion = $("#txt_NewTestGuideVersion").val();
                var vTestDescription = $("#txt_NewTestDescription").val();
                var vTestEstimatedCollectionTime = $("#txt_NewTestEstimatedCollectionTime").val();

                var validateMessage = "";

                // Validation
                if (vTestCode == "") {
                    validateMessage = "Test Code is required.";
                }

                if (vTestPrimaryName == "") {
                    validateMessage = validateMessage + "\n" + "Test Primary Name is required.";
                }

                if (vTestCategory == "") {
                    validateMessage = validateMessage + "\n" + "Test Category is required.";
                }

                if (vTestCommonName == "") {
                    validateMessage = validateMessage + "\n" + "Test Common Name is required.";
                }

                if (validateMessage == "") {

                    //var testId = CheckIfCodeandAltNameExists({ chkTestCode: vTestCode, chkAltName: vTestCommonName.split(';') });

                    TestDetailsList = [];
                    
                    TestDetailsList.push({ TestId: 0, TestCategoryId: vTestCategoryId, TestCategory: vTestCategory, TestCode: vTestCode, TestName: vTestPrimaryName, Description: vTestDescription, GuideVersion: vTestGuideVersion, EstimatedDuration: vTestEstimatedCollectionTime, LaboratoryId: vLaboratoryId, Laboratory: vLaboratory, ReferenceLaboratory: vRefLabName });
                    
                    $.each(TestCommonNameList, function (i, val) {
                        TestCommonNameList[i].PrimaryCode = vTestCode;
                    });

                    $('.ui-dialog-title').html('New Test  - ' + TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ')');
                    isStepValid = true;

                }
                else {

                    alert(validateMessage);

                }

                break;
            case 2:

                var validateMessage = ValidateTestSampleDetails();

                if (validateMessage == "") {
                    isStepValid = true;
                }
                else {
                    isStepValid = false;
                    alert(validateMessage);
                }
                
                break;
            case 3:

                var validateMessage = ValidateRequirementDetails();

                if (validateMessage == "") {
                    isStepValid = true;
                }
                else {
                    isStepValid = false;
                    alert(validateMessage);
                }

                break;
            case 4:
                isStepValid = true;
                break;
            case 5:
                ShowSummary();
                isStepValid = true;
                break;
            case 6:

                isStepValid = true;
                break;
        }
    }
    else {
        isStepValid = true;
    }

    return isStepValid;
};

function ShowSummary() {

    $("#summaryTestCode").text(TestDetailsList[0].TestCode);
    $("#summaryTestName").text(TestDetailsList[0].TestName);
    $("#summaryTestCategory").text(TestDetailsList[0].TestCategory);

    HideSectionsForViewing();
    DestroySampleDetailsandRequirementTypeObject_Summary();
    SetUpSampleDetailsandRequirementType_Summary();
    SetUpSampleDetailsandRequirementTypeSectionPosition_Summary();

    var strCommonName = "";
    $.each(TestCommonNameList, function (i, val) {
        if (strCommonName != "") {
            strCommonName = strCommonName + "; " + TestCommonNameList[i].AltName + " (" + TestCommonNameList[i].Code + ")";
        }
        else {
            strCommonName = TestCommonNameList[i].AltName + " (" + TestCommonNameList[i].Code + ")";
        }
    });

    $("#summaryCommonTestName").text(strCommonName);
    $("#summaryDescription").text(TestDetailsList[0].Description);
    $("#summaryEstimatedCollectionTime").text(TestDetailsList[0].EstimatedDuration);
    $("#summaryLaboratory").text(TestDetailsList[0].Laboratory);
    $("#summaryRefLaboratory").text(TestDetailsList[0].ReferenceLaboratory);
    $("#summaryNumberSamples").text(TestSampleDetailsList.length);
    $("#summaryGuideVersion").text(TestDetailsList[0].GuideVersion);

    DestroyGrids($("#newTestStepsSummaryGrid"), "ighierarchicalgrid");
    DestroyGrids($("#newTestTutorialStepsSummaryGrid"), "ighierarchicalgrid");

    BindNewTestStepDetailsGrid("#newTestStepsSummaryGrid", FormatTestStepDetailsGridData(TestStepDetails));
    BindNewTestTutorialStepDetailsGrid("#newTestTutorialStepsSummaryGrid", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));

};

function SaveTest(mode, testId) {

    var TestData = [];
    var url = "";
    var message = "";
    var type = "";

    if (mode.toLowerCase() == "add") {
        url = "api/test/insert";
        message = "created";
        type = "post";
    }

    if (mode.toLowerCase() == "edit") {
        url = "api/test/update";
        message = "modified";
        type = "put";
    }

    if (mode.toLowerCase() == "add" || mode.toLowerCase() == "edit") {
        
        TestData = { DomainId: domainId, UserId: userId, TestDetails: TestDetailsList, TestSynonym: TestCommonNameList, TestSampleDetails: TestSampleDetailsList, TestSampleDetailConditions: TestSampleDetailsConditionList, TestRequirements: TestRequirementDetails, TestSteps: TestStepDetails, TestTutorialStepDetails: TestTutorialStepDetails };

    }

    if (mode.toLowerCase() == "delete") {

        url = "api/test/delete";
        message = "deleted";
        type = "put";

        TestData = { UserId: userId, TestId: testId };
    }

    Common_SaveDataChanges(url, TestData, type, function (items, err) {

        if (err == '') {

            if (mode.toLowerCase() == "add") {

                alert(TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ') ' + message + ' succesfully.');

                InitializeTestListVariables();
                $("#addTestDialog").dialog('close');
                GetData($("#txt_TestSearchList").val(), "", "true");

                DestroyGrids($("#newTestSampleDetailsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestRequirementsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestStepsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestTutorialStepsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestSampleDetailConditionsGrid"), "iggrid");

                DestroyGrids($("#newTestSampleDetailsSummaryGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestRequirementsSummaryGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestStepsSummaryGrid"), "ighierarchicalgrid");
                DestroyGrids($("#newTestTutorialStepsSummaryGrid"), "ighierarchicalgrid");

            }

            if (mode.toLowerCase() == "edit") {

                alert(TestDetailsList[0].TestName + ' (' + TestDetailsList[0].TestCode + ') ' + message + ' succesfully.');

                InitializeTestListVariables();
                $("#editTestDialog").dialog('close');
                GetData($("#txt_TestSearchList").val(), "", "true");

                DestroyGrids($("#editTestSampleDetailsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#editTestRequirementsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#editTestStepsGrid"), "ighierarchicalgrid");
                DestroyGrids($("#editTestTutorialStepsGrid"), "ighierarchicalgrid");

            }

            if (mode.toLowerCase() == "delete") {

                alert('Data deleted succesfully.');
                GetData($("#txt_TestSearchList").val(), "", "true");

            }

            ResponseForEdit('');

        }
        else {
            alert(err);
        }
    });
};

function DestroyGrids(object, gridType) {

    if (gridType == "iggrid") {
        $(object).igGrid("destroy");
    }

    if (gridType == "ighierarchicalgrid") {
        $(object).igHierarchicalGrid("destroy");
    }

};

/* End Other Methods */

/* Start Generate Temp Id */

function GetTempConditionId() {

    if (TestSampleDetailsConditionList.length > 0) {
        var max = [];

        $.each(TestSampleDetailsConditionList, function (i, val) {

            var value = parseInt(TestSampleDetailsConditionList[i].ConditionId);
            max.push(value);

        });

        max.sort(function (a, b) { return a - b });

        return max[max.length - 1] + 1;
    }
    else {
        return TestSampleDetailsConditionList.length + 1;
    }

};

function GetTempSampleId() {

    if (TestSampleDetailsList.length > 0) {
        var max = [];

        $.each(TestSampleDetailsList, function (i, val) {

            var value = parseInt(TestSampleDetailsList[i].SampleId);
            max.push(value);

        });

        max.sort(function (a, b) { return a - b });

        return max[max.length - 1] + 1;
    }
    else {
        return TestSampleDetailsList.length + 1;
    }

};

function GetTempRequirementId() {

    if (TestRequirementDetails.length > 0) {
        var max = [];

        $.each(TestRequirementDetails, function (i, val) {

            var value = parseInt(TestRequirementDetails[i].RequirementId);
            max.push(value);

        });

        max.sort(function (a, b) { return a - b });

        return max[max.length - 1] + 1;
    }
    else {
        return TestRequirementDetails.length + 1;
    }

};

function GetTempStepId() {

    if (TestStepDetails.length > 0) {
        var max = [];

        $.each(TestStepDetails, function (i, val) {

            var value = parseInt(TestStepDetails[i].StepId);
            max.push(value);

        });

        max.sort(function (a, b) { return a - b });

        return max[max.length - 1] + 1;
    }
    else {
        return TestStepDetails.length + 1;
    }

};

function GetTempTutorialStepId() {

    if (TestTutorialStepDetails.length > 0) {
        var max = [];

        $.each(TestTutorialStepDetails, function (i, val) {

            var value = parseInt(TestTutorialStepDetails[i].TutorialStepId);
            max.push(value);

        });

        max.sort(function (a, b) { return a - b });

        return max[max.length - 1] + 1;
    }
    else {
        return TestTutorialStepDetails.length + 1;
    }

};

/* End Generate Temp Id */

/* Start delete methods */

function DeleteTest(testId) {

    RequestForEdit();

    SaveTest("delete", testId);

};

function DeleteTestSampleDetails(sampleId, objectGrid) {

    $.each(TestSampleDetailsList, function (index) {

        if (TestSampleDetailsList[index].SampleId == sampleId) {

            TestSampleDetailsList[index].IsDeleted = true;
            TestSampleDetailsList[index].IsAdded = false;
            TestSampleDetailsList[index].IsModified = false;
        }
    });

    $.each(TestSampleDetailsConditionList, function (index) {

        if (TestSampleDetailsConditionList[index].SampleId == sampleId) {

            TestSampleDetailsConditionList[index].IsDeleted = true;
            TestSampleDetailsConditionList[index].IsAdded = false;
            TestSampleDetailsConditionList[index].IsModified = false;
        }
    });

    objectGrid.igHierarchicalGrid("option", "dataSource", FormatTestSampleDetailsGridData(TestSampleDetailsList, TestSampleDetailsConditionList));

};

function DeleteTestRequirementDetails(requirementId, objectGrid) {

    $.each(TestRequirementDetails, function (index) {

        if (TestRequirementDetails[index].RequirementId == requirementId) {

            TestRequirementDetails[index].IsDeleted = true;
            TestRequirementDetails[index].IsAdded = false;
            TestRequirementDetails[index].IsModified = false;
        }
    });

    objectGrid.igHierarchicalGrid("option", "dataSource", FormatTestRequirementsDetailsGridData(TestRequirementDetails));

};

function DeleteTestStepDetails(stepId, objectGrid) {

    $.each(TestStepDetails, function (index) {

        if (TestStepDetails[index].StepId == stepId) {

            TestStepDetails[index].IsDeleted = true;
            TestStepDetails[index].IsAdded = false;
            TestStepDetails[index].IsModified = false;
        }
    });

    objectGrid.igHierarchicalGrid("option", "dataSource", FormatTestStepDetailsGridData(TestStepDetails));

};

function DeleteTestTutorialStepDetails(tutorialStepId, objectGrid) {

    $.each(TestTutorialStepDetails, function (index) {

        if (TestTutorialStepDetails[index].TutorialStepId == tutorialStepId) {

            TestTutorialStepDetails[index].IsDeleted = true;
            TestTutorialStepDetails[index].IsAdded = false;
            TestTutorialStepDetails[index].IsModified = false;
        }
    });

    objectGrid.igHierarchicalGrid("option", "dataSource", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));

};

/* end delete methods */

/* Start events */

$("#txt_TestSearchList").change(function () {
    if ($("#txt_TestSearchList").val() == "") {
        GetData($("#txt_TestSearchList").val(), "", "true");
    }
});

$("#btn_SearchTest").click(function () {
    GetData($("#txt_TestSearchList").val(), "", "true");
});

$("#buttonGroup :button").click(function () {
    var searchValue = $(this).attr("id");

    var searchType = "";

    if (searchValue == 'numeric') {
        searchType = searchValue;
    }

    GetData(searchValue, searchType, "true");
});

$("#btn_AddNewTest").click(function () {

    RequestForEdit();

    gPageMode = "add";

    InitializeTestListVariables();

    var dialog = ($('#addTestDialog').length > 0) ? $('#addTestDialog') : $('<div id="addTestDialog" style="display:hidden"></div>').appendTo('body');
    $.ajax({
        url: hostUrl + '/Test/AddNewTestData', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: false,
                width: 1250, height: 800,
                resizable: false,
                show: "fade", hide: "fade",
                title: 'New Test',
                close: function () {
                    DestroySampleDetailsandRequirementTypeObject();
                    DestroySampleDetailsandRequirementTypeObject_Summary();
                    $(this).dialog('destroy').remove();
                }
            });

            $('#testwizard').smartWizard({
                selected: 0,
                keyNavigation: true,
                enableAllSteps: false,
                transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
                contentURL: null, // specifying content url enables ajax content loading
                contentCache: true, // cache step contents, if false content is fetched always from ajax url
                cycleSteps: false, // cycle step navigation
                enableFinishButton: false, // makes finish button enabled always
                errorSteps: [],    // array of step numbers to highlighting as error steps
                labelNext: 'Next', // label for Next button
                labelPrevious: 'Previous', // label for Previous button
                labelFinish: 'Finish',  // label for Finish button       
                // Events
                onLeaveStep: leaveAStepCallback, // triggers when leaving a step
                //onShowStep: null,  // triggers when showing a step
                onFinish: onFinishCallback  // triggers when Finish button is clicked			
            });

            $(".tabs").tabs();
            
            $(":button").button();
            
            SetUpSampleDetailsandRequirementType();
            SetUpSampleDetailsandRequirementTypeSectionPosition("add");

            $("#txt_NewTestGuideVersion").spinner({ min: 1, max: 100 });
            $("#txt_NewTestEstimatedCollectionTime").spinner({ min: 1, max: 100 });

            $("#txt_NewTestCode").change(function () {

                CheckIfCodeandAltNameExists($("#txt_NewTestCode").val(), "0", function (items, err) {

                    if (err == '') {
                        
                        var testId = items.TestId;
                        var testCode = items.TestCode;
                        var isPrimary = items.IsPrimary;
                        var testName = items.TestName;

                        if(testCode != null) {

                            if (isPrimary) {
                                if (window.confirm('Primary Code : ' + $("#txt_NewTestCode").val() + ' already used by ' + testName + '(' + testCode + ')' + '\n' + 'Do you want to edit the existing test?')) {
                                    $("#addTestDialog").dialog('close');
                                    editModeTestId = testId;
                                    GetDataById(testId, 'edit');
                                }

                                else {
                                    $("#txt_NewTestCode").val("")
                                }
                            }
                            else {
                                alert('Primary Code : ' + $("#txt_NewTestCode").val() + ' is used as alternate code by ' + testName + '(' + testCode + ')');
                                $("#txt_NewTestCode").val("")
                            }
                        }
                    }
                    
                });

            });

            var isStepValid = false;

            function leaveAStepCallback(obj, context) {
                return ValidateSteps(context.fromStep, context.toStep); // return false to stay on step and true to continue navigation 
            };

            function onFinishCallback(obj, context) {

                RequestForEdit();
                SaveTest('Add', "");
                
            };

            BindAlternateTestNameGrid("#newTestAltNameGrid", FormatAlternateNameData(TestCommonNameList));

            BindNewTestStepDetailsGrid("#newTestStepsGrid", FormatTestStepDetailsGridData(TestStepDetails));
            
            BindNewTestTutorialStepDetailsGrid("#newTestTutorialStepsGrid", FormatTestTutorialStepDetailsGridData(TestTutorialStepDetails));

            SetToolbarforTestStepDetails($("#btn_AddNewTestStepDetails"), $("#btn_EditTestStepDetails"), $("#btn_DeleteTestStepDetails"), "add");

            SetToolbarforTestTutorialStepDetails($("#btn_AddNewTestTutorialStepDetails"), $("#btn_EditTestTutorialStepDetails"), $("#btn_DeleteTestTutorialStepDetails"), "add");
            
            Common_PopulateDropDownviaLookUp("Test", "Laboratory", $("#select_NewTestLaboratory"), function (err) {
                if (err != '') { alert(err); }
            });

            Common_PopulateDropDownviaLookUp("Test", "TestCategoryId", $("#select_NewTestCategory"), function (err) {
                if (err != '') { alert(err); }
            });

            ResponseForEdit('');

        }
    });
});

/* End events */

/* Start Set up sample details and Requirement type */

var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
};

function SetUpSampleDetailsandRequirementType() {
    
    PopulateSampleDetailsandRequirementListData(function (err) {
        
        if (err == '') {
            PopulateSampleEquipmentList(function (err) {
                if (err == '') {
                    SetUpSampleDetailsandRequirementTypeObjects();

                    if (gPageMode == "edit") {
                        
                        BindSampleDetailsDataIfExist("sampletype");
                        BindRequirementDetailsIfExist("requirementtype");
                    }
                    
                }
            });

        }
    });
};

function SetUpSampleDetailsandRequirementTypeObjects() {


    $('.iCheck').each(function () {

        var self = $(this),
          label = self.next(),
          label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-blue',
            radioClass: 'iradio_line-blue',
            insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_uncheck icheck_notactive" style="z-index:9999;"></div><span class="labeltext">' + label_text + '</span><span class="activeIcon"></span>'
        });
    });

    $("#ul_equipment_obj").sortable({
        stop: function (event, ui) {

            var currentId = ui.item.find('.chk_Equipment').attr('id');
            var primaryId = "";
            var secondaryId = "";

            $.each($('.chk_Equipment'), function () {
                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {

                    if (primaryId == "") {
                        primaryId = $(this).attr("id");
                    }
                    else {
                        secondaryId = $(this).attr("id");
                    }
                }
            });

            if (currentId == primaryId) {
                $("#divEquipmentDetailsCondition_label").html("Primary Container");
            }

            if (currentId == secondaryId) {
                $("#divEquipmentDetailsCondition_label").html("Alternate Container");
            }
        }
    });

    AttachEventToEquipmentDetailsTextBox();

    //start events for sample type

    $.each($('.chk_sampleType'), function () {

        var bgColor = $(this).parent().css("background-color");
        $("#divSampleType_obj").css("border-color", rgb2hex(bgColor));

        //start icon events
        $(this).next().click(function () {
            
            //uncheck to check
            if ($(this).hasClass("icheck_custom_icon_uncheck")) {

                $(this).removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');
                
                $(this).prop('title', 'Delete');

                var currentId = $(this).prev().attr("id");
                
                var div_analysissampleType = "divAnalysisSampleType_" + currentId;
                $("#" + div_analysissampleType).show("slow");

                if (!$("#tdAnalysisSampleApplication").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdAnalysisSampleApplication").show("slow");
                    $("#divAnalysisSampleApplication_obj").css("border-color", rgb2hex(bgColor));

                }

                $('.chk_sampleType').each(function () {

                    if (currentId != $(this).attr("id")) {

                        var div_inneranalysissampleType = "divAnalysisSampleType_" + $(this).attr("id");
                        var div_inneranalysissampleTypeSelected = false;

                        $("#" + div_inneranalysissampleType).find('input').each(function () {
                            if ($(this).is(":checked")) {
                                div_inneranalysissampleTypeSelected = true;
                            }
                        });

                        if (!div_inneranalysissampleTypeSelected) {
                            $("#" + div_inneranalysissampleType).hide("slow");
                        }

                        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {

                            $('.chk_Application').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                                $(this).parent().width(190);
                            });

                            $("#tdEquipment").hide("fast");

                            $('.chk_Equipment').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                                $(this).parent().width(190);
                            });

                            $("#tdEquipmentDetailsCondition").hide("fast");

                            $('.chk_EquipmentCondition').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                            });

                            $("#oc_text").hide('slow');

                        }

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(192);

                    }
                });

                //save data
                var sampleTypeId = $(this).prev().attr("id");
                var sampleType = $(this).parent().find('.labeltext').text();

                SaveChangesToSampleDetailList(gPageMode, "sampletype", sampleTypeId, sampleType, "", "", "", "", "", "", 0, "", 0, 0, "", "", "", true, false, false);

                BindSampleDetailsDataIfExist("application");
                
                return;

            }

            //check to uncheck
            if ($(this).hasClass("icheck_custom_icon_check")) {

                if (window.confirm('Are you sure you want to delete this?')) {

                    $(this).prop('title', 'Select');

                    if ($(this).hasClass("icheck_active")) {

                        $(this).parent().width(192);
                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');
                        $("#tdAnalysisSampleApplication").hide("fast");

                        $("#tdEquipment").hide("fast");

                        $("#tdEquipmentDetailsCondition").hide("fast");
                        
                        $("#oc_text").hide('slow');

                        ClearSelectedSampleDetails("application");
                        ClearSelectedSampleDetails("equipment");
                        ClearSelectedSampleDetails("equipmentdetailscondition");

                    }

                    $(this).removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                    $(this).removeClass('icheck_active').addClass('icheck_notactive');
                    
                    var div_analysissampleType = "divAnalysisSampleType_" + $(this).prev().attr("id");

                    $("#" + div_analysissampleType).find('input').each(function () {
                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                        $(this).iCheck('uncheck');
                        $(this).iCheck('update');
                    });

                    $("#" + div_analysissampleType).hide("slow");

                    //save data
                    var sampleTypeId = $(this).prev().attr("id");
                    var sampleType = $(this).parent().find('.labeltext').text();

                    SaveChangesToSampleDetailList(gPageMode, "sampletype", sampleTypeId, sampleType, "", "", "", "", "", "", 0, "", 0, 0, "", "", "", false, false, true);

                }
              
                return;

            }

        });
        //end icon events
    
    });
   
    $('.chk_sampleType').on('ifClicked', function (event) {
        
        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

            $(this).parent().find('.icheck_custom_icon').prop('title', 'Delete');

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
            $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
            $(this).parent().width(220);

            $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
            $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

            var width = $(this).parent().width() + 20;
            $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

            var div_analysissampleType = "divAnalysisSampleType_" + currentId;
            $("#" + div_analysissampleType).show("slow");

            if (!$("#tdAnalysisSampleApplication").is(":visible")) {

                var bgColor = $(this).parent().css("background-color");
                $("#tdAnalysisSampleApplication").show("slow");
                $("#divAnalysisSampleApplication_obj").css("border-color", rgb2hex(bgColor));

            }

            $('.chk_sampleType').each(function () {

                if (currentId != $(this).attr("id")) {

                    var div_inneranalysissampleType = "divAnalysisSampleType_" + $(this).attr("id");
                    var div_inneranalysissampleTypeSelected = false;

                    $("#" + div_inneranalysissampleType).find('input').each(function () {
                        if ($(this).is(":checked")) {
                            div_inneranalysissampleTypeSelected = true;
                        }
                    });

                    if (!div_inneranalysissampleTypeSelected) {
                        $("#" + div_inneranalysissampleType).hide("slow");
                    }

                    if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {

                        $('.chk_Application').each(function () {
                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                            $(this).parent().width(190);
                        });

                        $("#tdEquipment").hide("fast");

                        $('.chk_Equipment').each(function () {
                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                            $(this).parent().width(190);
                        });

                        $("#tdEquipmentDetailsCondition").hide("fast");

                        $('.chk_EquipmentCondition').each(function () {
                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                        });


                        $("#oc_text").hide('slow');

                    }

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                    $(this).parent().width(192);

                }
            });

            //save data
            var sampleTypeId = currentId;
            var sampleType = $(this).parent().find('.labeltext').text();

            SaveChangesToSampleDetailList(gPageMode, "sampletype", sampleTypeId, sampleType, "", "", "", "", "", "", 0, "", 0, 0, "", "", "", true, false, false);

            BindSampleDetailsDataIfExist("application");

            return;

        }

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().width(190);

                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');

                var div_inneranalysissampleType = "divAnalysisSampleType_" + currentId;
                var div_inneranalysissampleTypeSelected = false;

                $("#" + div_inneranalysissampleType).find('input').each(function () {
                    if ($(this).is(":checked")) {
                        div_inneranalysissampleTypeSelected = true;
                    }
                });

                if (!div_inneranalysissampleTypeSelected) {
                    $("#" + div_inneranalysissampleType).hide("slow");
                }

                //start temp based on data
                $("#tdAnalysisSampleApplication").hide("fast");

                $("#tdEquipment").hide("fast");

                $("#tdEquipmentDetailsCondition").hide("fast");

                $("#oc_text").hide('slow');

                ClearSelectedSampleDetails("application");
                ClearSelectedSampleDetails("equipment");
                ClearSelectedSampleDetails("equipmentdetailscondition");
                //end temp based on data

            }
            else {

                $(this).parent().width(220);
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                var div_analysissampleType = "divAnalysisSampleType_" + currentId;
                $("#" + div_analysissampleType).show("slow");

                if (!$("#tdAnalysisSampleApplication").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdAnalysisSampleApplication").show("slow");
                    $("#divAnalysisSampleApplication_obj").css("border-color", rgb2hex(bgColor));

                }

                //start temp based on data
                $("#tdEquipment").hide("fast");

                $("#tdEquipmentDetailsCondition").hide("fast");

                $("#oc_text").hide('slow');

                ClearSelectedSampleDetails("application");
                ClearSelectedSampleDetails("equipment");
                ClearSelectedSampleDetails("equipmentdetailscondition");
                //end temp based on data

                $('.chk_sampleType').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);
                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');

                        var div_inneranalysissampleType = "divAnalysisSampleType_" + $(this).attr("id")
                        var div_inneranalysissampleTypeSelected = false;

                        $("#" + div_inneranalysissampleType).find('input').each(function () {
                            if ($(this).is(":checked")) {
                                div_inneranalysissampleTypeSelected = true;
                            }
                        });

                        if (!div_inneranalysissampleTypeSelected) {
                            $("#" + div_inneranalysissampleType).hide("slow");
                        }


                    }
                });

                BindSampleDetailsDataIfExist("application");

            }
            
            return;

        }

    });

    //end events for sample type

    //start events for analysis sample type

    $('.chk_AnalysisSampleType').on('ifChecked', function (event) {

        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
        var sampleTypeId = $(this).parent().parent().parent().attr("id").split('_')[1];
        var currentId = $(this).attr("id");
        var label = $(this).parent().find('.labeltext').text();

        SaveChangesToSampleDetailList(gPageMode, "analysissampletype", sampleTypeId, "", label, currentId, "", "", "", "", 0, "", 0, 0, "", "", "", true, false, false);

        $(this).parent().parent().parent().find('input').each(function () {
            if (currentId != $(this).attr("id")) {
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                $(this).iCheck('uncheck');
                $(this).iCheck('update');
            }
        });
    });

    //end events for analysis sample type
    
    //start events for sample application

    $.each($('.chk_Application'), function () {

        $(this).next().click(function () {

            //uncheck to check
            if ($(this).hasClass("icheck_custom_icon_uncheck")) {

                $(this).removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 27;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).prop('title', 'Delete');

                var currentId = $(this).prev().attr("id");
                
                if (!$("#tdEquipment").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdEquipment").show("slow");
                    $("#divEquipment_obj").css("border-color", rgb2hex(bgColor));
                    $("#divEquipment_obj").sortable();

                }

                $('.chk_Application').each(function () {

                    if (currentId != $(this).attr("id")) {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {

                            $('.chk_Equipment').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                                $(this).parent().width(190);
                            });

                            $("#tdEquipmentDetailsCondition").hide("fast");

                            $('.chk_EquipmentCondition').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                            });

                            $("#oc_text").hide('slow');

                        }

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);

                    }
                });
                
                //save data
                var sampleTypeId = "";
                var applicationId = currentId;
                var application = $(this).parent().find('.labeltext').text();

                $('.chk_sampleType').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        sampleTypeId = $(this).attr("id");
                    }

                });

                SaveChangesToSampleDetailList(gPageMode, "application", sampleTypeId, "", "", "", applicationId, application, "", "", 0, "", 0, 0, "", "", "", true, false, false);

                BindSampleDetailsDataIfExist("equipment");

                return;

            }

            //check to uncheck
            if ($(this).hasClass("icheck_custom_icon_check")) {

                if (window.confirm('Are you sure you want to delete this?')) {

                    $(this).prop('title', 'Select');

                    if ($(this).hasClass("icheck_active")) {

                       $(this).parent().width(192);
                       $("#tdEquipment").hide("fast");

                        $("#tdEquipmentDetailsCondition").hide("fast");

                        $("#oc_text").hide('slow');

                        ClearSelectedSampleDetails("equipment");
                        ClearSelectedSampleDetails("equipmentdetailscondition");
                    }

                    $(this).removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                    $(this).removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');

                    //save data
                    var sampleTypeId = "";
                    var applicationId = $(this).prev().attr("id");
                    var application = $(this).parent().find('.labeltext').text();

                    $('.chk_sampleType').each(function () {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                            sampleTypeId = $(this).attr("id");
                        }

                    });

                    SaveChangesToSampleDetailList(gPageMode, "application", sampleTypeId, "", "", "", applicationId, application, "", "", 0, "", 0, 0, "", "", "", false, false, true);

                }

                return;

            }

        });

    });

    $('#divAnalysisSampleApplication .iCheck').on('ifClicked', function (event) {

        if ($(this).hasClass("chk_Application")) {

            var currentId = this.id;

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 27;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).parent().find('.icheck_custom_icon').prop('title', 'Delete');

                if (!$("#tdEquipment").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdEquipment").show("slow");
                    $("#divEquipment_obj").css("border-color", rgb2hex(bgColor));
                    $("#divEquipment_obj").sortable();

                }

                $('.chk_Application').each(function () {
                    if (currentId != $(this).attr("id")) {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {

                            $('.chk_Equipment').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                                $(this).parent().width(190);
                            });

                            $("#tdEquipmentDetailsCondition").hide("fast");

                            $('.chk_EquipmentCondition').each(function () {
                                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                            });

                            $("#oc_text").hide('slow');

                        }

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);

                    }
                });

                
                //save data
                var sampleTypeId = "";
                var applicationId = currentId;
                var application = $(this).parent().find('.labeltext').text();

                $('.chk_sampleType').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        sampleTypeId = $(this).attr("id");
                    }

                });

                SaveChangesToSampleDetailList(gPageMode, "application", sampleTypeId, "", "", "", applicationId, application, "", "", 0, "", 0, 0, "", "", "", true, false, false);

                BindSampleDetailsDataIfExist("equipment");

                return;

            }

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().width(190);

                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');
                    
                    //start temp based on data
                    
                    $("#tdEquipment").hide("fast");

                    $("#tdEquipmentDetailsCondition").hide("fast");

                    $("#oc_text").hide('slow');

                    ClearSelectedSampleDetails("equipment");
                    ClearSelectedSampleDetails("equipmentdetailscondition");
                    //end temp based on data

                }
                else {

                    $(this).parent().width(220);
                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                    $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                    var width = $(this).parent().width() + 20;
                    $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                    if (!$("#tdEquipment").is(":visible")) {

                        var bgColor = $(this).parent().css("background-color");
                        $("#tdEquipment").show("slow");
                        $("#divEquipment_obj").css("border-color", rgb2hex(bgColor));
                        $("#divEquipment_obj").sortable();

                    }

                    //start temp based on data
                    $("#tdEquipmentDetailsCondition").hide("fast");

                    $("#oc_text").hide('slow');

                    ClearSelectedSampleDetails("equipment");
                    ClearSelectedSampleDetails("equipmentdetailscondition");
                    //end temp based on data

                    $('.chk_Application').each(function () {
                        if (currentId != $(this).attr("id")) {

                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                            $(this).parent().width(190);

                        }
                    });

                    BindSampleDetailsDataIfExist("equipment");

                }
                
                return;

            }

        }

    });

    //end events for sample application

    //start events for equipment

    $.each($('.chk_Equipment'), function () {

        $(this).next().click(function () {

            //uncheck to check
            if ($(this).hasClass("icheck_custom_icon_uncheck")) {

                var chkCounter = 0;

                $.each($('.chk_Equipment'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {
                        chkCounter = chkCounter + 1;
                    }
                });

                if (chkCounter >= 2) {
                    alert('Only 2 equipment can be selected.');
                    return;
                }

                var currentId = $(this).prev().attr("id");

                $(this).removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 27;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).prop('title', 'Delete');

                if (!$("#tdEquipmentDetailsCondition").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdEquipmentDetailsCondition").show("slow");
                    $("#divEquipmentDetailsCondition").css("border-color", rgb2hex(bgColor));

                }

                //start temp based on data
                $('.chk_EquipmentCondition').each(function () {
                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                });

                $("#oc_text").hide('slow');
                //end temp based on data

                $('.chk_Equipment').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);

                    }
                });

                var primaryId = "";
                var secondaryId = "";

                $.each($('.chk_Equipment'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {

                        if (primaryId == "") {
                            primaryId = $(this).attr("id");
                        }
                        else {
                            secondaryId = $(this).attr("id");
                        }
                    }
                });

                if (currentId == primaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Primary Container");
                }

                if (currentId == secondaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Alternate Container");
                }

                //save data
                var sampleTypeId = "";
                var applicationId = "";
                var equipmentId = $(this).prev().attr("id");
                var equipment = $(this).parent().find('.labeltext').text();

                $('.chk_sampleType').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        sampleTypeId = $(this).attr("id");
                    }

                });

                $('.chk_Application').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        applicationId = $(this).attr("id");
                    }

                });

                SaveChangesToSampleDetailList(gPageMode, "equipment", sampleTypeId, "", "", "", applicationId, "", equipmentId, equipment, 1, "", 1, 1, "", "", "", true, false, false);

                BindSampleDetailsDataIfExist("equipmentdetailscondition");

                ShowUnit($(this).prev().attr("id"));

                return;

            }

            //check to uncheck
            if ($(this).hasClass("icheck_custom_icon_check")) {

                if (window.confirm('Are you sure you want to delete this?')) {

                    $(this).prop('title', 'Select');

                    if ($(this).hasClass("icheck_active")) {

                        $(this).parent().width(192);
                     
                        $("#tdEquipmentDetailsCondition").hide("fast");

                        $("#oc_text").hide('slow');

                        ClearSelectedSampleDetails("equipmentdetailscondition");
                    }

                    $(this).removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                    $(this).removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');
                    $("#divEquipmentDetailsCondition_label").html("");

                    //save data
                    var sampleTypeId = "";
                    var applicationId = "";
                    var equipmentId = $(this).prev().attr("id");
                    var equipment = $(this).parent().find('.labeltext').text();

                    $('.chk_sampleType').each(function () {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                            sampleTypeId = $(this).attr("id");
                        }

                    });

                    $('.chk_Application').each(function () {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                            applicationId = $(this).attr("id");
                        }

                    });

                    SaveChangesToSampleDetailList(gPageMode, "equipment", sampleTypeId, "", "", "", applicationId, "", equipmentId, equipment, 0, "", 0, 0, "", "", "", false, false, true);

                }

                return;

            }

        });

    });

    $('#divEquipment_obj .iCheck').on('ifClicked', function (event) {

        if ($(this).hasClass("chk_Equipment")) {

            var currentId = this.id;

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

                var chkCounter = 0;

                $.each($('.chk_Equipment'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {
                        chkCounter = chkCounter + 1;
                    }
                });
                
                if (chkCounter >= 2) {
                    alert('Only 2 equipment can be selected.');
                    return;
                }

                $(this).parent().width(220);
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
                
                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 27;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).parent().find('.icheck_custom_icon').prop('title', 'Delete');
                
                if (!$("#tdEquipmentDetailsCondition").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdEquipmentDetailsCondition").show("slow");
                    $("#divEquipmentDetailsCondition").css("border-color", rgb2hex(bgColor));

                }

                //start temp based on data
                ClearSelectedSampleDetails("equipmentdetailscondition");

                $("#oc_text").hide('slow');
                //end temp based on data

                $('.chk_Equipment').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);

                    }
                });

                var primaryId = "";
                var secondaryId = "";

                $.each($('.chk_Equipment'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {

                        if (primaryId == "") {
                            primaryId = $(this).attr("id");
                        }
                        else {
                            secondaryId = $(this).attr("id");
                        }
                    }
                });
                
                if (currentId == primaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Primary Container");
                }

                if (currentId == secondaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Alternate Container");
                }

                //save data
                var sampleTypeId = "";
                var applicationId = "";
                var equipmentId = currentId;
                var equipment = $(this).parent().find('.labeltext').text();

                $('.chk_sampleType').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        sampleTypeId = $(this).attr("id");
                    }

                });

                $('.chk_Application').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        applicationId = $(this).attr("id");
                    }

                });

                SaveChangesToSampleDetailList(gPageMode, "equipment", sampleTypeId, "", "", "", applicationId, "", equipmentId, equipment, 1, "", 1, 1, "", "", "", true, false, false);

                BindSampleDetailsDataIfExist("equipmentdetailscondition");

                ShowUnit(currentId);

                return;

            }

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');
                    $(this).parent().width(190);
                                        
                    //start temp based on data

                    $("#tdEquipmentDetailsCondition").hide("fast");
                    $("#divEquipmentDetailsCondition_label").html("");

                    $("#oc_text").hide('slow');

                    ClearSelectedSampleDetails("equipmentdetailscondition");
                    //end temp based on data

                }
                else {

                    //
                    $(this).parent().width(220);
                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                    $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                    var width = $(this).parent().width() + 27;
                    $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                    if (!$("#tdEquipmentDetailsCondition").is(":visible")) {

                        var bgColor = $(this).parent().css("background-color");
                        $("#tdEquipmentDetailsCondition").show("slow");
                        $("#divEquipmentDetailsCondition").css("border-color", rgb2hex(bgColor));

                    }

                    //start temp based on data
                    
                    $("#oc_text").hide('slow');

                    ClearSelectedSampleDetails("equipmentdetailscondition");
                    //end temp based on data

                    $('.chk_Equipment').each(function () {
                        if (currentId != $(this).attr("id")) {

                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                            $(this).parent().width(190);

                        }
                    });

                    BindSampleDetailsDataIfExist("equipmentdetailscondition");

                    ShowUnit(currentId);
                
                }

                var primaryId = "";
                var secondaryId = "";

                $.each($('.chk_Equipment'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {

                        if (primaryId == "") {
                            primaryId = $(this).attr("id");
                        }
                        else {
                            secondaryId = $(this).attr("id");
                        }
                    }
                });

                if (currentId == primaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Primary Container");
                }

                if (currentId == secondaryId) {
                    $("#divEquipmentDetailsCondition_label").html("Alternate Container");
                }
                                
                return;

            }

        }

    });

    //end events for equipment

    //start events for equipment condition

    $('.chk_EquipmentCondition').on('ifClicked', function (event) {

        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
            if (currentId == 'other') {
                $("#oc_text").show('slow');
                AttachEventToEquipmentSpecialCondition();
            }


            //save data
            var sampleTypeId = "";
            var applicationId = "";
            var equipmentId = "";
            var equipmentConditionId = currentId;
            var equipmentCondition = $(this).parent().find('.labeltext').text();;

            $('.chk_sampleType').each(function () {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                    sampleTypeId = $(this).attr("id");
                }

            });

            $('.chk_Application').each(function () {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                    applicationId = $(this).attr("id");
                }

            });

            $('.chk_Equipment').each(function () {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                    equipmentId = $(this).attr("id");
                }

            });

            SaveChangesToSampleDetailList(gPageMode, "equipmentconditions", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", 0, "", 0, 0, equipmentConditionId, equipmentCondition, "", true, false, false);

            return;

        }

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if (window.confirm('Are you sure you want to delete this?')) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');

                if (this.id == 'other') {
                    $("#oc_text_obj").val("");
                    $("#oc_text").hide('slow');
                    $("#oc_text_obj").unbind("change");
                }

                //save data
                var sampleTypeId = "";
                var applicationId = "";
                var equipmentId = "";
                var equipmentConditionId = currentId;
                var equipmentCondition = $(this).parent().find('.labeltext').text();;

                $('.chk_sampleType').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        sampleTypeId = $(this).attr("id");
                    }

                });

                $('.chk_Application').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        applicationId = $(this).attr("id");
                    }

                });

                $('.chk_Equipment').each(function () {

                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                        equipmentId = $(this).attr("id");
                    }

                });

                SaveChangesToSampleDetailList(gPageMode, "equipmentconditions", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", 0, "", 0, 0, equipmentConditionId, equipmentCondition, "", false, false, true);

            }

            return;
        }

    });

    //end events for equipment condition

    //start events for requirement type

    $.each($('.chk_RequirementType'), function () {

        var bgColor = $(this).parent().css("background-color");
        $("#divRequirementType_obj").css("border-color", rgb2hex(bgColor));

        $(this).next().click(function () {

            //uncheck to check
            if ($(this).hasClass("icheck_custom_icon_uncheck")) {

                $(this).removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).prop('title', 'Delete');

                var currentId = $(this).prev().attr("id");
                
                if (!$("#tdStandardCondition").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdStandardCondition").show("slow");
                    $("#divStandardCondition_obj").css("border-color", rgb2hex(bgColor));

                }

                $('.chk_RequirementType').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(192);

                    }
                });

                //save data
                var requirementTypeId = currentId;
                var requirementType = $(this).parent().find('.labeltext').text();

                SaveChangesToRequirementDetailList(gPageMode, "requirementtype", requirementTypeId, requirementType, "", "", "", true, false, false);

                RefreshRequirementStandardCondition(currentId);

                return;

            }

            //check to uncheck
            if ($(this).hasClass("icheck_custom_icon_check")) {

                if (window.confirm('Are you sure you want to delete this?')) {

                    $(this).prop('title', 'Select');

                    if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {
                        $(this).parent().width(192);
                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');
                        $("#divStandardCondition_obj").empty();
                        $("#tdStandardCondition").hide("fast");
                    }

                    $(this).removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                    $(this).removeClass('icheck_active').addClass('icheck_notactive');

                    //save data
                    var requirementTypeId = $(this).prev().attr("id");
                    var requirementType = $(this).parent().find('.labeltext').text();;

                    SaveChangesToRequirementDetailList(gPageMode, "requirementtype", requirementTypeId, requirementType, "", "", "", false, false, true);
                    
                }

                return;

            }

        });

    });

    $('.chk_RequirementType').on('ifClicked', function (event) {

        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
            $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
            $(this).parent().width(220);

            $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
            $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

            var width = $(this).parent().width() + 20;
            $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

            $(this).parent().find('.activeIcon').prop('title', 'Delete');
            
            if (!$("#tdStandardCondition").is(":visible")) {

                var bgColor = $(this).parent().css("background-color");
                $("#tdStandardCondition").show("slow");
                $("#divStandardCondition_obj").css("border-color", rgb2hex(bgColor));

            }

            $('.chk_RequirementType').each(function () {

                if (currentId != $(this).attr("id")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                    $(this).parent().width(192);

                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');

                }
            });

            //save data
            var requirementTypeId = currentId;
            var requirementType = $(this).parent().find('.labeltext').text();

            SaveChangesToRequirementDetailList(gPageMode, "requirementtype", requirementTypeId, requirementType, "", "", "", true, false, false);

            RefreshRequirementStandardCondition(currentId);

            return;

        }

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $("#divStandardCondition_obj").empty();
                $("#tdStandardCondition").hide("fast");

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');
                $(this).parent().width(192);

            }
            else {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).parent().find('.activeIcon').prop('title', 'Delete');

                if (!$("#tdStandardCondition").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdStandardCondition").show("slow");
                    $("#divStandardCondition_obj").css("border-color", rgb2hex(bgColor));

                }

                $('.chk_RequirementType').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);

                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');
                    }
                });

                RefreshRequirementStandardCondition(currentId);

                
            }

            return;

        }

    });

    //end events for requirement type

    //$("#txt_New_TestSampleDetails_MinQty").spinner({ min: 1, max: 100 });
    //$("#txt_New_TestSampleDetails_IdealQty").spinner({ min: 1, max: 100 });
    //$("#txt_New_TestSampleDetails_NumberofSamples").spinner({ min: 1, max: 100 });

    $("#txt_New_TestSampleDetails_MinQty").val("1");
    $("#txt_New_TestSampleDetails_IdealQty").val("1");
    $("#txt_New_TestSampleDetails_NumberofSamples").val("1");
    Common_NumericFieldKeDown($("#txt_New_TestSampleDetails_MinQty"));
    Common_NumericFieldKeDown($("#txt_New_TestSampleDetails_IdealQty"));
    Common_NumericFieldKeDown($("#txt_New_TestSampleDetails_NumberofSamples"));

};

function PopulateSampleEquipmentList(callback) {

    var _url = 'api/equipment';

    Common_GetData(_url, function (items, err) {
        if (err == '') {

            if (items.length > 0) {

                $.each(items, function (index, value) {
                    
                    if (items[index].Container != null) {
                        equipmentList.push({ id: items[index].EquipmentID, name: items[index].Descriptor, unit: items[index].Container.CapacityUnit });
                    }
                    else {
                        equipmentList.push({ id: items[index].EquipmentID, name: items[index].Descriptor, unit: "" });
                    }
                    
                    var code = items[index].EquipmentID;
                    var desc = items[index].Descriptor;

                    var equipmentLi = "<li id='li_" + code + "' style='width: 210px;padding: 4px;' title='Start Sorting'><input class='iCheck chk_Equipment' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></li>";

                    $("#ul_equipment_obj").append(equipmentLi);
                });

            }

            callback('');

        }
        else {
            callback('Error Getting Equipment : ' + err);
        }
    });

};

function PopulateSampleDetailsandRequirementListData(callback) {

    Common_GetLookUpData('', '', function (items, err) {

        if (err == '') {

            var lookUpData = items;

            //populate sample type
            var sampleTypeData = jQuery.grep(lookUpData, function (element, index) {
                return (element.TableName == "TestSample" && element.FieldName == "SampleType");
            });

            
            if (sampleTypeData.length > 0) {

                $.each(sampleTypeData, function (index, value) {
                    var code = sampleTypeData[index].ValueCode;
                    var desc = sampleTypeData[index].ValueDescription;

                    var divSampTypeElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_sampleType' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                    $("#divSampleType_obj").append(divSampTypeElement);

                    //populate analysis sample type
                    var analysissampleTypeData = jQuery.grep(lookUpData, function (element, index) {
                        return (element.TableName == "TestSample" && element.FieldName == "AnalysisSampleType" && element.OwnerFieldName == "SampleType" && element.OwnerValue == code);
                    });

                    if (analysissampleTypeData.length > 0) {
                        var analysisSampeTypeDiv = "<div id='divAnalysisSampleType_" + code + "' style='display:none;margin-left:10px;'>";
                        $.each(analysissampleTypeData, function (index, value) {
                            var innercode = analysissampleTypeData[index].ValueCode;
                            var innerdesc = analysissampleTypeData[index].ValueDescription;
                            analysisSampeTypeDiv = analysisSampeTypeDiv + "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_AnalysisSampleType' type='checkbox' id='" + innercode + "'><label for='" + innercode + "'>" + innerdesc + "</label></div>";
                        });
                        analysisSampeTypeDiv = analysisSampeTypeDiv + "</div>";
                        $("#divSampleType_obj").append(analysisSampeTypeDiv);

                    }

                });

            }


            //populate sample application
            var sampleApplicationData = jQuery.grep(lookUpData, function (element, index) {
                return (element.TableName == "TestSample" && element.FieldName == "SampleSampClassRule");
            });

            if (sampleApplicationData.length > 0) {

                $.each(sampleApplicationData, function (index, value) {
                    var code = sampleApplicationData[index].ValueCode;
                    var desc = sampleApplicationData[index].ValueDescription;

                    var divSampApplicationElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_Application' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                    $("#divAnalysisSampleApplication_obj").append(divSampApplicationElement);

                });

            }

            //populate equipment condition
            var equipmentConditionData = jQuery.grep(lookUpData, function (element, index) {
                return (element.TableName == "SampleTransportCondition" && element.FieldName == "StandardCondition");
            });

            if (equipmentConditionData.length > 0) {

                $.each(equipmentConditionData, function (index, value) {
                    var code = equipmentConditionData[index].ValueCode;
                    var desc = equipmentConditionData[index].ValueDescription;

                    var divEquipmentConditionElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_EquipmentCondition' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                    $("#divequipmentcondition_obj").append(divEquipmentConditionElement);

                    if (desc.toLowerCase().indexOf("other") >= 0) {
                        $("#divequipmentcondition_obj").append("<div id='oc_text' style='display:none;padding-left:10px;'><textarea  id='oc_text_obj' type='text' class='form-control' rows='4' style='width:190px;' tabindex='4' /></div>");
                    };

                });

            }

            //populate requirement type
            var requirementTypeData = jQuery.grep(lookUpData, function (element, index) {
                return (element.TableName == "TestRequirement" && element.FieldName == "RequirementType");
            });

            if (requirementTypeData.length > 0) {

                $.each(requirementTypeData, function (index, value) {
                    var code = requirementTypeData[index].ValueCode;
                    var desc = requirementTypeData[index].ValueDescription;

                    var divRequirementTypeElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_RequirementType' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                    $("#divRequirementType_obj").append(divRequirementTypeElement);

                });

            }

            callback('');

        }
        else {
            callback(err);
        }
    });
};

function SetUpSampleDetailsandRequirementTypeSectionPosition(mode) {

    if (mode.toLowerCase() == "add") {

        //application
        $("#divAnalysisSampleApplication_label").css({
            "position": "absolute",
            "top": "28px",
            "left": "224px",
        });

        $("#divAnalysisSampleApplication_obj").css({
            "position": "absolute",
            "top": "48px",
            "left": "224px",
        });

        //equipment
        $("#divEquipment_label").css({
            "position": "absolute",
            "top": "28px",
            "left": "448px",
        });

        $("#divEquipment_obj").css({
            "position": "absolute",
            "top": "48px",
            "left": "448px",
        });

        //equipment condition
        $("#divEquipmentDetailsCondition_label").css({
            "position": "absolute",
            "top": "28px",
            "left": "672px",
        });

        $("#divEquipmentDetailsCondition").css({
            "position": "absolute",
            "top": "53px",
            "left": "672px",
        });

        //requirement type standard condition
        $("#divStandardCondition_label").css({
            "position": "absolute",
            "top": "28px",
            "left": "224px",
        });

        $("#divStandardCondition_obj").css({
            "position": "absolute",
            "top": "48px",
            "left": "224px",
        });

    }

    if (mode.toLowerCase() == "edit") {

        //application
        $("#divAnalysisSampleApplication_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divAnalysisSampleApplication_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

        //equipment
        $("#divEquipment_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "471px",
        });

        $("#divEquipment_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "471px",
        });

        //equipment condition
        $("#divEquipmentDetailsCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "690px",
        });
        
        $("#divEquipmentDetailsCondition").css({
            "position": "absolute",
            "top": "85px",
            "left": "690px",
        });


        //requirement type standard condition
        $("#divStandardCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divStandardCondition_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

    }

    if (mode.toLowerCase() == "view") {

        $("#divSampleType_label").html("Sample Type");

        //application
        $("#divAnalysisSampleApplication_label").html("Application");
        $("#divAnalysisSampleApplication_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divAnalysisSampleApplication_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

        //equipment
        $("#divEquipment_label").html("Equipment");
        $("#divEquipment_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "471px",
        });

        $("#divEquipment_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "471px",
        });

        //equipment condition
        $("#divEquipmentDetailsCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "690px",
        });

        $("#divEquipmentDetailsCondition").css({
            "position": "absolute",
            "top": "85px",
            "left": "690px",
        });

        $("#divRequirementType_label").html("Requirement Type");

        //requirement type standard condition
        $("#divStandardCondition_label").html("Standard Requirement");
        $("#divStandardCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divStandardCondition_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

    }

    if (mode.toLowerCase() == "summary") {

        $("#divSampleType_label").html("Sample Type");

        //application
        $("#divAnalysisSampleApplication_label").html("Application");
        $("#divAnalysisSampleApplication_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divAnalysisSampleApplication_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

        //equipment
        $("#divEquipment_label").html("Equipment");
        $("#divEquipment_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "471px",
        });

        $("#divEquipment_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "471px",
        });

        //equipment condition
        $("#divEquipmentDetailsCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "690px",
        });

        $("#divEquipmentDetailsCondition").css({
            "position": "absolute",
            "top": "85px",
            "left": "690px",
        });

        $("#divRequirementType_label").html("Requirement Type");

        //requirement type standard condition
        $("#divStandardCondition_label").html("Standard Requirement");
        $("#divStandardCondition_label").css({
            "position": "absolute",
            "top": "61px",
            "left": "248px",
        });

        $("#divStandardCondition_obj").css({
            "position": "absolute",
            "top": "81px",
            "left": "248px",
        });

    }


};

function DestroySampleDetailsandRequirementTypeObject() {

    $('.iCheck').each(function () {
        $(this).iCheck('destroy');
    });

    $("#divSampleType_obj").empty();
    $("#divAnalysisSampleApplication_obj").empty();
    $('#ul_equipment_obj').children().remove().end();
    $("#divequipmentcondition_obj").empty();
    $("#divRequirementType_obj").empty();
    $("#divStandardCondition_obj").empty();

};

function RefreshRequirementStandardCondition(ownerValue) {

    $('.chk_RequirementStandardCondition').each(function () {
        $(this).iCheck('destroy');
    });

    $("#divStandardCondition_obj").empty();

    Common_GetLookUpData("TestRequirement", "StandardRequirement", function (items, err) {

        var lookUpData = items;

        //populate requirementStandardCondition
        var requirementStandardConditionData = jQuery.grep(lookUpData, function (element, index) {
            return (element.OwnerFieldName == "RequirementType" && element.OwnerValue == ownerValue);
        });

        if (requirementStandardConditionData.length > 0) {

            $.each(requirementStandardConditionData, function (index, value) {

                var code = requirementStandardConditionData[index].ValueCode;
                var desc = requirementStandardConditionData[index].ValueDescription;

                var divRequirementStandardConditionElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck chk_RequirementStandardCondition' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                $("#divStandardCondition_obj").append(divRequirementStandardConditionElement);

                if (desc.toLowerCase().indexOf("other") >= 0) {
                    $("#divStandardCondition_obj").append("<div id='oc_condition_text' style='display:none;padding-left:10px;'><textarea  id='oc_condition_text_obj' type='text' class='form-control' rows='4' style='width:190px;' tabindex='4' /></div>");
                };

            });

            $('.chk_RequirementStandardCondition').each(function () {

                var self = $(this),
                  label = self.next(),
                  label_text = label.text();

                label.remove();
                self.iCheck({
                    checkboxClass: 'icheckbox_line-blue',
                    radioClass: 'iradio_line-blue',
                    insert: '<div class="icheck_custom_icon icheck_custom_icon_uncheck icheck_notactive"></div><span class="labeltext">' + label_text + '</span>'
                });
            });

            BindRequirementDetailsIfExist("standardrequirement");

            $('.chk_RequirementStandardCondition').on('ifClicked', function (event) {

                var currentId = this.id;


                if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                    if (currentId.toLowerCase().indexOf("other") >= 0) {
                        $("#oc_condition_text").show('slow');
                        AttachEventToRequirementSpecialCondition();
                    }

                    //save data

                    var requirementTypeId = "";

                    $('.chk_RequirementType').each(function () {

                        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                            requirementTypeId = $(this).attr("id");
                        }

                    });

                    var standardRequirementId = currentId;
                    var standardRequirement = $(this).parent().find('.labeltext').text();

                    SaveChangesToRequirementDetailList(gPageMode, "standardrequirement", requirementTypeId, "", standardRequirementId, standardRequirement, "", true, false, false);

                    return;

                }

                if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                    if (window.confirm('Are you sure you want to delete this?')) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');

                        if (currentId.toLowerCase().indexOf("other") >= 0) {
                            $("#oc_condition_text").val("");
                            $("#oc_condition_text").hide('slow');
                        }

                        //save data

                        var requirementTypeId = "";

                        $('.chk_RequirementType').each(function () {

                            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                                requirementTypeId = $(this).attr("id");
                            }

                        });

                        var standardRequirementId = currentId;
                        var standardRequirement = $(this).parent().find('.labeltext').text();

                        SaveChangesToRequirementDetailList(gPageMode, "standardrequirement", requirementTypeId, "", standardRequirementId, standardRequirement, "", false, false, true);

                    }

                    return;
                }

            });

        }

    });

};

function SaveChangesToSampleDetailList(pagemode, mode, sampleTypeId, sampleType, analysisSampleType, analysisSampleTypeId, applicationId, application, equipmentId, equipment, numberofSamples, equipmentUnit, minQty, idealQty, equipmentConditionId, equipmentCondition, equipmentSpecialCondition, isAdded, isModified, isDeleted ) {
    
    // start sample type
    if (mode.toLowerCase() == "sampletype") {

        if (isAdded) {

            var sampleTypeExist = false;

            $.each(TestSampleDetailsList, function (i, val) {
                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {
                    sampleTypeExist = true;
                    TestSampleDetailsList[i].IsDeleted = false;
                    if (pagemode.toLowerCase() == "add") {
                        TestSampleDetailsList[i].IsAdded = true;
                        TestSampleDetailsList[i].IsModified = false;
                    }
                    if (pagemode.toLowerCase() == "edit") {
                        TestSampleDetailsList[i].IsAdded = false;
                        TestSampleDetailsList[i].IsModified = true;
                    }
                    
                }
            });

            if (!sampleTypeExist) {
                TestSampleDetailsList.push({ SampleTypeId: sampleTypeId, SampleType: sampleType, AnalysisSampleTypeId: analysisSampleTypeId, AnalysisSampleType: analysisSampleType, application: null, IsDeleted: false, IsAdded: isAdded, IsModified: false });
            }

        }

        if (isDeleted) {

            $.each(TestSampleDetailsList, function (i, val) {
                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {
                    TestSampleDetailsList[i].IsDeleted = true;
                    TestSampleDetailsList[i].IsAdded = false;
                    TestSampleDetailsList[i].IsModified = false;
                }
            });
        }
    }
    // end sample type

    // start sample type
    if (mode.toLowerCase() == "analysissampletype") {

        $.each(TestSampleDetailsList, function (i, val) {
            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {
                TestSampleDetailsList[i].AnalysisSampleTypeId = analysisSampleTypeId;
                TestSampleDetailsList[i].AnalysisSampleType = analysisSampleType;
            }
        });

        
    }
    // end sample type

    //start sample application
    if (mode.toLowerCase() == "application") {

        var applicationList = [];

        if (isAdded) {

            $.each(TestSampleDetailsList, function (i, val) {

                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                    var applicationExist = false;

                    applicationList = TestSampleDetailsList[i].application;

                    if (applicationList != null) {

                        $.each(applicationList, function (iApplication, val) {

                            if (applicationList[iApplication].SampleApplicationId == applicationId) {

                                applicationExist = true;
                                applicationList[iApplication].IsDeleted = false;
                                if (pagemode.toLowerCase() == "add") {
                                    applicationList[iApplication].IsAdded = true;
                                    applicationList[iApplication].IsModified = false;
                                }
                                if (pagemode.toLowerCase() == "edit") {
                                    applicationList[iApplication].IsAdded = false;
                                    applicationList[iApplication].IsModified = true;
                                }

                            }

                        });
                    }
                    else {
                        applicationList = [];
                    }

                    if (!applicationExist) {
                        applicationList.push({ SampleApplicationId: applicationId, SampleApplication: application, equipment: null, IsDeleted: false, IsAdded: isAdded, IsModified: false });
                    }
                    
                    TestSampleDetailsList[i].application = applicationList;
                    
                }
            });
        
        }

        if (isDeleted) {

            $.each(TestSampleDetailsList, function (i, val) {

                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {
                    
                    $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                        if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                            TestSampleDetailsList[i].application[iApplication].IsDeleted = true;
                            TestSampleDetailsList[i].application[iApplication].IsAdded = false;
                            TestSampleDetailsList[i].application[iApplication].IsModified = false;

                        }

                    });
                }

            });
        }

    }
    //end sample application

    // start sample equipment
    if (mode.toLowerCase() == "equipment") {

        var equipmentList = [];

        if (isAdded) {

            $.each(TestSampleDetailsList, function (i, val) {

                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                    $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                        if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                            equipmentList = TestSampleDetailsList[i].application[iApplication].equipment;

                            var equipmentExist = false;

                            if (equipmentList != null) {

                                $.each(equipmentList, function (iEqpt, val) {

                                    if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                        equipmentExist = true;
                                        equipmentList[iEqpt].IsDeleted = false;
                                        if (pagemode.toLowerCase() == "add") {
                                            equipmentList[iEqpt].IsAdded = true;
                                            equipmentList[iEqpt].IsModified = false;
                                        }
                                        if (pagemode.toLowerCase() == "edit") {
                                            equipmentList[iEqpt].IsAdded = false;
                                            equipmentList[iEqpt].IsModified = true;
                                        }

                                    }

                                });
                            }
                            else {
                                equipmentList = [];
                            }
                            

                            if (!equipmentExist) {
                                equipmentList.push({ EquipmentId: equipmentId, Equipment: equipment, Unit: equipmentUnit, NumberofSamples: numberofSamples, MinQty: minQty, IdealQty: idealQty, condition: null, IsDeleted: false, IsAdded: isAdded, IsModified: false });
                            }
                            
                            TestSampleDetailsList[i].application[iApplication].equipment = equipmentList;
                            
                        }

                    });
                }

            });


        
        }

        if (isDeleted) {

            $.each(TestSampleDetailsList, function (i, val) {

                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                    $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                        $.each(TestSampleDetailsList[i].application[iApplication].equipment, function (iEquipment, val) {

                            if (TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].EquipmentId == equipmentId) {

                                TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].IsDeleted = true;
                                TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].IsAdded = false;
                                TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].IsModified = false;

                            }

                        });

                    });
                }

            });

        }

    }

    // end sample equipment

    //start equipment details - number of samples

    if (mode.toLowerCase() == "equipmentdetails_numberofsamples") {

        var equipmentList = [];

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                    if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                        equipmentList = TestSampleDetailsList[i].application[iApplication].equipment;

                        $.each(equipmentList, function (iEqpt, val) {

                            if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                equipmentList[iEqpt].NumberofSamples = numberofSamples;
                                
                                if (pagemode.toLowerCase() == "edit") {
                                    equipmentList[iEqpt].IsModified = true;
                                }

                            }

                        });

                        TestSampleDetailsList[i].application[iApplication].equipment = equipmentList;

                    }

                });
            }

        });

    }

    //end equipment details - number of samples

    //start equipment details - min qty

    if (mode.toLowerCase() == "equipmentdetails_minqty") {

        var equipmentList = [];

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                    if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                        equipmentList = TestSampleDetailsList[i].application[iApplication].equipment;

                        $.each(equipmentList, function (iEqpt, val) {

                            if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                equipmentList[iEqpt].MinQty = minQty;

                                if (pagemode.toLowerCase() == "edit") {
                                    equipmentList[iEqpt].IsModified = true;
                                }

                            }

                        });

                        TestSampleDetailsList[i].application[iApplication].equipment = equipmentList;

                    }

                });
            }

        });
        
    }

    //end equipment details - min qty

    //start equipment details - ideal qty

    if (mode.toLowerCase() == "equipmentdetails_idealqty") {

        var equipmentList = [];

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                    if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                        equipmentList = TestSampleDetailsList[i].application[iApplication].equipment;

                        $.each(equipmentList, function (iEqpt, val) {

                            if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                equipmentList[iEqpt].IdealQty = idealQty;

                                if (pagemode.toLowerCase() == "edit") {
                                    equipmentList[iEqpt].IsModified = true;
                                }

                            }

                        });

                        TestSampleDetailsList[i].application[iApplication].equipment = equipmentList;

                    }

                });
            }

        });
    }

    //end equipment details - ideal qty

    //start equipment conditions

    if (mode.toLowerCase() == "equipmentconditions") {

        var equipmentConditionList = [];

        if (isAdded) {

            $.each(TestSampleDetailsList, function (i, val) {

                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                    $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                        if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                            $.each(TestSampleDetailsList[i].application[iApplication].equipment, function (iEqpt, val) {

                                if (TestSampleDetailsList[i].application[iApplication].equipment[iEqpt].EquipmentId == equipmentId) {

                                    equipmentConditionList = TestSampleDetailsList[i].application[iApplication].equipment[iEqpt].condition;

                                    var equipmentConditionExist = false;

                                    if (equipmentConditionList != null) {

                                        $.each(equipmentConditionList, function (iEqptCondition, val) {

                                            if (equipmentConditionList[iEqptCondition].StandardConditionId == equipmentConditionId) {
                                                equipmentConditionExist = true;

                                                equipmentConditionExist[iEqptCondition].IsDeleted = false;
                                                if (pagemode.toLowerCase() == "add") {
                                                    equipmentConditionList[iEqptCondition].IsAdded = true;
                                                    equipmentConditionList[iEqptCondition].IsModified = false;
                                                }
                                                if (pagemode.toLowerCase() == "edit") {
                                                    equipmentConditionList[iEqptCondition].IsAdded = false;
                                                    equipmentConditionList[iEqptCondition].IsModified = true;
                                                }
                                            }

                                        });
                                    }
                                    else {
                                        equipmentConditionList = [];
                                    }
                                    
                                    if (!equipmentConditionExist) {
                                        equipmentConditionList.push({ StandardConditionId: equipmentConditionId, StandardCondition: equipmentCondition, SpecialCondition: equipmentSpecialCondition, IsDeleted: false, IsAdded: isAdded, IsModified: false });
                                        
                                    }

                                    TestSampleDetailsList[i].application[iApplication].equipment[iEqpt].condition = equipmentConditionList;

                                    if (pagemode.toLowerCase() == "edit") {
                                        TestSampleDetailsList[i].application[iApplication].equipment[iEqpt].IsModified = true;
                                    }
                                }

                            });
                         }

                    });
                }

            });

        }

        if (isDeleted) {
            
            $.each(TestSampleDetailsList, function (i, val) {
                
                if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {
                    
                    $.each(TestSampleDetailsList[i].application, function (iApplication, val) {
                        
                        if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {
                            
                            $.each(TestSampleDetailsList[i].application[iApplication].equipment, function (iEquipment, val) {
                                
                                if (TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].EquipmentId == equipmentId) {
                                    
                                    $.each(TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition, function (iEqptCondition, val) {
                                        
                                        if (TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].StandardConditionId == equipmentConditionId) {
                                            
                                            TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].IsDeleted = true;
                                            TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].IsAdded = false;
                                            TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].IsModified = false;
                                            if (pagemode.toLowerCase() == "edit") {
                                                TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].IsModified = true;
                                            }

                                        }

                                    });

                                }
                            });
                        }
                    });
                }

            });

        }

    }

    //end equipment conditions

    //start equipment special conditions

    if (mode.toLowerCase() == "equipmentspecialconditions") {

        $.each(TestSampleDetailsList, function (i, val) {
            
            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                $.each(TestSampleDetailsList[i].application, function (iApplication, val) {

                    if (TestSampleDetailsList[i].application[iApplication].SampleApplicationId == applicationId) {

                        $.each(TestSampleDetailsList[i].application[iApplication].equipment, function (iEquipment, val) {

                            if (TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].EquipmentId == equipmentId) {

                                $.each(TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition, function (iEqptCondition, val) {

                                    if (TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].StandardCondition.toLowerCase().indexOf("other") >= 0) {
                                        
                                        TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].SpecialCondition = equipmentSpecialCondition;

                                        if (pagemode.toLowerCase() == "edit") {
                                            TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].condition[iEqptCondition].IsModified = true;
                                            TestSampleDetailsList[i].application[iApplication].equipment[iEquipment].IsModified = true;
                                        }
                                    }

                                });

                            }
                        });
                    }
                });
            }

        });

    }

    //end equipment special conditions
    
};

function SaveChangesToRequirementDetailList(pagemode, mode, requiremenTypeId, requirementType, standardRequirementId, standardRequirement, requirementDescription, isAdded, isModified, isDeleted) {

    // start requirement type
    if (mode.toLowerCase() == "requirementtype") {

        if (isAdded) {

            var requirementTypeExist = false;

            $.each(TestRequirementDetails, function (i, val) {
                if (TestRequirementDetails[i].RequirementTypeId == requiremenTypeId) {
                    requirementTypeExist = true;
                    TestRequirementDetails[i].IsDeleted = false;
                    if (pagemode.toLowerCase() == "add") {
                        TestRequirementDetails[i].IsAdded = true;
                        TestRequirementDetails[i].IsModified = false;
                    }
                    if (pagemode.toLowerCase() == "edit") {
                        TestSampleDetailsList[i].IsAdded = false;
                        TestRequirementDetails[i].IsModified = true;
                    }

                }
            });

            if (!requirementTypeExist) {
                TestRequirementDetails.push({ RequirementTypeId: requiremenTypeId, RequirementType: requirementType, StandardRequirement: null, IsDeleted: false, IsAdded: isAdded, IsModified: false });
            }

        }

        if (isDeleted) {

            $.each(TestRequirementDetails, function (i, val) {
                if (TestRequirementDetails[i].RequirementTypeId == requiremenTypeId) {
                    TestRequirementDetails[i].IsDeleted = true;
                    TestRequirementDetails[i].IsAdded = false;
                    TestRequirementDetails[i].IsModified = false;
                }
            });
        }
    }
    // end requirement type

    //start standard requirement

    if (mode.toLowerCase() == "standardrequirement") {

        if (isAdded) {

            $.each(TestRequirementDetails, function (i, val) {

                if (TestRequirementDetails[i].RequirementTypeId == requiremenTypeId) {

                    var standardrequirement = TestRequirementDetails[i].StandardRequirement;
                    var standardrequirementExist = false;

                    if (standardrequirement != null) {

                        $.each(standardrequirement, function (index, val) {

                            if (standardrequirement[index].StandardConditionId == standardRequirementId) {
                                standardrequirementExist = true;

                                standardrequirement[index].IsDeleted = false;
                                if (pagemode.toLowerCase() == "add") {
                                    standardrequirement[index].IsAdded = true;
                                    standardrequirement[index].IsModified = false;
                                }
                                if (pagemode.toLowerCase() == "edit") {
                                    standardrequirement[index].IsAdded = false;
                                    standardrequirement[index].IsModified = true;
                                }
                            }

                        });
                    }
                    else {
                        standardrequirement = [];
                    }

                    if (!standardrequirementExist) {
                        standardrequirement.push({ StandardRequirementId: standardRequirementId, StandardRequirement: standardRequirement, RequirementDescription: "", IsDeleted: false, IsAdded: isAdded, IsModified: false });

                    }

                    TestRequirementDetails[i].StandardRequirement = standardrequirement;

                }
            });

        }

        if (isDeleted) {

            $.each(TestRequirementDetails, function (i, val) {

                if (TestRequirementDetails[i].RequirementTypeId == requiremenTypeId) {

                    $.each(TestRequirementDetails[i].StandardRequirement, function (index, val) {

                        if (TestRequirementDetails[i].StandardRequirement[index].StandardRequirementId == standardRequirementId) {

                            TestRequirementDetails[i].StandardRequirement[index].IsDeleted = true;
                            TestRequirementDetails[i].StandardRequirement[index].IsAdded = false;
                            TestRequirementDetails[i].StandardRequirement[index].IsModified = false;
                            
                        }

                    });
                
                }
            });

        }

    }

    //end standard requirement

    //start requirement description

    if (mode.toLowerCase() == "requirementdescription") {

        $.each(TestRequirementDetails, function (i, val) {

            if (TestRequirementDetails[i].RequirementTypeId == requiremenTypeId) {

                $.each(TestRequirementDetails[i].StandardRequirement, function (index, val) {

                    if (TestRequirementDetails[i].StandardRequirement[index].StandardRequirement.toLowerCase().indexOf("other") >= 0) {

                        TestRequirementDetails[i].StandardRequirement[index].RequirementDescription = requirementDescription;
                        TestRequirementDetails[i].StandardRequirement[index].IsModified = true;
                    }
                });

            }
        });
        
    }

    //end requirement description

};

function ClearSelectedSampleDetails(mode) {

    if (mode.toLowerCase() == "application") {

        $.each($('.chk_Application'), function () {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().width(190);

                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');
            }

        });
    }

    if (mode.toLowerCase() == "equipment") {

        $.each($('.chk_Equipment'), function () {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().width(190);

                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');
            }

        });

    }

    if (mode.toLowerCase() == "equipmentdetailscondition") {

        $("#txt_New_TestSampleDetails_NumberofSamples").val("");
        $("#txt_New_TestSampleDetails_MinQty").val("");
        $("#txt_New_TestSampleDetails_IdealQty").val("");

        $.each($('.chk_EquipmentCondition'), function () {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
            
        });

        $("#oc_text_obj").val("");


    }
};

function BindSampleDetailsDataIfExist(mode) {

    var sampleTypeId = "";
    var applicationId = "";
    var equipmentId = "";

    $('.chk_sampleType').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            sampleTypeId = $(this).attr("id");
        }

    });

    $('.chk_Application').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            applicationId = $(this).attr("id");
        }

    });

    $('.chk_Equipment').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            equipmentId = $(this).attr("id");
        }

    });

    if (mode.toLowerCase() == "sampletype") {

        $.each(TestSampleDetailsList, function (i, val) {

            $('.chk_sampleType').each(function () {

                if (TestSampleDetailsList[i].SampleTypeId == $(this).attr("id")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');

                    if (TestSampleDetailsList[i].AnalysisSampleTypeId != null) {

                        if (TestSampleDetailsList[i].AnalysisSampleTypeId != '') {

                            var analysisSampleTypeDiv = "divAnalysisSampleType_" + TestSampleDetailsList[i].SampleTypeId;
                            $("#" + analysisSampleTypeDiv).show('fast');

                            $("#" + analysisSampleTypeDiv + " .chk_AnalysisSampleType").each(function () {
                                if ($(this).attr("id") == TestSampleDetailsList[i].AnalysisSampleTypeId) {
                                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                                    $(this).iCheck('check');
                                    $(this).iCheck('update');
                                }
                            });

                        }
                    }

                }

            });

        });

    }

    if (mode.toLowerCase() == "application") {
                
        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            $.each($('.chk_Application'), function () {
                                if ($(this).attr("id") == applicationList[iApplication].SampleApplicationId) {
                                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                                }

                            });

                        }

                    });
                }

            }
        });

    }

    if (mode.toLowerCase() == "equipment") {

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                var applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            if (applicationList[iApplication].SampleApplicationId == applicationId) {

                                var equipmentList = applicationList[iApplication].equipment;

                                if (equipmentList != null) {

                                    $.each(equipmentList, function (iEqpt, val) {

                                        if (!equipmentList[iEqpt].IsDeleted) {

                                            $('.chk_Equipment').each(function () {

                                                if ($(this).attr("id") == equipmentList[iEqpt].EquipmentId) {
                                                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                                                }

                                            });

                                        }
                                    });
                                }
                                
                            }   
                        }

                    });
                }

            }
        });

    }

    if (mode.toLowerCase() == "equipmentdetailscondition") {

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                var applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            if (applicationList[iApplication].SampleApplicationId == applicationId) {

                                var equipmentList = applicationList[iApplication].equipment;

                                if (equipmentList != null) {

                                    $.each(equipmentList, function (iEqpt, val) {

                                        if (!equipmentList[iEqpt].IsDeleted) {

                                            if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                                $("#txt_New_TestSampleDetails_NumberofSamples").val(equipmentList[iEqpt].NumberofSamples);
                                                $("#txt_New_TestSampleDetails_MinQty").val(equipmentList[iEqpt].MinQty);
                                                $("#txt_New_TestSampleDetails_IdealQty").val(equipmentList[iEqpt].IdealQty);

                                                var equipmentConditionList = equipmentList[iEqpt].condition;

                                                if (equipmentConditionList != null) {

                                                    $.each(equipmentConditionList, function (iEqptCond, val) {

                                                        if (!equipmentConditionList[iEqptCond].IsDeleted) {

                                                            $('.chk_EquipmentCondition').each(function () {

                                                                if ($(this).attr("id") == equipmentConditionList[iEqptCond].StandardConditionId) {
                                                                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');


                                                                    if (equipmentConditionList[iEqptCond].StandardCondition.toLowerCase().indexOf("other") >= 0) {

                                                                        $("#oc_text_obj").val(equipmentConditionList[iEqptCond].SpecialCondition);
                                                                        $("#oc_text").show('slow');
                                                                        AttachEventToEquipmentSpecialCondition();

                                                                    }
                                                                }

                                                            });

                                                        }

                                                    });

                                                }
                                                
                                            }

                                        }
                                    });
                                }

                            }
                        }

                    });
                }

            }
        });

    }

};

function BindRequirementDetailsIfExist(mode) {

    var requirementTypeId = "";
    
    $('.chk_RequirementType').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            requirementTypeId = $(this).attr("id");
        }

    });

    if (mode.toLowerCase() == "requirementtype") {

        $.each(TestRequirementDetails, function (i, val) {

            $('.chk_RequirementType').each(function () {

                if (TestRequirementDetails[i].RequirementTypeId == $(this).attr("id")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                    
                }

            });

        });


    }

    if (mode.toLowerCase() == "standardrequirement") {

        $.each(TestRequirementDetails, function (i, val) {

            if (!TestRequirementDetails[i].IsDeleted) {
                if (TestRequirementDetails[i].RequirementTypeId == requirementTypeId) {
                    var standardrequirements = TestRequirementDetails[i].StandardRequirement;

                    if (standardrequirements != null) {

                        $.each(standardrequirements, function (ctr, val) {
                            
                            if (!standardrequirements[ctr].IsDeleted) {
                                
                                $('.chk_RequirementStandardCondition').each(function () {
                                    
                                    if ($(this).attr("id") == standardrequirements[ctr].StandardRequirementId) {

                                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');

                                        if (standardrequirements[ctr].StandardRequirement.toLowerCase().indexOf("other") >= 0) {

                                            $("#oc_condition_text_obj").val(standardrequirements[ctr].RequirementDescription);
                                            $("#oc_condition_text").show('slow');
                                            AttachEventToRequirementSpecialCondition();

                                        }
                                    }

                                });

                            }

                        });



                    }
                }
            }
            
        });
            
    }


};

function AttachEventToEquipmentDetailsTextBox() {

    $("#txt_New_TestSampleDetails_NumberofSamples").keyup(function () {

        var sampleTypeId = "";
        var applicationId = "";
        var equipmentId = "";
        var numberofSamples = $(this).val();
        
        $('.chk_sampleType').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                sampleTypeId = $(this).attr("id");
            }

        });

        $('.chk_Application').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                applicationId = $(this).attr("id");
            }

        });

        $('.chk_Equipment').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                equipmentId = $(this).attr("id");
            }

        });

        SaveChangesToSampleDetailList(gPageMode, "equipmentdetails_numberofsamples", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", numberofSamples, "", 0, 0, "", "", "", false, true, false);

    });

    $("#txt_New_TestSampleDetails_MinQty").keyup(function () {
        
        var sampleTypeId = "";
        var applicationId = "";
        var equipmentId = "";
        var minqty = $(this).val();

        $('.chk_sampleType').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                sampleTypeId = $(this).attr("id");
            }

        });

        $('.chk_Application').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                applicationId = $(this).attr("id");
            }

        });

        $('.chk_Equipment').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                equipmentId = $(this).attr("id");
            }

        });

        SaveChangesToSampleDetailList(gPageMode, "equipmentdetails_minqty", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", 0, "", minqty, 0, "", "", "", false, true, false);

    });

    $("#txt_New_TestSampleDetails_IdealQty").keyup(function () {
        
        var sampleTypeId = "";
        var applicationId = "";
        var equipmentId = "";
        var idealqty = $(this).val();

        $('.chk_sampleType').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                sampleTypeId = $(this).attr("id");
            }

        });

        $('.chk_Application').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                applicationId = $(this).attr("id");
            }

        });

        $('.chk_Equipment').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                equipmentId = $(this).attr("id");
            }

        });

        SaveChangesToSampleDetailList(gPageMode, "equipmentdetails_idealqty", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", 0, "", 0, idealqty, "", "", "", false, true, false);

    });

};

function AttachEventToEquipmentSpecialCondition() {

    $("#oc_text_obj").bind("keyup", function () {

        var sampleTypeId = "";
        var applicationId = "";
        var equipmentId = "";
        var specialcondition = $(this).val();

        $('.chk_sampleType').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                sampleTypeId = $(this).attr("id");
            }

        });

        $('.chk_Application').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                applicationId = $(this).attr("id");
            }

        });

        $('.chk_Equipment').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                equipmentId = $(this).attr("id");
            }

        });
        
        SaveChangesToSampleDetailList(gPageMode, "equipmentspecialconditions", sampleTypeId, "", "", "", applicationId, "", equipmentId, "", 0, "", 0, 0, "", "", specialcondition, false, true, false);

    });

};

function AttachEventToRequirementSpecialCondition() {

    $("#oc_condition_text_obj").bind("keyup", function () {

        var requirementTypeId = "";
        var requirementdescription = $(this).val();
        
        $('.chk_RequirementType').each(function () {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
                requirementTypeId = $(this).attr("id");
            }

        });

        SaveChangesToRequirementDetailList(gPageMode, "requirementdescription", requirementTypeId, "", "", "", requirementdescription, false, true, true);

    });

};

function ShowUnit(equipmentid) {
    
    $("#txt_New_TestSampleDetails_MinQty_Unit").text("");
    $("#txt_New_TestSampleDetails_IdealQty_Unit").text("");

    var equipmentListUnit = jQuery.grep(equipmentList, function (element, index) {
        return (element.id == equipmentid);
    });

    if (equipmentListUnit != null) {
        if (equipmentListUnit.length > 0) {
            $.each(equipmentListUnit, function (i, val) {
                if (equipmentListUnit[i].unit != null) {
                    $("#txt_New_TestSampleDetails_MinQty_Unit").text(equipmentListUnit[i].unit);
                    $("#txt_New_TestSampleDetails_IdealQty_Unit").text(equipmentListUnit[i].unit);
                }
            });
        }
    }
};

//start for summary and view

function PopulateSampleTypeforViewing() {

    $.each(TestSampleDetailsList, function (i, val) {

        var code = TestSampleDetailsList[i].SampleTypeId;
        var desc = TestSampleDetailsList[i].SampleType;

        var divSampTypeElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_sampleType_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

        $("#divSampleType_obj_Summary").append(divSampTypeElement);

        //populate analysis sample type
        var analysissampleTypeData = jQuery.grep(lookUpData, function (element, index) {
            return (element.TableName == "TestSample" && element.FieldName == "AnalysisSampleType" && element.OwnerFieldName == "SampleType" && element.OwnerValue == code);
        });

        if (TestSampleDetailsList[i].AnalysisSampleTypeId != null) {
            if (TestSampleDetailsList[i].AnalysisSampleTypeId != "") {
                var analysisSampeTypeDiv = "<div id='divAnalysisSampleType_Summary_" + code + "' style='display:none;margin-left:10px;'>";
                var innercode = TestSampleDetailsList[i].AnalysisSampleTypeId;
                var innerdesc = TestSampleDetailsList[i].AnalysisSampleType;
                analysisSampeTypeDiv = analysisSampeTypeDiv + "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_AnalysisSampleType_Summary' type='checkbox' id='" + innercode + "'><label for='" + innercode + "'>" + innerdesc + "</label></div>";
                analysisSampeTypeDiv = analysisSampeTypeDiv + "</div>";
                $("#divSampleType_obj_Summary").append(analysisSampeTypeDiv);
                $("#divAnalysisSampleType_Summary_" + code).show("fast");
            }
        }

    });

    $('.chk_sampleType_Summary').each(function () {

        var self = $(this),
          label = self.next(),
          label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-blue',
            radioClass: 'iradio_line-blue',
            insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
        });
    });

    $('.chk_AnalysisSampleType_Summary').each(function () {

        var self = $(this),
          label = self.next(),
          label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-blue',
            radioClass: 'iradio_line-blue',
            insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
        });
    });


    //start events for sample type

    $.each($('.chk_sampleType_Summary'), function () {

        var bgColor = $(this).parent().css("background-color");
        $("#divSampleType_obj_Summary").css("border-color", rgb2hex(bgColor));

    });
    
    $('.chk_sampleType_Summary').on('ifClicked', function (event) {

        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().width(190);

                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');

                $("#tdAnalysisSampleApplication_Summary").hide("fast");

                $("#tdEquipment_Summary").hide("fast");

                $("#tdEquipmentDetailsCondition_Summary").hide("fast");

                ClearSelectedSampleDetailsForViewing("application");
                ClearSelectedSampleDetailsForViewing("equipment");
                ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");

            }
            else {

                $(this).parent().width(220);
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                if (!$("#tdAnalysisSampleApplication_Summary").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdAnalysisSampleApplication_Summary").show("slow");
                    $("#divAnalysisSampleApplication_obj_Summary").css("border-color", rgb2hex(bgColor));
                }

                $("#tdEquipment_Summary").hide("fast");

                $("#tdEquipmentDetailsCondition_Summary").hide("fast");

                ClearSelectedSampleDetailsForViewing("application");
                ClearSelectedSampleDetailsForViewing("equipment");
                ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");

                $('.chk_sampleType_Summary').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);
                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');

                    }
                });

                BindSampleDetailsDataIfExistForViewing("application");

            }

            return;

        }

    });

    //end events for sample type

};

function PopulateRequirementTypeForViewing() {

    $.each(TestRequirementDetails, function (i, val) {

        var code = TestRequirementDetails[i].RequirementTypeId;
        var desc = TestRequirementDetails[i].RequirementType;

        var divRequirementTypeElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_RequirementType_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

        $("#divRequirementType_obj_Summary").append(divRequirementTypeElement);

    });

    $('.chk_RequirementType_Summary').each(function () {

        var self = $(this),
          label = self.next(),
          label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-blue',
            radioClass: 'iradio_line-blue',
            insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
        });
    });

    //start events for requirement type

    $.each($('.chk_RequirementType_Summary'), function () {

        var bgColor = $(this).parent().css("background-color");
        $("#divRequirementType_obj_Summary").css("border-color", rgb2hex(bgColor));

    });

    $('.chk_RequirementType_Summary').on('ifClicked', function (event) {

        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $("#divStandardCondition_obj_Summary").empty();
                $("#tdStandardCondition_Summary").hide("fast");

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');
                $(this).parent().width(192);

            }
            else {

                $(this).parent().width(250);
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                $("#divStandardCondition_obj_Summary").empty();

                if (!$("#tdStandardCondition_Summary").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdStandardCondition_Summary").show("slow");
                    $("#divStandardCondition_obj_Summary").css("border-color", rgb2hex(bgColor));

                }

                $('.chk_RequirementType_Summary').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);
                    }
                });

                BindRequirementTypeDataIfExistForViewing();

            }

            return;

        }

    });

};

function ClearSelectedSampleDetailsForViewing(mode) {
        
    if (mode.toLowerCase() == "application") {

        $("#divAnalysisSampleApplication_obj_Summary").empty();
    }

    if (mode.toLowerCase() == "equipment") {

        $('#ul_equipment_obj_Summary').children().remove().end();

    }

    if (mode.toLowerCase() == "equipmentdetailscondition") {

        $("#txt_New_TestSampleDetails_NumberofSamples_Summary").val("");
        $("#txt_New_TestSampleDetails_MinQty_Summary").val("");
        $("#txt_New_TestSampleDetails_IdealQty_Summary").val("");
        $("#oc_text_obj").val("");
        $("#divequipmentcondition_obj_Summary").empty();
        
    }
};

function BindSampleDetailsDataIfExistForViewing(mode) {

    var sampleTypeId = "";
    var applicationId = "";
    var equipmentId = "";

    $('.chk_sampleType_Summary').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            sampleTypeId = $(this).attr("id");
        }

    });

    $('.chk_Application_Summary').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            applicationId = $(this).attr("id");
        }

    });

    $('.chk_Equipment_Summary').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            equipmentId = $(this).attr("id");
        }

    });

    if (mode.toLowerCase() == "application") {

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            var code = applicationList[iApplication].SampleApplicationId;
                            var desc = applicationList[iApplication].SampleApplication;

                            var divSampApplicationElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_Application_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                            $("#divAnalysisSampleApplication_obj_Summary").append(divSampApplicationElement);
                        }

                    });
                }

            }
        });

        $('.chk_Application_Summary').each(function () {

            var self = $(this),
              label = self.next(),
              label_text = label.text();

            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_line-blue',
                radioClass: 'iradio_line-blue',
                insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
            });
        });

        //start events for sample application

        $('.chk_Application_Summary').on('ifClicked', function (event) {

            var currentId = this.id;

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().width(190);

                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');

                    $("#tdEquipment_Summary").hide("fast");

                    $("#tdEquipmentDetailsCondition_Summary").hide("fast");

                    ClearSelectedSampleDetailsForViewing("equipment");
                    ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");

                }
                else {

                    $(this).parent().width(220);
                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                    $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                    var width = $(this).parent().width() + 20;
                    $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                    if (!$("#tdEquipment_Summary").is(":visible")) {

                        var bgColor = $(this).parent().css("background-color");
                        $("#tdEquipment_Summary").show("slow");
                        $("#divEquipment_obj_Summary").css("border-color", rgb2hex(bgColor));
                    }

                    $("#tdEquipmentDetailsCondition_Summary").hide("fast");

                    ClearSelectedSampleDetailsForViewing("equipment");
                    ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");

                    $('.chk_Application_Summary').each(function () {
                        if (currentId != $(this).attr("id")) {

                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                            $(this).parent().width(190);

                            $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                            $(this).parent().find('.activeIcon').css("background-image", "none");
                            $(this).parent().find('.activeIcon').css("margin-left", '0px');

                        }
                    });

                    BindSampleDetailsDataIfExistForViewing("equipment");

                }

                return;

            }
        });

        //end events for sample application


    }

    if (mode.toLowerCase() == "equipment") {

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                var applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            if (applicationList[iApplication].SampleApplicationId == applicationId) {

                                var equipmentList = applicationList[iApplication].equipment;

                                if (equipmentList != null) {

                                    $.each(equipmentList, function (iEqpt, val) {

                                        if (!equipmentList[iEqpt].IsDeleted) {

                                            var code = equipmentList[iEqpt].EquipmentId;
                                            var desc = equipmentList[iEqpt].Equipment;

                                            var equipmentLi = "<li id='li_" + code + "' style='width: 210px;padding: 4px;'><input class='iCheckSummary chk_Equipment_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></li>";

                                            $("#ul_equipment_obj_Summary").append(equipmentLi);
                                            
                                        }
                                    });
                                }

                            }
                        }

                    });
                }

            }
        });

        $('.chk_Equipment_Summary').each(function () {

            var self = $(this),
              label = self.next(),
              label_text = label.text();

            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_line-blue',
                radioClass: 'iradio_line-blue',
                insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
            });
        });

        //start events for equipment

        $('.chk_Equipment_Summary').on('ifClicked', function (event) {

            var currentId = this.id;

            if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                    $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "none");
                    $(this).parent().find('.activeIcon').css("margin-left", '0px');
                    $(this).parent().width(190);

                    $("#tdEquipmentDetailsCondition_Summary").hide("fast");
                    $("#divEquipmentDetailsCondition_label_Summary").html("");

                    ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");


                }
                else {

                    //
                    $(this).parent().width(220);
                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                    $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                    $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                    var width = $(this).parent().width() + 27;
                    $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                    if (!$("#tdEquipmentDetailsCondition_Summary").is(":visible")) {

                        var bgColor = $(this).parent().css("background-color");
                        $("#tdEquipmentDetailsCondition_Summary").show("slow");
                        $("#divEquipmentDetailsCondition_Summary").css("border-color", rgb2hex(bgColor));

                    }

                    ClearSelectedSampleDetailsForViewing("equipmentdetailscondition");

                    $('.chk_Equipment_Summary').each(function () {
                        if (currentId != $(this).attr("id")) {

                            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                            $(this).parent().width(190);

                            $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                            $(this).parent().find('.activeIcon').css("background-image", "none");
                            $(this).parent().find('.activeIcon').css("margin-left", '0px');

                        }
                    });

                    BindSampleDetailsDataIfExistForViewing("equipmentdetailscondition");

                }

                var primaryId = "";
                var secondaryId = "";

                $.each($('.chk_Equipment_Summary'), function () {
                    if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_custom_icon_check')) {

                        if (primaryId == "") {
                            primaryId = $(this).attr("id");
                        }
                        else {
                            secondaryId = $(this).attr("id");
                        }
                    }
                });

                if (currentId == primaryId) {
                    $("#divEquipmentDetailsCondition_label_Summary").html("Primary Container");
                }

                if (currentId == secondaryId) {
                    $("#divEquipmentDetailsCondition_label_Summary").html("Alternate Container");
                }

                return;

            }

        });

        //end events for equipment

    }

    if (mode.toLowerCase() == "equipmentdetailscondition") {

        $.each(TestSampleDetailsList, function (i, val) {

            if (TestSampleDetailsList[i].SampleTypeId == sampleTypeId) {

                var applicationList = TestSampleDetailsList[i].application;

                if (applicationList != null) {

                    $.each(applicationList, function (iApplication, val) {

                        if (!applicationList[iApplication].IsDeleted) {

                            if (applicationList[iApplication].SampleApplicationId == applicationId) {

                                var equipmentList = applicationList[iApplication].equipment;

                                if (equipmentList != null) {

                                    $.each(equipmentList, function (iEqpt, val) {

                                        if (!equipmentList[iEqpt].IsDeleted) {

                                            if (equipmentList[iEqpt].EquipmentId == equipmentId) {

                                                $("#txt_New_TestSampleDetails_NumberofSamples_Summary").val(equipmentList[iEqpt].NumberofSamples);
                                                $("#txt_New_TestSampleDetails_MinQty_Summary").val(equipmentList[iEqpt].MinQty);
                                                $("#txt_New_TestSampleDetails_IdealQty_Summary").val(equipmentList[iEqpt].IdealQty);

                                                var equipmentConditionList = equipmentList[iEqpt].condition;

                                                if (equipmentConditionList != null) {

                                                    $.each(equipmentConditionList, function (iEqptCond, val) {

                                                        if (!equipmentConditionList[iEqptCond].IsDeleted) {

                                                            var code = equipmentConditionList[iEqptCond].StandardConditionId;
                                                            var desc = equipmentConditionList[iEqptCond].StandardCondition;

                                                            var divEquipmentConditionElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_EquipmentCondition_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                                                            $("#divequipmentcondition_obj_Summary").append(divEquipmentConditionElement);

                                                            if (desc.toLowerCase().indexOf("other") >= 0) {
                                                                $("#divequipmentcondition_obj_Summary").append("<div id='oc_text' style='padding-left:10px;'><textarea  id='oc_text_obj' type='text' class='form-control' rows='4' style='width:190px;' readonly >" + equipmentConditionList[iEqptCond].SpecialCondition + "</textarea></div>");
                                                            };
                                                        }

                                                    });

                                                }

                                            }

                                        }
                                    });
                                }

                            }
                        }

                    });
                }

            }
        });

        $('.chk_EquipmentCondition_Summary').each(function () {

            var self = $(this),
              label = self.next(),
              label_text = label.text();

            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_line-blue',
                radioClass: 'iradio_line-blue',
                insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
            });
        });

    }

};

function BindRequirementTypeDataIfExistForViewing() {

    var requirementTypeId = "";
    
    $('.chk_RequirementType_Summary').each(function () {

        if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {
            requirementTypeId = $(this).attr("id");
        }

    });
    
    $.each(TestRequirementDetails, function (i, val) {

        if (!TestRequirementDetails[i].IsDeleted) {

            if (TestRequirementDetails[i].RequirementTypeId == requirementTypeId) {

                var standardrequirement = TestRequirementDetails[i].StandardRequirement;

                $.each(standardrequirement, function (ctr, val) {

                    if (!standardrequirement[ctr].IsDeleted) {

                        var code = standardrequirement[ctr].StandardRequirementId;
                        var desc = standardrequirement[ctr].StandardRequirement;

                        var divRequirementStandardConditionElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheckSummary chk_RequirementStandardCondition_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                        $("#divStandardCondition_obj_Summary").append(divRequirementStandardConditionElement);

                        if (desc.toLowerCase().indexOf("other") >= 0) {
                            $("#divStandardCondition_obj_Summary").append("<div id='oc_condition_text_summary' style='padding-left:10px;'><textarea  id='oc_condition_text_obj_summary' type='text' class='form-control' rows='4' style='width:190px;' readonly  >" + standardrequirement[ctr].RequirementDescription + "</textarea></div>");
                        };


                    }

                });

                $('.chk_RequirementStandardCondition_Summary').each(function () {

                    var self = $(this),
                      label = self.next(),
                      label_text = label.text();

                    label.remove();
                    self.iCheck({
                        checkboxClass: 'icheckbox_line-blue',
                        radioClass: 'iradio_line-blue',
                        insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
                    });
                });

            }

        }

    });

};

function SetUpSampleDetailsandRequirementType_Summary() {
    PopulateSampleTypeforViewing();
    PopulateRequirementTypeForViewing();
};

function SetUpSampleDetailsandRequirementTypeObjects_Summary() {
    
    $('.iCheckSummary').each(function () {

        var self = $(this),
          label = self.next(),
          label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-blue',
            radioClass: 'iradio_line-blue',
            insert: '<div title="Select" class="icheck_custom_icon icheck_custom_icon_check icheck_notactive"></div>' + label_text + "<span class='activeIcon'></span>"
        });
    });
   
    //start events for requirement type

    $.each($('.chk_RequirementType_Summary'), function () {
        var bgColor = $(this).parent().css("background-color");
        $("#divRequirementType_obj_Summary").css("border-color", rgb2hex(bgColor));

        $(this).next().click(function () {

            //uncheck to check
            if ($(this).hasClass("icheck_custom_icon_uncheck")) {

                $(this).removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                $(this).addClass('icheck_active');
                $(this).parent().width(220);

                $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

                var width = $(this).parent().width() + 20;
                $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

                $(this).prop('title', 'Delete');

                var currentId = $(this).prev().attr("id");

                RefreshRequirementStandardCondition_Summary(currentId);

                if (!$("#tdStandardCondition_Summary").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdStandardCondition_Summary").show("slow");
                    $("#divStandardCondition_obj_Summary").css("border-color", rgb2hex(bgColor));

                }

                $('.chk_RequirementType_Summary').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(192);

                    }
                });

                return;

            }

            //check to uncheck
            if ($(this).hasClass("icheck_custom_icon_check")) {

                if (window.confirm('Are you sure you want to delete this?')) {

                    $(this).prop('title', 'Select');

                    if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_active")) {
                        $(this).parent().width(192);
                        $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                        $(this).parent().find('.activeIcon').css("background-image", "none");
                        $(this).parent().find('.activeIcon').css("margin-left", '0px');
                        $("#divStandardCondition_obj_Summary").empty();
                        $("#tdStandardCondition_Summary").hide("fast");
                    }

                    $(this).removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');
                    $(this).removeClass('icheck_active').addClass('icheck_notactive');

                }

                return;

            }

        });

    });

    $('.chk_RequirementType_Summary').on('ifClicked', function (event) {

        var currentId = this.id;

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

            $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
            $(this).parent().find('.icheck_custom_icon').addClass('icheck_active');
            $(this).parent().width(220);

            $(this).parent().find('.activeIcon').addClass("rightArrowIconRightSide");
            $(this).parent().find('.activeIcon').css("background-image", "url('" + hostUrl + "Content/themes/" + themeName + "/images/ui-icons_ffffff_256x240.png')");

            var width = $(this).parent().width() + 20;
            $(this).parent().find('.activeIcon').css("margin-left", width + 'px');

            $(this).parent().find('.activeIcon').prop('title', 'Delete');

            RefreshRequirementStandardCondition_Summary(currentId);

            if (!$("#tdStandardConditio_Summary").is(":visible")) {

                var bgColor = $(this).parent().css("background-color");
                $("#tdStandardCondition_Summary").show("slow");
                $("#divStandardCondition_obj_Summary").css("border-color", rgb2hex(bgColor));

            }

            $('.chk_RequirementType_Summary').each(function () {

                if (currentId != $(this).attr("id")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                    $(this).parent().width(192);

                }
            });

            return;

        }

        if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

            if ($(this).parent().find('.icheck_custom_icon').hasClass('icheck_active')) {

                $("#divStandardCondition_obj_Summary").empty();
                $("#tdStandardCondition_Summary").hide("fast");

                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');
                $(this).parent().find('.activeIcon').removeClass("rightArrowIconRightSide");
                $(this).parent().find('.activeIcon').css("background-image", "none");
                $(this).parent().find('.activeIcon').css("margin-left", '0px');
                $(this).parent().width(192);

            }
            else {

                $(this).parent().width(250);
                $(this).parent().find('.icheck_custom_icon').removeClass('icheck_notactive').addClass('icheck_active');

                RefreshRequirementStandardCondition_Summary(currentId);

                if (!$("#tdStandardCondition_Summary").is(":visible")) {

                    var bgColor = $(this).parent().css("background-color");
                    $("#tdStandardCondition_Summary").show("slow");
                    $("#divStandardCondition_obj_Summary").css("border-color", rgb2hex(bgColor));

                }

                //start temp based on data
                
                //end temp based on data

                $('.chk_RequirementType_Summary').each(function () {

                    if (currentId != $(this).attr("id")) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_active').addClass('icheck_notactive');

                        $(this).parent().width(190);
                    }
                });

            }

            return;

        }

    });

    //end events for requirement type

    //$("#txt_New_TestSampleDetails_MinQty").spinner({ min: 1, max: 100 });
    //$("#txt_New_TestSampleDetails_IdealQty").spinner({ min: 1, max: 100 });
    //$("#txt_New_TestSampleDetails_NumberofSamples").spinner({ min: 1, max: 100 });

};

function SetUpSampleDetailsandRequirementTypeSectionPosition_Summary() {

    $("#divSampleType_label_Summary").html("Sample Type");

    //application
    $("#divAnalysisSampleApplication_label_Summary").html("Application");
    $("#divAnalysisSampleApplication_label_Summary").css({
        "position": "absolute",
        "top": "61px",
        "left": "245px",
    });

    $("#divAnalysisSampleApplication_obj_Summary").css({
        "position": "absolute",
        "top": "81px",
        "left": "245px",
    });

    //equipment
    $("#divEquipment_label_Summary").html("Equipment");
    $("#divEquipment_label_Summary").css({
        "position": "absolute",
        "top": "61px",
        "left": "469px",
    });

    $("#divEquipment_obj_Summary").css({
        "position": "absolute",
        "top": "81px",
        "left": "469px",
    });

    //equipment condition
    $("#divEquipmentDetailsCondition_label_Summary").css({
        "position": "absolute",
        "top": "61px",
        "left": "688px",
    });

    $("#divEquipmentDetailsCondition_Summary").css({
        "position": "absolute",
        "top": "85px",
        "left": "688px",
    });

    $("#divRequirementType_label_Summary").html("Requirement Type");

    //requirement type standard condition
    $("#divStandardCondition_label_Summary").html("Standard Requirement");
    $("#divStandardCondition_label_Summary").css({
        "position": "absolute",
        "top": "61px",
        "left": "248px",
    });

    $("#divStandardCondition_obj_Summary").css({
        "position": "absolute",
        "top": "81px",
        "left": "248px",
    });


};

function DestroySampleDetailsandRequirementTypeObject_Summary() {

    $('.iCheckSummary').each(function () {
        $(this).iCheck('destroy');
    });

    $("#divSampleType_obj_Summary").empty();
    $("#divAnalysisSampleApplication_obj_Summary").empty();
    $('#ul_equipment_obj_Summary').children().remove().end();
    $("#divequipmentcondition_obj_Summary").empty();
    $("#divRequirementType_obj_Summary").empty();
    $("#divStandardCondition_obj_Summary").empty();

};

function RefreshRequirementStandardCondition_Summary(ownerValue) {

    $('.chk_RequirementStandardCondition_Summary').each(function () {
        $(this).iCheck('destroy');
    });

    $("#divStandardCondition_obj_Summary").empty();

    Common_GetLookUpData("TestRequirement", "StandardRequirement", function (items, err) {

        var lookUpData = items;

        //populate requirementStandardCondition
        var requirementStandardConditionData = jQuery.grep(lookUpData, function (element, index) {
            return (element.OwnerFieldName == "RequirementType" && element.OwnerValue == ownerValue);
        });

        if (requirementStandardConditionData.length > 0) {

            $.each(requirementStandardConditionData, function (index, value) {
                var code = requirementStandardConditionData[index].ValueCode;
                var desc = requirementStandardConditionData[index].ValueDescription;

                var divRequirementStandardConditionElement = "<div style='margin-top:2px;padding: 0.1em 0.5em;'><input class='iCheck_Summary chk_RequirementStandardCondition_Summary' type='checkbox' id='" + code + "'><label for='" + code + "'>" + desc + "</label></div>";

                $("#divStandardCondition_obj_Summary").append(divRequirementStandardConditionElement);

                if (desc.toLowerCase().indexOf("other") >= 0) {
                    $("#divStandardCondition_obj_Summary").append("<div id='oc_condition_text' style='display:none;padding-left:10px;'><textarea  id='oc_condition_text_obj' type='text' class='form-control' rows='4' style='width:190px;' tabindex='4' /></div>");
                };

            });

            $('.chk_RequirementStandardCondition_Summary').each(function () {

                var self = $(this),
                  label = self.next(),
                  label_text = label.text();

                label.remove();
                self.iCheck({
                    checkboxClass: 'icheckbox_line-blue',
                    radioClass: 'iradio_line-blue',
                    insert: '<div class="icheck_custom_icon icheck_custom_icon_uncheck icheck_notactive"></div>' + label_text
                });
            });

            $('.chk_RequirementStandardCondition_Summary').on('ifClicked', function (event) {

                var currentId = this.id;


                if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_uncheck")) {

                    $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_uncheck').addClass('icheck_custom_icon_check');
                    if (currentId.toLowerCase().indexOf("other") >= 0) {
                        $("#oc_condition_text").show('slow');
                    }

                    return;

                }

                if ($(this).parent().find('.icheck_custom_icon').hasClass("icheck_custom_icon_check")) {

                    if (window.confirm('Are you sure you want to delete this?')) {

                        $(this).parent().find('.icheck_custom_icon').removeClass('icheck_custom_icon_check').addClass('icheck_custom_icon_uncheck');

                        if (currentId.toLowerCase().indexOf("other") >= 0) {
                            $("#oc_condition_text").val();
                            $("#oc_condition_text").hide('slow');
                        }

                    }

                    return;
                }

            });

        }

    });

};

function HideSectionsForViewing() {

    $("#tdAnalysisSampleApplication_Summary").css("display", "none");
    $("#tdStandardCondition_Summary").css("display", "none");
    $("#tdEquipment_Summary").css("display", "none");
    $("#tdEquipmentDetailsCondition_Summary").css("display", "none");

};

//start for summary and view

/* End Set up sample details and Requirement type */
