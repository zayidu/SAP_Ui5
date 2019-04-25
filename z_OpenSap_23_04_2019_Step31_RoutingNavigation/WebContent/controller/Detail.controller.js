sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	return Controller.extend("sap.ui.opensap.controller.Detail", {
		onInit: function () {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
	
		},
		_onObjectMatched: function (oEvent) {
			debugger;
			var arg = oEvent.getParameter("arguments").invoicePath;
			var _value = this.getOwnerComponent().getModel("invoice").getData().Invoices[arg];
			
			var _array = { 
				"oData" : []
			};
			_array.oData.push(_value);
			
			var _model = new sap.ui.model.json.JSONModel();
			_model.setData(_array);
			this.getView().setModel(_model, "AGNI");
			
//			var vText = this.getView().getModel("AGNI").getData().oData[0].ProductName;
			
			
//			this.getView().byId("id_text").setText(vText);
//			this.getView().bindElement({
//				path: "/" + oEvent.getParameter("arguments").invoicePath,
//				model: "invoice"
//			});
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