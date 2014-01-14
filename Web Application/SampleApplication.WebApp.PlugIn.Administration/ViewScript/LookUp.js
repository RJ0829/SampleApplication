var tablefieldSelectControlData = [];
var originalData;
var olddValueCode = "";

function Initialize() {
    
    RequestForEdit();

    $.ig.loader({
        scriptPath: hostUrl + "Scripts/Infragistics",
        cssPath: hostUrl + "Content/Infragistics",
        resources: "igHierarchicalGrid.*,igTree",
        theme: themeName,
    });

    $.ig.loader(function () {

        $(":button").button();

        $('#select_FieldName').prop('disabled', true);

        GetData("false");
    });

};


function RequestForEdit() {
    $('#loading_lookup').html('<img src="/Images/loading.gif"/>');
}

function ResponseForEdit(data) {
    $('#loading_lookup').html(data);
}

function FilterData(pTableName, pFieldName) {

    var filteredData = jQuery.grep(originalData, function (element, index) {
        return (pTableName == "" || (pTableName == element.TableName)) && (pFieldName == "" || (pFieldName == element.FieldName));
    });

    var jsonData = FormatGridData(filteredData);
    $("#lookupgrid").igHierarchicalGrid("option", "dataSource", jsonData);
};

function GetData(rebind) {

    Common_GetLookUpData('', '', function (items, err) {

        if (err == '') {

            originalData = items;
            
            var fselectedTableNameValue = "";
            var fselectedFieldNameValue = "";

            if ($("#select_TableName").val() != "All" && $("#select_TableName").val() != null) {
                fselectedTableNameValue = $("#select_TableName").val();
            }

            if ($("#select_FieldName").val() != "All" && $("#select_FieldName").val() != null) {
                fselectedFieldNameValue = $("#select_FieldName").val();
            }

            tablefieldSelectControlData = [];
            $('#select_TableName').find('option').remove().end();
            $('#select_FieldName').find('option').remove().end();

            BindTableNameSelect(items);

            var jsonData = null;


            if (fselectedTableNameValue != "" || fselectedFieldNameValue != "") {

                $("#select_TableName").val(fselectedTableNameValue);

                BindFieldNameSelect(fselectedTableNameValue);
                if (fselectedFieldNameValue != "") {
                    $("#select_FieldName").val(fselectedFieldNameValue);
                }

                var filteredData = jQuery.grep(items, function (element, index) {
                    return (fselectedTableNameValue == "" || (fselectedTableNameValue == element.TableName)) && (fselectedFieldNameValue == "" || (fselectedFieldNameValue == element.FieldName));
                });

                jsonData = FormatGridData(filteredData);

            } else {

                jsonData = FormatGridData(items);

            }

            if (rebind == "false") {
                BindGrid(jsonData);
            }
            else {
                $("#lookupgrid").igHierarchicalGrid("option", "dataSource", jsonData);
            }
                       
        }
        else {
            alert(err);
        }

        ResponseForEdit('');
    });
};

function BindTableNameSelect(data) {

    var fieldNameList = [];

    //parse data
    $.each(data, function (index) {

        for (i = 0; i <= (tablefieldSelectControlData.length - 1) ; ++i) {

            if (tablefieldSelectControlData[i].tableName == data[index].TableName) {
                fieldNameList = tablefieldSelectControlData[i].fields;
            }
            else {
                fieldNameList = [];
            }

        }

        if (fieldNameList.length > 0) {

            var fieldExist = false;

            for (i = 0; i <= (fieldNameList.length - 1) ; ++i) {

                if (fieldNameList[i].tableName == data[index].TableName && fieldNameList[i].fieldName == data[index].FieldName) {
                    fieldExist = true;
                }

            }

            if (fieldExist == false) {

                fieldNameList.push({ tableName: data[index].TableName, fieldName: data[index].FieldName });

            }

        }
        else {

            fieldNameList.push({ tableName: data[index].TableName, fieldName: data[index].FieldName });
            tablefieldSelectControlData.push({ tableName: data[index].TableName, fields: fieldNameList });

        }

    });

    //display data in table name field

    var options = '<option value="All">All</option>';

    for (i = 0; i <= (tablefieldSelectControlData.length - 1) ; ++i) {
        options = options + '<option value="' + tablefieldSelectControlData[i].tableName + '">' + tablefieldSelectControlData[i].tableName + '</option>';
    }

    if (options != "") {
        $('#select_TableName').find('option').remove().end();
        $("#select_TableName").html(options);
    }
};

