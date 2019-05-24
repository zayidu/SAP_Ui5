sap.ui.define([
	"sap/ui/opensap/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.opensap.controller.EmployeeDetail", {
//		onInit: function () {
//			debugger;
//			var oRouter = this.getRouter();
//			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
//			// Hint: we don't want to do it this way
//			/*
//			oRouter.attachRouteMatched(function (oEvent){
//				var sRouteName, oArgs, oView;
//				sRouteName = oEvent.getParameter("name");
//				if (sRouteName === "employee"){
//					this._onRouteMatched(oEvent);
//				}
//			}, this);
//			*/
//		},
//		_onRouteMatched : function (oEvent) {
//			debugger;
//			var oArgs, oView;
//			oArgs = oEvent.getParameter("arguments");
//			oView = this.getView();
//
//			oView.bindElement({
//				path : "/Employees(" + oArgs.employeeId + ")",
//				events : {
//					change: this._onBindingChange.bind(this),
//					dataRequested: function (oEvent) {
//						oView.setBusy(true);
//					},
//					dataReceived: function (oEvent) {
//						oView.setBusy(false);
//					}
//				}
//			});
//		},
//		_onBindingChange : function (oEvent) {
//			debugger;
//			// No data for the binding
//			if (!this.getView().getBindingContext()) {
//				this.getRouter().getTargets().display("notFound");
//			}
//		}
		
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

			var EmployeeID = empL.EmployeeID;
			oView.byId("EmployeeID").setText("Employee Id: " + EmployeeID);
			
			var FirstName = empL.FirstName;
			oView.byId("FirstName").setText(FirstName);
			
			var LastName = empL.LastName;
			oView.byId("LastName").setText(LastName);
			
			var Country = empL.Country;
			oView.byId("Country").setText(Country);
			
//			oView.byId("p_title").setText("Employee Details of " + FirstName + LastName );
			oView.byId("p_title").setTitle(`Employee Details of ${FirstName}  ${LastName} `);
			
			var _model = new JSONModel();
			_model.setData(_array);
			oView.setModel(_model, "EMPLOYEELIST");
			
			
		
		
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onShowResume : function (oEvent) {
			debugger;
			var oView = this.getView();
//			var oValue = oView.byId("EmployeeID").getText().split(":")[1].replace(" ","Resume");
			var oValue = oView.byId("EmployeeID").getText().split(":")[1].replace(" ","");
			oValue = oValue - 1.
//			var oCtx = this.getView().getElementBinding().getBoundContext();

			this.getRouter().navTo("employeeResume", {
				employeeId : oValue ,
				resume     : "resume"
			});
		}
	});
});