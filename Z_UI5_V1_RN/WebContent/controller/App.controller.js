sap.ui.define([
//	"sap/ui/core/mvc/Controller"
	"sap/ui/demo/nav/controller/BaseController"
/*
 * In order to reuse the base controller implementation, we have to change the dependency from sap/ui/core/mvc/Controller 
 * to sap/ui/demo/nav/controller/BaseController and directly extend the base controller.
 * 
 * To be consistent, we will now extend all of our controllers with the base controller. 
 * Change the app controller as described above.
 */	
	
	
//], function (Controller) {
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.App", {

		onInit: function () {
			// This is ONLY for being used within the tutorial.
			// The default log level of the current running environment may be higher than INFO,
			// in order to see the debug info in the console, the log level needs to be explicitly
			// set to INFO here.
			// But for application development, the log level doesn't need to be set again in the code.
//			Log.setLevel(Log.Level.INFO);

			var oRouter = this.getRouter();
/*
 * All we need to do is listen to the bypassed event on the router. If the bypassed event is triggered, 
 * we simply get the current hash and log a message. In an actual app this is probably the right place to add some 
 * application analysis features, i.e. sending analytical logs to the back end for later evaluation and processing. 
 * This could be used to improve the app, for example, to find out why the user called the app with an invalid hash.
Note
We have chosen to place this piece of code into the App controller because this is a global feature of the app. 
However, you could also place it anywhere else, for example in the NotFound controller file or in a helper module related 
to analysis.

Now try to access webapp/index.html#/thisIsInvalid while you have your browser console open. As you can see, there is a 
message that issues a faulty hash. Furthermore, our NotFound page is displayed. 
 */
			oRouter.attachBypassed(function (oEvent) {
				var sHash = oEvent.getParameter("hash");
				// do something here, i.e. send logging data to the backend for analysis
				// telling what resource the user tried to access...
				jQuery.sap.log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
				Log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
			});
			
			
/*
 * We extend the App controller again and listen to the routeMatched event. The routeMatched event is thrown 
 * for any route that matches to our route configuration in the descriptor file. In the event handler, we determine 
 * the name of the matched route from the event parameters and log it together with a time stamp. In an actual app, 
 * the information could be sent to a back-end system or an analytics server to find out more about the usage of your app.

Now you can access, for example, webapp/index.html#/employees while you have the console of the browser open. 
As you can see, there is a message logged for each navigation step that you do within the app.
 */			
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName = oEvent.getParameter("name");
				// do something, i.e. send usage statistics to back end
				// in order to improve our app and the user experience (Build-Measure-Learn cycle)
				jQuery.sap.log.info("User accessed route " + sRouteName + ", timestamp = " + new Date().getTime());
			});

		}

	});

});

