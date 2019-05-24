sap.ui.define([
	"sap/ui/opensap/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	return BaseController.extend("sap.ui.opensap.controller.Resume", {
		onInit: function () {
			debugger;
			var oRouter = this.getRouter();
			this.getView().setModel(new JSONModel(), "view");
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			debugger;
			var oRouter
			var Args, oView, oQuery;
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
			
			debugger;
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				this.getRouter().navTo("employeeResume", {
					employeeId : oArgs.employeeId,
					query: {
						tab : _aValidTabKeys[0]
					}
				},true /*no history*/);
			}
			
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
		},
		onTabSelect : function (oEvent){
			debugger;
			var oView = this.getView();
			var oValue = oView.byId("EmployeeID").getText().split(":")[1].replace(" ","");
			oValue = oValue - 1.
//			var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId : oValue,
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		}

	});
});