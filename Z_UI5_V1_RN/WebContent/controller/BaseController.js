/*
The onNavBack function will handle the actual back navigation. We could directly add this function to the view’s 
controller. However, we are smart enough to anticipate that we might need the same handler function for different views. 
DRY (“Don’t Repeat Yourself”) is the right approach for us, so let’s create a BaseController from which all other controllers
 will inherit.
*/

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.demo.nav.controller.BaseController", {

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}
		
/*
 * Create a new BaseController.js file in the webapp/controller folder. The base controller implements a 
 * set of functions that are reused by its subclasses. The onNavBack handler is a great example of code that
 *  we don’t want to duplicate in our controllers for each page that has a back navigation.

The function checks if there is a previous hash value in the app history. If so, it redirects to the previous 
hash via the browser’s native History API. In case there is no previous hash we simply use the router to navigate 
to the route appHome which is our home view.
*/
//The third parameter of navTo("appHome", {}, true /*no history*/); has the value true and makes sure that the 
//hash is replaced. With the line sap.ui.core.UIComponent.getRouterFor(this) you can easily access your component’s 
//router throughout the app. To make it even more comfortable, we also add a handy shortcut getRouter to the base controller. 
//This function is now available in each subclass as well. It is also used in the onNavBack handler to get a reference to 
//the router before calling navTo. We now have to implement the reuse in all other controllers.
// 
//*/		
/*
 * Note
In SAPUI5 there are multiple options to reuse code. We recommend to use a base controller for 
such helper methods because this allows us to decoratively use the onNavBack handler directly in any XML 
view without adding additional code to the controller. Our base controller is an abstract controller that 
will not be instantiated in any view. Therefore, the naming convention *.controller.js does not apply, and 
we can just call the file BaseController.js. By not using the naming convention *.controller.js we can even 
prevent any usage in views.
 */		

	});

});