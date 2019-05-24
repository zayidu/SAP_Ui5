var _this;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",	
	"sap/ui/core/UIComponent"
	
], function (Controller, History, MessageToast, JSONModel , UIComponent) {
	"use strict";
	return Controller.extend("sap.ui.opensap.controller.Detail", {
		onInit: function () {
			debugger;
			
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			_this = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//			this._dataLoad();
			debugger;
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
						
		},
		_onObjectMatched: function (oEvent) {
			debugger;
			var arg = oEvent.getParameter("arguments").invoicePath;
//			var _value = this.getOwnerComponent().getModel("invoice").getData().Invoices[arg];
			var _value = this.getOwnerComponent().getModel("invoice");
			var oView = this.getView();
			_value.read("/Et_DataSet",{
				  "success":function(odata,oResponse){
					  debugger;
					  
//						var _invoice = {
//							     "DATA" : odata.results[arg]
//							   };
//						var oInvoice = new JSONModel(_invoice);
//						_this.getView().setModel(oInvoice, "INV");
//						
						var _array = { 
								"DATA" : []
							};
							_array.DATA.push(odata.results[arg]);
							
							var _model = new JSONModel();
							_model.setData(_array);
							oView.setModel(_model, "INV");
				   
				  },
				  "error":function(oResponse){
				   sap.m.MessageToast.show("fail");
				  }
				  
				 });
			
		
		},
		
//		_dataLoad : function(){
//			debugger;
//			var oModel;
//			oModel = this.getOwnerComponent().getModel("invoice");
//			
//			oModel.read("/Et_DataSet",{
//				  "success":function(odata,oResponse){
//					  debugger;
//						var _invoice = {
//							     "DATA_2" : odata.results
//							   };
//						var oInvoice = new JSONModel(_invoice);
//						_this.getView().setModel(oInvoice, "INV_2");
//				   
//				  },
//				  "error":function(oResponse){
//				   sap.m.MessageToast.show("fail");
//				  }
//				  
//				 });
//
//
//		},

		onNavBack: function () {
			debugger;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		},

		onRatingChange: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});