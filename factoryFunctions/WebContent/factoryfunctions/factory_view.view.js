sap.ui.jsview("factoryfunctions.factory_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf factoryfunctions.factory_view
	*/ 
	getControllerName : function() {
		return "factoryfunctions.factory_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf factoryfunctions.factory_view
	*/ 
	createContent : function(oController) {
 		var oList = new sap.m.List({
 			headerText:"Title List - Factory Functions"
 		});
		
 		oList.bindAggregation(
 			"items",
 			"/names",
 			function(sId,oContext){
 				var sValue = oContext.getProperty("Name");
 				var sDec1 = "Male";
 				var sDec2 = "Female";
 				if (sValue === "Zayidu") {
 					return new sap.m.StandardListItem({
 						title:sValue,
 						description:sDec1
 					})
 					
				}
 				else{
 					return new sap.m.StandardListItem({
 						title:sValue,
 						description:sDec2
 					});
 				}
 			
 		});
		var oPage =  new sap.m.Page({
			title: "Factory Functions",
			content: [
				oList
			]
		});
 		return oPage;
	}

});