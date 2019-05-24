sap.ui.define([ 
   "sap/ui/opensap/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.opensap.controller.NotFound", {
      onInit: function () {
    	  var oRouter, oTarget;
    	  	debugger;
			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data");	// store the data
			}, this);
		},

		// override the parent's onNavBack (inherited from BaseController)
		onNavBack : function () {
			debugger;
			// in some cases we could display a certain target when the back button is pressed
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}

			// call the parent's onNavBack
			BaseController.prototype.onNavBack.apply(this, arguments);
		
      }
   });
});