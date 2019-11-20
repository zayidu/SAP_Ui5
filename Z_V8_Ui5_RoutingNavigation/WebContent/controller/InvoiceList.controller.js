sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent"
], function (Controller, JSONModel , formatter , Filter , FilterOperator , UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.Z.controller.InvoiceList", {
		
		formatter: formatter,
		
		onInit : function () {
			
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			
//			To be able to access the currency code that is not part of our data model, we define a view model 
//			in the controller of the invoice list. It is a simple JSON model with just one key currency and the value EUR. 
//			This can be bound to the formatter of the number field. View models can hold any configuration options assigned 
//			to a control to bind properties such as the visibility.
//
//			Conventions
//			Use data types instead of custom formatters whenever possible.
			
/*
 * To load our formatter functions, we have to add it to the InvoiceList.controller.js. In this controller, 
 * we first add a dependency to our custom formatter module. The controller simply stores the loaded formatter 
 * functions in the local property formatter to be able to access them in the view.
 * 
 */
			
		},
		onFilterInvoices : function (oEvent) {
			"use strict";
			debugger;
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			
/*
 * We load two new dependencies for the filtering. The filter object will hold our configuration for 
 * the filter action and the FilterOperator is a helper type that we need in order to specify the filter.

In the onFilterInvoices function we construct a filter object from the search string that the user 
has typed in the search field. Event handlers always receive an event argument that can be used to access 
the parameters that the event provides. In our case the search field defines a parameter query that we access by 
calling getParameter(“query”) on the oEvent parameter.

If the query is not empty, we add a new filter object to the still empty array of filters. However, 
if the query is empty, we filter the binding with an empty array. This makes sure that we see all list elements 
again. We could also add more filters to the array, if we wanted to search more than one data field. In our example, 
we just search in the ProductName path and specify a filter operator that will search for the given query string.

The list is accessed with the ID that we have specified in the view, because the control is automatically prefixed 
by the view ID, we need to ask the view for the control with the helper function byId. On the list control we access 
the binding of the aggregation items to filter it with our newly constructed filter object. This will automatically filter 
the list by our search string so that only the matching items are shown when the search is triggered. 
The filter operator FilterOperator.Contains is not case-sensitive.

 */			

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
		,
		onPress: function (oEvent) {
			"use strict";
			debugger;
//			var oRouter = UIComponent.getRouterFor(this);
//			oRouter.navTo("detail");
//			We add the event handler function to the controller of our invoices list. 
//			Now it is time to navigate to the detail page by clicking an item in the invoice list. 
//			We access the router instance for our app by calling the helper method sap.ui.core.UIComponent.getRouterFor(this). 
//			On the router we call the navTo method to navigate to the detail route that we specified in the routing configuration.
//
//			You should now see the detail page when you click an item in the list of invoices.
//
//			Conventions
//			Define the routing configuration in the descriptor
			
			var oItem = oEvent.getSource();
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
//				invoicePath: oItem.getBindingContext("invoice").getPath()
				invoicePath: oItem.getBindingContext("invoice").getPath().substr(1).replace("/", "_")
//				invoicePath: oItem.getBindingContext("invoice").getProperty().ProductName
				
/*
 * The control instance that has been interacted with can be accessed by the getSource method that 
 * is available for all SAPUI5 events. It will return the ObjectListItem that has been clicked in our case. 
 * We will use it to pass the information of the clicked item to the detail page so that the same item can be displayed there.

In the navTo method we now add a configuration object to fill the navigation parameter invoicePath 
with the current information of the item. This will update the URL and navigate to the detail view at the same time. 
On the detail page, we can access this context information again and display the corresponding item.

To identify the object that we selected, we would typically use the key of the item in the back-end system 
because it is short and precise. For our invoice items however, we do not have a simple key and directly use the binding 
path to keep the example short and simple. The path to the item is part of the binding context which is a helper 
object of SAPUI5 to manage the binding information for controls. The binding context can be accessed by calling the 
getBindingContext method with the model name on any bound SAPUI5 control. We need to remove the first / 
from the binding path by calling .substr(1) on the string because this is a special character in URLs and is not 
allowed, we will add it again on the detail page.
 */				
			});
			
		}

	});
});