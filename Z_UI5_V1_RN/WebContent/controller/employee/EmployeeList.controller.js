sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {
		
		onListItemPressed : function(oEvent){
			"use strict";
			debugger;
			
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}

/*
 * 
 * Finally, we add the handler onListItemPressed for the press event to the EmployeeList controller. 
 * In the handler, we determine the EmployeeID of the list item by querying the binding context and accessing 
 * the property EmployeeID from the data model.

Then we navigate to the employee route and pass a configuration object on to the navTo method with the mandatory 
parameter employeeId filled with the correct EmployeeID. The router always makes sure that mandatory parameters as 
specified in the route’s pattern are set; otherwise an error is thrown.
 * 
 * 
 */	
	
	});
});