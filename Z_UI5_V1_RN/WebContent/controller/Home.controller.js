sap.ui.define([
//   "sap/ui/core/mvc/Controller"
	"sap/ui/demo/nav/controller/BaseController"
	/*
	 * In order to reuse the base controller implementation, we have to change the dependency from sap/ui/core/mvc/Controller 
	 * to sap/ui/demo/nav/controller/BaseController and directly extend the base controller.
	 * 
	 * To be consistent, we will now extend all of our controllers with the base controller. 
	 * Change the app controller as described above.
	 * 
	 * Conventions
Implement a global onNavBack handler for back navigation in your app
Query the history and go to the home page if there is no history available for the current app

	 */	
	
//], function (Controller) {
	], function (BaseController) {
   "use strict";

   return BaseController.extend("sap.ui.demo.nav.controller.Home", {
	   onDisplayNotFound : function () {
		   "use strict";
			debugger;
			//display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget : "home"   // This time we pass on a data object as the second parameter for the display method which 
//					contains the name of the current target; the one from which we navigate to the notFound target. We decide to 
//					choose the key fromTarget but since it is a custom configuration object any other key would be fine as well.
					});
		/*
		 * Inside the onDisplayNotFound handler we get a reference to the Targets helper object of the 
		 * router and simply call display("notFound"). The view associated to the target with the name 
		 * notFound from the routing configuration will be displayed by the router without changing the hash.

The sap.m.routing.Targets object itself can be retrieved by calling getTargets() on the router. 
It provides a convenient way for placing views into the correct containers of your application. 
The main benefits of targets are structuring and lazy loading: you just configure the views in the routing 
Configuration and you do not have to load the views until you really need them.

In the example code we get a reference to the sap.m.routing.Targets object by calling getTargets() 
on this.getRouter() from the base controller. However, you could also get a reference to the sap.m.routing.Targets 
object by calling this.getOwnerComponent().getRouter().getTargets() or this.getOwnerComponent().getTargets().

If you now call the app and press the Display Not Found button you see that the notFound target is displayed 
without changing the URL. That was easy, but suddenly our app’s Back button does not work anymore. 
The bug we have just introduced illustrates an interesting navigation trap. The application hash is still empty since 
we just display the target and did not hit a route.

When pressing the app’s Back button, the onNavBack from the previous step is called. It detects that there 
is no previous hash and therefore tries to navigate to the appHome route again. The router is smart enough to 
detect that the current hash did not change and therefore skips the navigation to the route. Fortunately, there 
is an easy workaround for us. However, we need to touch the Home controller again.

This time we pass on a data object as the second parameter for the display method which contains the name of the 
current target; the one from which we navigate to the notFound target. We decide to choose the key fromTarget but 
since it is a custom configuration object any other key would be fine as well.

Conventions
Display targets manually if you want to trigger a navigation without changing the hash
Think carefully about all navigation patterns in your application, otherwise the user might get stuck

		 */
			},
			
			onNavToEmployees : function (){
				this.getRouter().navTo("employeeList");
			}
/*
 * The new event handler onNavToEmployees calls navTo("employeeList") on the router instance. 
 * The parameter employeeList is the name of the route that we want to navigate to.
 */   
			,
			onNavToEmployeeOverview : function ()  {
				this.getRouter().navTo("employeeOverview");
			}
			
/*
 * In this step, we will add a new button to the home page to illustrate the usage of multiple targets for a route. 
 * When the button is pressed, a new page opens that contains two parts: a header part at the top and a content part. 
 * The content part displays a table of employees that can be sorted and searched. We will use the array notation in 
 * the routing configuration to assign multiple targets to a route - a feature that we have not yet introduced.
 * 
 */			
   });

});