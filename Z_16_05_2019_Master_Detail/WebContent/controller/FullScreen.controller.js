sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.opensap.controller.FullScreen", {
	   
	   onInit : function () {
		    debugger;
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		
		onShowMaster : function(){
			debugger;
			this.getView().getParent().getParent().setMode("ShowHideMode");
			this.oRouter.navTo("masterDetailRoute");
		}
	   
   });
});
