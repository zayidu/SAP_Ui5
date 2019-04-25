sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
   "use strict";
   return Controller.extend("sap.ui.opensap.controller.app_Main", {
	   onBouger : function () {
		   debugger;
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
         var sMsg = oBundle.getText("messageNom", [sRecipient]); // messageNom is in i18n.properties
         // show message
         MessageToast.show(sMsg);
      },
		onOuvertDialog : function () {
			debugger;
			this.getOwnerComponent().onOuvertDialog();
		}
   });
});