function BindFieldNameSelect(ptableName) {

    var fieldList = [];
    for (i = 0; i <= (tablefieldSelectControlData.length - 1) ; ++i) {
        if (tablefieldSelectControlData[i].tableName == ptableName) {
            fieldList = tablefieldSelectControlData[i].fields;
        }
    }

    //display data in field name field

    var options = '<option value="All">All</option>';
    var enabledFieldName = false;

    for (i = 0; i <= (fieldList.length - 1) ; ++i) {
        enabledFieldName = true;
        options = options + '<option value="' + fieldList[i].fieldName + '">' + fieldList[i].fieldName + '</option>';
    }

    if (options != "") {
        $("#select_FieldName").html(options);
        if (enabledFieldName) {
            $('#select_FieldName').prop('disabled', false);
        }
    }
};

function FormatGridData(pData) {

    var cLookupList = [];
    var data = [];
    var otherdata = [];

    $.each(pData, function (index) {

        data.push({ Pkey: pData[index].Counter, DisplayOrder: pData[index].DisplayOrder, OwnerFieldName: pData[index].OwnerFieldName, OwnerValue: pData[index].OwnerValue, DefaultValue: pData[index].DefaultValue, Aliased: pData[index].Aliased, SystemRequired: pData[index].SystemRequired, ValueForAction: pData[index].ValueForAction });
        cLookupList.push({ Pkey: pData[index].Counter, TableName: pData[index].TableName, FieldName: pData[index].FieldName, ValueCode: pData[index].ValueCode, ValueDescription: pData[index].ValueDescription, otherdata: { data: data } });
        data = [];
        otherdata = [];
    });

    var jsonData = { data: cLookupList };

    return jsonData;
};

function BindGrid(src) {

    $("#lookupgrid").igHierarchicalGrid({
        initialDataBindDepth: 1,
        dataSource: src,
        dataSourceType: 'json',
        responseDataKey: "data",
        autoGenerateColumns: false,
        autoGenerateLayouts: false,
        primaryKey: "Pkey",
        autoCommit: true,
        columns: [
            { headerText: '', key: "Pkey", dataType: "number", hidden: true },
            { headerText: "Table Name", key: "TableName", dataType: "string", width: "0px", hidden: true },
            { headerText: "Field Name", key: "FieldName", dataType: "string", width: "0px", hidden: true },
            { headerText: "Code", key: "ValueCode", dataType: "string", width: "120px" },
            { headerText: "Description", key: "ValueDescription", dataType: "string", width: "150px" },
        ],
        height: "390px",
        width: "100%",
        columnLayouts: [
                           {
                               //  Define looks and behavior for the second level in the hierarchy
                               key: "otherdata",
                               responseDataKey: "data",
                               autoGenerateColumns: false,
                               generateCompactJSONResponse: false,
                               primaryKey: "Pkey",
                               foreignKey: "ValueCode",
                               renderCheckboxes: true,
                               columns: [
                                   { headerText: '', key: "Pkey", dataType: "number", hidden: true },
                                   { headerText: 'Display order', key: "DisplayOrder", dataType: "number", width: "90px" },
                                   { headerText: 'Owner field name', key: "OwnerFieldName", dataType: "string", width: "140px" },
                                   { headerText: 'Owner value', key: "OwnerValue", dataType: "string", width: "120px" },
                                   { headerText: 'Default value', key: "DefaultValue", dataType: "bool", width: "70px" },
                                   { headerText: 'Aliased', key: "Aliased", dataType: "bool", width: "80px" },
                                   { headerText: 'System required', key: "SystemRequired", dataType: "bool", width: "100px" },
                                   { headerText: 'Value for action', key: "ValueForAction", dataType: "string", width: "140px" },
                               ],
                               headerCellRendered: function (evt, ui) {
                                   $(ui.th).css("text-align", "center");
                               },
                               cellClick: function (evt, ui) {
                                   evt.stopPropagation();
                               }
                           }
        ],
        cellClick: function (evt, ui) {
            if (ui.colKey == "FieldName" || ui.colKey == "ValueCode") {
                OpenEditWindows(ui.rowKey);
            }
        },
        features: [
                   {
                       name: "Selection",
                       mode: "row",
                       multipleSelection: false,
                       activation: true,
                       wrapAround: true,
                       skipChildren: false
                   },
                   {
                       name: "Paging",
                       type: "local",
                       showPageSizeDropDown: false,
                       pageSize: 10
                   },
                   {
                       name: "GroupBy",
                       inherit: false,
                       groupByAreaVisibility: "hidden",
                       columnSettings: [
                           { columnKey: "TableName", isGroupBy: true },
                           { columnKey: "FieldName", isGroupBy: true },
                       ]
                   }

        ]
    });
};

