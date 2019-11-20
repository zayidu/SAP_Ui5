sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel , formatter , Filter , FilterOperator ) {
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

	});
});