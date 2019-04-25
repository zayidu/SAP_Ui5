sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.opensap.controller.InvoiceList", {
		
		formatter: formatter,
		onInit : function () {
			debugger;
			var oViewModel = new JSONModel({
				currency: "INR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices : function (oEvent) {
			debugger;
			// build filter arraySS
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onPress: function (oEvent) {
			debugger;
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//			oRouter.navTo("detail");
			oRouter.navTo("detail", {
//			invoicePath: oItem.getBindingContext("invoice").getPath().substr(1).replace("/",".")
//			invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
			invoicePath: oItem.getBindingContext("invoice").getPath().split("/")[2]
//				invoicePath: "01"
		});
		
//		"pattern": "detail/{invoicePath}",
		}
	});
});