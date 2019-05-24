sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.opensap.controller.FullScreen", {
	   
	   onInit : function () {
		    debugger;
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		
		onShowFull : function(){
			debugger;
			this.getView().getParent().getParent().setMode("HideMode");
			this.oRouter.navTo("fullScreenRoute");
		}
	   
   });
});