function OpenEditWindows(pKey) {

    RequestForEdit();

    var dialog = ($('#editLookUpDialog').length > 0) ? $('#editLookUpDialog') : $('<div id="editLookUpDialog" style="display:hidden"></div>').appendTo('body');
    $.ajax({
        url: hostUrl + 'LookUp/EditLookUpData', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: true,
                width: 475, height: 680,
                resizable: false,
                show: "fade", hide: "fade",
                title: 'Edit Reference Look up'
            });

            $(":button").button();

            var filteredData = jQuery.grep(originalData, function (element, index) {
                return (element.Counter == pKey);
            });

            $("#txt_EditLookUpDisplayOrder").spinner({ min: 1, max: 100 });


            if (filteredData.length > 0) {

                $("#txt_EditLookUpTableName").val(filteredData[0].TableName);
                $("#txt_EditLookUpFieldName").val(filteredData[0].FieldName);
                $("#txt_EditLookUpValueCode").val(filteredData[0].ValueCode);
                $("#hdn_ValueCode").val(filteredData[0].ValueCode);
                $("#txt_EditLookUpValueDescription").val(filteredData[0].ValueDescription);
                $("#txt_EditLookUpDisplayOrder").val(filteredData[0].DisplayOrder);
                $("#hdn_DisplayOrder").val(filteredData[0].DisplayOrder)
                $("#txt_EditLookUpOwnerFieldName").val(filteredData[0].OwnerFieldName);
                $("#txt_EditLookUpOwnerValue").val(filteredData[0].OwnerValue);
                if (filteredData[0].DefaultValue) {
                    $("#chk_EditLookUpDefaultValue").attr('checked', 'checked');
                }
                if (filteredData[0].SystemRequired) {
                    $("#chk_EditLookUpSystemRequired").attr('checked', 'checked');
                }
                if (filteredData[0].Aliased) {
                    $("#chk_EditLookUpAliased").attr('checked', 'checked');
                }
                $("#txt_EditLookUpValueforAction").val(filteredData[0].ValueForAction);
            }

            $("#btn_CancelEditLookUpData").click(function () {
                $("#editLookUpDialog").dialog('close');
            });

            $("#btn_DeleteLookUpData").click(function () {

                if (window.confirm("Delete record?")) {

                    var vTableName = $("#txt_EditLookUpTableName").val(), vFieldName = $("#txt_EditLookUpFieldName").val(), vValueCode = $("#txt_EditLookUpValueCode").val(), vValueDescription = $("#txt_EditLookUpValueDescription").val();
                    var vDisplayOrder = $("#txt_EditLookUpDisplayOrder").val(), vOwnerFieldName = $("#txt_EditLookUpOwnerFieldName").val(), vOwnerValue = $("#txt_EditLookUpOwnerValue").val(), vValueForAction = $("#txt_EditLookUpValueforAction").val();

                    var vDefaultValue;
                    if ($("#chk_EditLookUpDefaultValue").is(':checked')) {
                        vDefaultValue = 1;
                    } else {
                        vDefaultValue = 0;
                    }

                    var vSystemRequired;
                    if ($("#chk_EditLookUpSystemRequired").is(':checked')) {
                        vSystemRequired = 1;
                    } else {
                        vSystemRequired = 0;
                    }

                    var vAliased;
                    if ($("#chk_EditLookUpAliased").is(':checked')) {
                        vAliased = 1;
                    } else {
                        vAliased = 0;
                    }


                    var lookUpData = { GroupID: groupId, TableName: vTableName, FieldName: vFieldName, ValueCode: vValueCode, ValueDescription: vValueDescription, DisplayOrder: vDisplayOrder, OwnerFieldName: vOwnerFieldName, OwnerValue: vOwnerValue, DefaultValue: vDefaultValue, SystemRequired: vSystemRequired, Aliased: vAliased, ValueForAction: vValueForAction };

                    DeleteNewLookUpData(lookUpData);
                }

            });

            $("#btn_SaveEditLookUpData").click(function () {

                var validateMessage = "";
                var vTableName = $("#txt_EditLookUpTableName").val(), vFieldName = $("#txt_EditLookUpFieldName").val(), vValueCode = $("#txt_EditLookUpValueCode").val(), vValueDescription = $("#txt_EditLookUpValueDescription").val();
                var vDisplayOrder = $("#txt_EditLookUpDisplayOrder").val(), vOwnerFieldName = $("#txt_EditLookUpOwnerFieldName").val(), vOwnerValue = $("#txt_EditLookUpOwnerValue").val(), vValueForAction = $("#txt_EditLookUpValueforAction").val();

                var vDefaultValue;
                if ($("#chk_EditLookUpDefaultValue").is(':checked')) {
                    vDefaultValue = 1;
                } else {
                    vDefaultValue = 0;
                }

                var vSystemRequired;
                if ($("#chk_EditLookUpSystemRequired").is(':checked')) {
                    vSystemRequired = 1;
                } else {
                    vSystemRequired = 0;
                }

                var vAliased;
                if ($("#chk_EditLookUpAliased").is(':checked')) {
                    vAliased = 1;
                } else {
                    vAliased = 0;
                }

                // Validation
                if (vTableName == "") {
                    validateMessage = "Table Name is required.";
                }

                if (vFieldName == "") {
                    validateMessage = validateMessage + "\n" + "Field Name is required.";
                }

                if (vValueCode == "") {
                    validateMessage = validateMessage + "\n" + "Value code is required.";
                }
                else {
                    if (vValueCode != $("#hdn_ValueCode").val()) {
                        for (i = 0; i <= (originalData.length - 1) ; ++i) {
                            if ($.trim(originalData[i].TableName) == vTableName && $.trim(originalData[i].FieldName) == vFieldName && $.trim(originalData[i].ValueCode) == vValueCode) {
                                validateMessage = validateMessage + "\n" + "Table Name: " + vTableName + " | Field Name : " + vFieldName + " | Code : " + vValueCode + " already exists.";
                            }
                        }
                    }
                }

                if (vDisplayOrder == "") {
                    validateMessage = validateMessage + "\n" + "Display order is required.";
                }
                else {
                    if (vDisplayOrder != $("#hdn_DisplayOrder").val()) {
                        for (i = 0; i <= (originalData.length - 1) ; ++i) {
                            if ($.trim(originalData[i].TableName) == vTableName && $.trim(originalData[i].FieldName) == vFieldName && $.trim(originalData[i].DisplayOrder) == vDisplayOrder) {
                                validateMessage = validateMessage + "\n" + "Table Name: " + vTableName + " | Field Name : " + vFieldName + " | Display Order : " + vDisplayOrder + " already exists.";
                            }
                        }
                    }
                }


                // Save Record                                                    
                if (validateMessage == "") {

                    var lookUpData = { GroupID: groupId, TableName: vTableName, FieldName: vFieldName, ValueCode: vValueCode, ValueDescription: vValueDescription, DisplayOrder: vDisplayOrder, OwnerFieldName: vOwnerFieldName, OwnerValue: vOwnerValue, DefaultValue: vDefaultValue, SystemRequired: vSystemRequired, Aliased: vAliased, ValueForAction: vValueForAction };

                    UpdateNewLookUpData(lookUpData);

                }
                else {
                    alert(validateMessage);
                }
                                

            });

            ResponseForEdit('');
        }
    });

};

