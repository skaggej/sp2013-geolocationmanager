<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    SPWeb Geolocation Management
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="instructions" id="dInstructions">
        Use this app to:
        <ol>
            <li>Add/Remove the Geolocation field to lists in the host SPWeb.</li>
            <li>Manage the Bing Maps Key for this SPWeb.</li>
        </ol>
        <p>If you need to acquire a Bing Maps Key, you can do so at <a href="http://www.bingmapsportal.com" target="_blank">http://www.bingmapsportal.com</a>.</p>
        <p>Not familiar with the Geolocation field?  Start here: <a href="http://zimmergren.net/technical/sp-2013-getting-started-with-the-new-geolocation-field-in-sharepoint-2013">SP 2013: Getting started with the new Geolocation field in SharePoint 2013 by Tobias Zimmergren</a>.</p>
    </div>
    <hr />
    <div class="main key" id="dCurrentBingMapsKey"></div>
    <div class="main">
        <select id="sWebLists" name="webLists" title="Web Lists"></select>
        <input id="bAdd" type="button" value="Enable Geolocation for this list" onclick="addGeolocationField()" />
    </div>
    <div class="main">
        <input id="tbBingMapsKey" type="text" />
        <input id="bAddBingMapsKey" type="button" value="Add Bing Maps Key" onclick="setBingKey()" />
    </div>
</asp:Content>