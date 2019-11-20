sap.ui.define([
//   "sap/ui/core/mvc/Controller"
	"sap/ui/demo/nav/controller/BaseController"
	
/*
 * In order to reuse the base controller implementation, we have to change the dependency from sap/ui/core/mvc/Controller 
 * to sap/ui/demo/nav/controller/BaseController and directly extend the base controller.
 * 
 * 
 * In SAPUI5 there are multiple options to reuse code. We recommend to use a base controller for such 
 * helper methods because this allows us to decoratively use the onNavBack handler directly in any XML view without 
 * adding additional code to the controller. Our base controller is an abstract controller that will not be instantiated
 *  in any view. Therefore, the naming convention *.controller.js does not apply, and we can just call the file BaseController.js. 
 *  By not using the naming convention *.controller.js we can even prevent any usage in views.
 *  
 *  At this point you can open index.html#/thisIsInvalid in your browser and press the Back button to see what happens. 
 *  You will be redirected to the app’s home page that is matched by the route appHome as you opened the Not Found page 
 *  with an invalid hash. If you change the hash to something invalid when you are on the home page of the app, you will 
 *  also go to the Not Found page but with a history entry. When you press back, you will get to the home page again, but 
 *  this time with a native history navigation.
 *  
 *  
 */	
//], function (Controller) {
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.NotFound", {
/*
 * Next, we have to register an event listener to the display event of the notFound target. 
 * The best place for us to register an event listener for this is inside the init function of our NotFound controller. 
 * There we can access and store the custom data that we are passing on when displaying the target manually.

From the router reference we can fetch a reference to the notFound target. Each target configuration will 
create a runtime object that can be accessed through the router.

Similar to SAPUI5 controls, targets define API methods and events that can be attached. We attach a display 
event handler and save the data that was received as the event parameter data in an internal controller variable _oData. 
This data also includes the fromTarget information in case the caller passed it on. However, we now have to override 
the base controller’s onNavBack implementation to change the behavior a bit. We add a special case for our target back 
functionality in case the fromTarget property has been passed on. If specified, we simply display the target defined as 
fromTarget manually the same way we actually called the notFound target manually. Otherwise we just call the
 base controller’s onNavBack implementation.
 * 
 * 
 */
		onInit: function () {
			"use strict";
			debugger;
			
			
			var oRouter, oTarget;

			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data");	// store the data
			}, this);
		},

		// override the parent's onNavBack (inherited from BaseController)
		onNavBack : function () {
			
			"use strict";
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