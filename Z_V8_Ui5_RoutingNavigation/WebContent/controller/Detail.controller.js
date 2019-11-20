sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
], function (Controller, UIComponent , History ) {
	"use strict";
	return Controller.extend("sap.ui.Z.controller.Detail", {
		onInit: function () {
			"use strict";
			debugger;
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			"use strict";
			debugger;
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath.replace("_", "/"),
//				path: oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		}
	});
});

/*
Our last piece to fit the puzzle together is the detail controller. 
It needs to set the context that we passed in with the URL parameter invoicePath on the view, 
so that the item that has been selected in the list of invoices is actually displayed, otherwise, 
the view would simply stay empty.

In the onInit method of the controller we fetch the instance of our app router and attach to the 
detail route by calling the method attachPatternMatched on the route that we accessed by its name. 
We register an internal callback function _onObjectMatched that will be executed when the route is hit, 
either by clicking on the item or by calling the app with a URL for the detail page.

In the _onObjectMatched method that is triggered by the router we receive an event that we can use 
to access the URL and navigation parameters. The arguments parameter will return an object that corresponds 
to our navigation parameters from the route pattern. We access the invoicePath that we set in the invoice 
list controller and call the bindElement function on the view to set the context. We have to add the root / in front 
of the path again that was removed for passing on the path as a URL parameter.

The bindElement function is creating a binding context for a SAPUI5 control and receives the model name as well as 
the path to an item in a configuration object. This will trigger an update of the UI controls that we connected with 
fields of the invoice model. You should now see the invoice details on a separate page when you click on an item in the 
list of invoices.

Conventions
Define the routing configuration in the AppDescriptor


We load a new dependency that helps us to manage the navigation history from the sap.ui.core.routing namespace 
and add the implementation for the event handler to our detail page controller.

In the event handler we access the navigation history and try to determine the previous hash. 
In contrast to the browser history, we will get a valid result only if a navigation step inside our 
app has already happened. Then we will simply use the browser history to go back to the previous page. 
If no navigation has happened before, we can tell the router to go to our overview page directly. 
The third parameter true tells the router to replace the current history state with the new one since we 
actually do a back navigation by ourselves. The second parameter is an empty array ({}) as we do not pass 
any additional parameters to this route.

This implementation is a bit better than the browser’s back button for our use case. The browser would 
simply go back one step in the history even though we were on another page outside of the app. In the app, 
we always want to go back to the overview page even if we came from another link or opened the detail page 
directly with a bookmark. You can try it by loading the detail page in a new tab directly and clicking on the 
back button in the app, it will still go back to the overview page.

*/