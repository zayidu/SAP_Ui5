var	_this;
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
			_this = this;
			var oViewModel = new JSONModel({
				currency: "INR"
			});
			this.getView().setModel(oViewModel, "view");
			
			this.onDataLoad();
		},
		onDataLoad : function(){
			debugger;
			var oModel;
			
			oModel = this.getOwnerComponent().getModel("invoice");
			
			oModel.read("/Et_DataSet",{
				  "success":function(odata,oResponse){
					debugger;
					var _invoice = {
						     "DATA" : odata.results
						   };
					var oInvoice = new JSONModel(_invoice);
					_this.getView().setModel(oInvoice, "INV");
								   
				  },
				  "error":function(oResponse){
				   sap.m.MessageToast.show("Data read fail");
				  }
				  //				   ,
//				  "abort":function(oResponse){
//					   debugger;
//					   sap.m.MessageToast.show("Backened Server Error");
//					  }
//				  
				 });


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
			invoicePath: oItem.getBindingContext("INV").getPath().substr(1).split("/")[1]
//			invoicePath: oEvent.getSource().getBindingContext("INV").getObject()
		});
		
//		"pattern": "detail/{invoicePath}",
		}
	});
});