function SaveNewLookUpData(data) {

    var url = "api/lookup/insert";
    var message = "Data created successfully.";
    var type = "post";
    
    Common_SaveDataChanges(url, data, type, function (items, err) {
        if (err == '') {
            alert(message);
            $("#addLookUpDialog").dialog('close');
            GetData("true");
        }
        else {
            alert(err);
        }
    });

};

function UpdateNewLookUpData(data) {
    var url = "api/lookup/update";
    var message = "Data updated successfully.";
    var type = "put";

    Common_SaveDataChanges(url, data, type, function (items, err) {
        if (err == '') {
            alert(message);
            $("#editLookUpDialog").dialog('close');
            GetData("true");
        }
        else {
            alert(err);
        }
    });
};

function DeleteNewLookUpData(data) {
    var url = "api/lookup/delete";
    var message = "Data deleted successfully.";
    var type = "delete";

    Common_SaveDataChanges(url, data, type, function (items, err) {
        if (err == '') {
            alert(message);
            $("#editLookUpDialog").dialog('close');
            GetData("true");
        }
        else {
            alert(err);
        }
    });
};

//events
$("#select_TableName").change(function () {

    $('#select_FieldName').prop('disabled', true);
    $('#select_FieldName').find('option').remove().end();

    var selectedTableNameValue = "";
    if ($(this).val() != "All") {
        selectedTableNameValue = $(this).val();
    }

    BindFieldNameSelect(selectedTableNameValue);
    FilterData(selectedTableNameValue, "");

});

