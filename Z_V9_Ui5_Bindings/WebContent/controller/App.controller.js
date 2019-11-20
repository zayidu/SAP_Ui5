sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/ui/core/Locale",
	"sap/ui/core/LocaleData",
	"sap/ui/model/type/Currency"
], function (Controller, mobileLibrary , Locale ,  LocaleData , Currency ) {
	"use strict";

	return Controller.extend("sap.ui.Z.controller.App", {
		formatMail: function(sFirstName, sLastName) {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			return mobileLibrary.URLHelper.normalizeEmail(
				sFirstName + "." + sLastName + "@imeditsolutions.com",
				oBundle.getText("mailSubject", [sFirstName]),
				oBundle.getText("mailBody"));
		}
	,
	formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
		var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
		var oLocale = new Locale(sBrowserLocale);
		var oLocaleData = new LocaleData(oLocale);
		var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
		return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
	},
	
	onItemSelected: function(oEvent) {
		var oSelectedItem = oEvent.getSource();
		var oContext = oSelectedItem.getBindingContext("products");
		var sPath = oContext.getPath();
		var oProductDetailPanel = this.byId("productDetailsPanel");
		oProductDetailPanel.bindElement({ path: sPath, model: "products" });
/*
 * In the controller, we bind the newly created panel to the correct item whenever it is pressed.

We can now click on an element in the list and see its details in the panel below. 
We can even edit these details and these changes are directly shown in the list because we use two-way binding.
Element bindings can also be relative to its parent context.

Expression binding allows you to display a value on the screen that has been calculated from values found in some model object. 
This way simple formatting or calculations can be inserted directly into the data binding string. In this example, 
we will change the color of the price depending on whether it is above or below some arbitrary threshold. The threshold 
value is also stored in the JSON model.

 */		
	}
	});
});


/*
 * Create a new folder controller within your webapp folder as a general location for all controller 
 * files for this app and create a new file App.controller.js.

In our custom formatter, we define the first and last name that are currently in the model 
as function parameters. When a user changes the data in the model by entering a different name 
in the input fields, our formatter will be invoked automatically by the framework. This makes sure 
that the UI is in sync with the data model.

In the formatMail function, we use the sap.m.URLHelper.normalizeEmail function that expects an e-mail address, 
a mail subject and a text body. When a user chooses the link, the default email client will open with these parameters.
For more information, see API Reference: sap.m.URLHelper.normalizeEmail. The mailSubject resource bundle text will 
contain a placeholder for the first name of the recipient (see below). Therefore, we provide the name with [sFirstName].
 * 
 * 
 * 
 */
