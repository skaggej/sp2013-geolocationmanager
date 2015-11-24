/*  Created by Eric Skaggs
**  @skaggej
**  http://www.skaggej.com
**
**  TODO
**  -DisplayName of added geolocation column should come from user input
**  -Update code pattern
**  -Rename functions
**  -Add the geolocation field if the current list doesn't already have it...based on the field type if possible
**  -Allow users to remove the column...another drop-down list maybe...this must prompt for confirmation due to risk of data loss
**  -Improve comments throughout
**  -UI/data enhancements:  Knockout, Angular
**  -Responsive
**
**  Latest Update - 11/09/2014
**  -The geolocation field will only be added if it doesn't already exist in the list.  This is based on the field name, not the type.
*/

'use strict';

var hostUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var context = new SP.ClientContext.get_current();
var hostcontext = new SP.AppContextSite(context, hostUrl);
var web = hostcontext.get_web();
var webProperties = null;
var lists = web.get_lists();
var fields = null;
var selectedList = null;
var geoColumnName = "Geolocation";

$(document).ready(function () {
    fillLists();
    getWebProperties();
});

function fillLists() {
    context.load(lists);
    context.executeQueryAsync(onFillListsSuccess, onFillListsFail);
}

function onFillListsSuccess() {
    for (var i = 0; i < lists.get_count(); i++) {
        var currentTitle = lists.get_item(i).get_title();
        $('#sWebLists').append("<option value='" + currentTitle + "'>" + currentTitle + "</option>");
    }
}

function onFillListsFail(sender, args) {
    alert('Failed to get lists. Error: ' + args.get_message());
}

function addGeolocationField() {
    selectedList = $('#sWebLists').val().toString();
    var targetList = lists.getByTitle(selectedList);
    fields = targetList.get_fields();
    context.load(fields);
    context.executeQueryAsync(onAddGeolocationFieldSuccess, function () { alert("Fields failed to load"); });
}

function onAddGeolocationFieldSuccess() {
    var fieldNames = "";
    var listEnumerator = fields.getEnumerator();
    while (listEnumerator.moveNext()) {
        fieldNames += listEnumerator.get_current().get_title() + "; ";
    }
    if (fieldNames.indexOf(geoColumnName) != -1) {
        alert("The " + geoColumnName + " column is already in this list.");
    }
    else {
        fields.addFieldAsXml("<Field Type='Geolocation' DisplayName='" + geoColumnName + "'/>", true, SP.AddFieldOptions.addToDefaultContentType); //assuming add to default content type and view
        context.executeQueryAsync(success, onAddGeolocationFieldFail);
    }
}

function success() {
    alert("Geolocation has been enabled for: " + selectedList);
}

function onAddGeolocationFieldFail(sender, args) {
    alert('Failed to add Geolocation field.  Error:  ' + args.get_message());
}

function getWebProperties() {
    webProperties = web.get_allProperties();
    context.load(webProperties);
    context.executeQueryAsync(onGetWebPropertiesSuccess, onGetWebPropertiesFail)
}

function onGetWebPropertiesSuccess() {
    if (webProperties.get_fieldValues()["BING_MAPS_KEY"] != undefined) {
        $('#dCurrentBingMapsKey').text("Current Bing Maps Key:  " + webProperties.get_fieldValues()["BING_MAPS_KEY"]);
    }
}

function onGetWebPropertiesFail(sender, args) {
    alert('Failed to add get web properties.  Error:  ' + args.get_message());
}

function setBingKey() {
    webProperties.set_item("BING_MAPS_KEY", $('#tbBingMapsKey').val());
    web.update();
    context.load(web);

    context.executeQueryAsync(function (sender, args) {
        alert("The Bing Maps Key has been set as:  " + webProperties.get_fieldValues()["BING_MAPS_KEY"] + ".");
    }, function (sender, args) {
        alert("Error: " + args.get_message());
    });
}

/***** stand-alone functions that don't need async success/failure methods *****/

//standard function to retrieve query string values
function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}