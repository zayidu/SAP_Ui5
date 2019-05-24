sap.ui.define([
	"sap/ui/opensap/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.opensap.controller.EmployeeList", {
		onListItemPressed : function(oEvent){
			debugger;
			var oItem, oCtx;
			oItem = oEvent.getSource();
//			oCtx = oItem.getBindingContext();
			
			var oPath = oItem.getBindingContext('employees');
//			oPath.getPath().substr(1).replace('/','.').split('.')[1];
			
			
			this.getRouter().navTo("employeeDetail",{
//				employeeId : oCtx.getProperty("EmployeeID")
				employeeId : oPath.getPath().substr(1).replace('/','.').split('.')[1]
//			    employeeId : oPath.getPath().substr(1)
			});
		}
	});
});