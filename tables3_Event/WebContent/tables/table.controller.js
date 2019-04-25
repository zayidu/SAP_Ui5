sap.ui.controller("tables.table", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf tables.table
*/
	onInit: function() {
		
		var oPage2 = sap.ui.view({id:"idtable2", viewName:"tables.table", type:sap.ui.core.mvc.ViewType.JS});
		app.addPage(oPage2);
		
		var oData = {
				names:[{
			Id:	1,	
			Name: "Zayidu",
			Place: 	"Pondicherry"
				},
				{
					Id:	2 ,
			Name: "Mehwish",
			Place: 	"Patna "	
				}
				
				]
		};
		
		
		var oModel = new sap.ui.model.json.JSONModel(oData);
//		oModel.setData(oData);
		sap.ui.getCore().setModel(oModel);

	},
		
	goToNextPage: function(oEvt){
		var sVal = oEvt.getParameters().rowBindingContext.getProperty("Name");
		
		if(sVal !== undefined ){
		sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({
			"data": sVal
		}), "label") ;
		}
		app.to("idtable2");
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf tables.table
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf tables.table
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf tables.table
*/
//	onExit: function() {
//
//	}

});