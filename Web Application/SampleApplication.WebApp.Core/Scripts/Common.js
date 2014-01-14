var hostApiUrl = 'http://localhost:53875/';
var hostUrl = 'http://localhost:65213/';
var uploadedImageUrl = hostUrl + '/MobileProfile_Upload/Image/';
var uploadedVideoUrl = hostUrl + '/MobileProfile_Upload/Video/';
var themeName = "metro";
var domainId = "1";
var userId = "1";
var groupId = "2";
var lookUpData = [];

function Common_GetData(pUrl, callback) {
    
    var _url = hostApiUrl + pUrl;

    $.ajax({
        url: _url,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            callback(data, '');
        },
        error: function (xhr, status, error) {
            callback(null, xhr.responseText);
        }
    });

};

function Common_GetData_ParamJSON(pUrl, pData, callback) {

    var _url = hostApiUrl + pUrl;
    
    $.ajax({
        url: _url,
        type: 'POST',
        data: JSON.stringify(pData),
        dataType: 'json',
        success: function (data) {
            callback(data, '');
        },
        error: function (xhr, status, error) {
            callback(null, xhr.responseText);
        }
    });

};

function Common_SaveDataChanges(pUrl, pData, pType, callback) {

    var _url = hostApiUrl + pUrl;

    $.ajax({
        url: _url,
        type: pType,
        data: JSON.stringify(pData),
        dataType: 'json',
        success: function (data) {
            callback(data, '');
        },
        error: function (xhr, status, error) {
            callback(null, xhr.responseText);
        }
    });

};

function Common_GetLookUpData(pTableName, pFieldName, callback) {

    var _url = '';

    if (pTableName == '' && pFieldName == '') {
        _url = 'api/lookup';
    }
    else {
        _url = 'api/lookup/filter?pTableName=' + pTableName + '&pFieldName=' + pFieldName;
    }

    Common_GetData(_url, function (items, err) {
        if (err == '') {
            if (pTableName == '' && pFieldName == '') {
                lookUpData = items;
            }
            callback(items, '');
        }
        else {
            callback('', err);
        }
    });

};

function Common_PopulateDropDownviaLookUp(pTableName, pFieldName, selectObject, callback) {

    Common_GetLookUpData(pTableName, pFieldName, function (items, err) {

        if (err == '') {

            var options = '<option value="">Please select</option>';
            var _selected = '';
            var _selectedSet = 'false';

            for (i = 0; i <= (items.length - 1) ; ++i) {
                if (items[i].DefaultValue) {
                    if (_selectedSet == 'false') {
                        _selectedSet = 'true';
                        _selected = 'selected = "selected"';
                    }
                    else {
                        _selected = '';
                    }
                }

                options = options + '<option value="' + items[i].ValueCode + '"' + _selected + '>' + items[i].ValueDescription + '</option>';
            }

            if (options != "") {
                selectObject.html(options);
            }

            /**/
            callback('');
        }
        else {
            callback(err);
        }
    });
};

function Common_NumericFieldKeDown(object) {
    object.keydown(function (event) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
};