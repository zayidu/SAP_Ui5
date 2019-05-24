sap.ui.define([
	"sap/ui/opensap/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.opensap.controller.Resume", {
		onInit: function () {
			debugger;
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			debugger;
			var oRouter
			var Args, oView;
			var _value = this.getOwnerComponent().getModel("employees");
			Args = oEvent.getParameter("arguments").employeeId;
			oView = this.getView();
			var empL = _value.getData().Employees[Args];
			
			var EmployeeID = empL.EmployeeID;
			oView.byId("EmployeeID").setText("Employee Id: " + EmployeeID);
			
			var FirstName = empL.FirstName;
			oView.byId("FirstName").setText(FirstName);
			
			var LastName = empL.LastName;
			oView.byId("LastName").setText(LastName);
			
			var Country = empL.Country;
			oView.byId("projectsTab").setText(Country);
			
			var Hobbies = "Ui5'ing, ABAP'ing";
			oView.byId("hobbiesValue").setText(Hobbies);
			
			oView.byId("employeeResumePage").setTitle(`ResumeOf ${FirstName} ${LastName}`);
			
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
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});