sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
   "use strict";
   return UIComponent.extend("sap.ui.opensap.Component", {
      metadata : {
            manifest: "json"
      },
      init : function () {
    	  debugger;
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
            	name : "Le Meilleur"
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);
         
	  // create the views based on the url/hash
			this.getRouter().initialize();
		}
   });
});