$("#select_FieldName").change(function () {

    var selectedTableNameValue = "";
    var selectedFieldNameValue = "";

    if ($(this).val() != "All") {
        selectedFieldNameValue = $(this).val();
    }

    if ($("#select_TableName").val() != "All") {
        selectedTableNameValue = $("#select_TableName").val();
    }

    FilterData(selectedTableNameValue, selectedFieldNameValue);

});

$("#btn_AddNewLookUp").click(function () {
    RequestForEdit();

    var dialog = ($('#addLookUpDialog').length > 0) ? $('#addLookUpDialog') : $('<div id="addLookUpDialog" style="display:hidden"></div>').appendTo('body');
    $.ajax({
        url: hostUrl + 'LookUp/AddNewLookUpData', cache: false,
        success: function (responseText, textStatus, XMLHttpRequest) {
            dialog.html(responseText);
            dialog.dialog({
                bgiframe: true, modal: true,
                width: 475, height: 680,
                resizable: false,
                show: "fade", hide: "fade",
                title: 'Add Reference'
            });

            $(":button").button();

            $("#txt_NewLookUpDisplayOrder").spinner({ min: 1, max: 100 });

            $("#btn_CancelNewLookUpData").click(function () {
                $("#addLookUpDialog").dialog('close');
            });

            $("#btn_SaveNewLookUpData").click(function () {

                var validateMessage = "";
                var vTableName = $.trim($("#txt_NewLookUpTableName").val());
                var vFieldName = $.trim($("#txt_NewLookUpFieldName").val());
                var vValueCode = $.trim($("#txt_NewLookUpValueCode").val());
                var vValueDescription = $.trim($("#txt_NewLookUpValueDescription").val());
                var vDisplayOrder = $.trim($("#txt_NewLookUpDisplayOrder").val());
                var vOwnerFieldName = $.trim($("#txt_NewLookUpOwnerFieldName").val());
                var vOwnerValue = $.trim($("#txt_NewLookUpOwnerValue").val());
                var vValueforAction = $.trim($("#txt_NewLookUpValueforAction").val());

                var vDefaultValue;
                if ($("#chk_NewLookUpDefaultValue").is(':checked')) {
                    vDefaultValue = 1;
                } else {
                    vDefaultValue = 0;
                }

                var vSystemRequired;
                if ($("#chk_NewLookUpSystemRequired").is(':checked')) {
                    vSystemRequired = 1;
                } else {
                    vSystemRequired = 0;
                }

                var vAliased;
                if ($("#chk_NewLookUpAliased").is(':checked')) {
                    vAliased = 1;
                } else {
                    vAliased = 0;
                }

                // Validation
                if (vTableName == "") {
                    validateMessage = "Table Name is required.";
                }

                if (vFieldName == "") {
                    validateMessage = validateMessage + "\n" + "Field Name is required.";
                }

                if (vValueCode == "") {
                    validateMessage = validateMessage + "\n" + "Value code is required.";
                }
                else {

                    for (i = 0; i <= (originalData.length - 1) ; ++i) {
                        if ($.trim(originalData[i].TableName) == vTableName && $.trim(originalData[i].FieldName) == vFieldName && $.trim(originalData[i].ValueCode) == vValueCode) {
                            validateMessage = validateMessage + "\n" + "Table Name: " + vTableName + " | Field Name : " + vFieldName + " | Code : " + vValueCode + " already exists.";
                        }
                    }
                }

                if (vDisplayOrder == "") {
                    validateMessage = validateMessage + "\n" + "Display order is required.";
                }
                else {

                    for (i = 0; i <= (originalData.length - 1) ; ++i) {
                        if ($.trim(originalData[i].TableName) == vTableName && $.trim(originalData[i].FieldName) == vFieldName && $.trim(originalData[i].DisplayOrder) == vDisplayOrder) {
                            validateMessage = validateMessage + "\n" + "Table Name: " + vTableName + " | Field Name : " + vFieldName + " | Display Order : " + vDisplayOrder + " already exists.";
                        }
                    }
                }

                // Save Record                                                    
                if (validateMessage == "") {

                    var lookUpData = { GroupID: groupId, TableName: vTableName, FieldName: vFieldName, ValueCode: vValueCode, ValueDescription: vValueDescription, DisplayOrder: vDisplayOrder, OwnerFieldName: vOwnerFieldName, OwnerValue: vOwnerValue, DefaultValue: vDefaultValue, SystemRequired: vSystemRequired, Aliased: vAliased, ValueForAction: vValueforAction };

                    SaveNewLookUpData(lookUpData);

                }
                else {
                    alert(validateMessage);
                }

            });

            ResponseForEdit('');
        }
    });
});