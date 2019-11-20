sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("invoiceStatusA");
				case "B":
					return resourceBundle.getText("invoiceStatusB");
				case "C":
					return resourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		}
	};
});

/*
 * We create a new folder model in our app project. The new formatter file is placed in the model 
 * folder of the app, because formatters are working on data properties and format them for display on the UI. 
 * So far we did not have any model-related artifacts, except for the Invoices.json file, we will now add the 
 * folder webapp/model to our app. This time we do not extend from any base object but just return a JavaScript object
  with our formatter functions inside the sap.ui.define call.

Function statusText gets the technical status from the data model as input parameter and returns a human-readable 
text that is read from the resourceBundle file.
 */
