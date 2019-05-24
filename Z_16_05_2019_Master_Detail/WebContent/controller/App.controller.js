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
