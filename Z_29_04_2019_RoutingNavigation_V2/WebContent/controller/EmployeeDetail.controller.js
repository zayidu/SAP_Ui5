sap.ui.define([
	"sap/ui/opensap/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.opensap.controller.EmployeeDetail", {
		onInit: function () {
			debugger;
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeDetail").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			/*
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			*/
		},
		_onRouteMatched : function (oEvent) {
			debugger;
			var arg = oEvent.getParameter("arguments").employeeId;
//			var _value = this.getOwnerComponent().getModel("invoice").getData().Invoices[arg];
			var _value = this.getOwnerComponent().getModel("employees");
			var oView = this.getView();
			
			var empL = _value.getData().Employees[arg];
			var _array = { 
					"DATA" : []
				};
			_array.DATA.push(empL);
			
			var _model = new JSONModel();
			_model.setData(_array);
			oView.setModel(_model, "EMPLOYEELIST");
		
		
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});