sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.opensap.controller.App", {
	   
	   onOuvertDialog : function () {
		    debugger;
			this.getOwnerComponent().onOuvertDialog();
		}
	   
   });
});

//sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//	"sap/m/MessageToast" , 
//	"sap/ui/model/json/JSONModel",
//	"sap/ui/model/resource/ResourceModel"
//], function (Controller, MessageToast, JSONModel, ResourceModel) {
//   "use strict";
//   return Controller.extend("sap.ui.opensap.controller.App", {
//	   onInit : function () {
//	         // set data model on view
//	         var oData = {
//	            recipient : {
//	               name : "Le Meilleur"
//	            }
//	         };
//	         
//	         var oModel = new JSONModel(oData);
//	         this.getView().setModel(oModel);
//	      // set i18n model on view
//	         var i18nModel = new ResourceModel({
//	            bundleName: "sap.ui.opensap.i18n.i18n"
//	         });
//	         this.getView().setModel(i18nModel, "i18n");
//	      },
//	   
//	   onBouger : function(){
//		  // alert("Salut Monsieur! Vous etes Magnifique!");
//		   MessageToast.show("Salut Monsieur! Vous etes Magnifique!");
//		   
//		// read msg from i18n model
//	         var oBundle = this.getView().getModel("i18n").getResourceBundle();
//	         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
//	         var sMsg = oBundle.getText("messageNom", [sRecipient]);
//	         // show message
//	         MessageToast.show(sMsg);
//		   
//	   }
//   });
//});

//sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//   "sap/m/MessageToast"
//], function (Controller, MessageToast) {
//   "use strict";
//   return Controller.extend("sap.ui.opensap.controller.App", {
//	   onBouger : function () {
//         // read msg from i18n model
//         var oBundle = this.getView().getModel("i18n").getResourceBundle();
//         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
//         var sMsg = oBundle.getText("messageNom", [sRecipient]);
//         // show message
//         MessageToast.show(sMsg);
//      }
//   });
//});