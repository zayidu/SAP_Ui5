sap.ui.controller("tiles.tiles", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf tiles.tiles
*/
	onInit: function() {
		
		var oData = {
				names:[{
			Icon:"sap-icon://sap-ui5",	
			Name: "Zayidu",
			Place: 	"Pondicherry"
				},
				{
			Icon:"sap-icon://sap-ui5",
			Name: "Mehwish",
			Place: 	"Patna "	
				}
				
				]
		};
		
		var oModel = new sap.ui.model.json.JSONModel(oData);
//		oModel.setData(oData);
		sap.ui.getCore().setModel(oModel);

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf tiles.tiles
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf tiles.tiles
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf tiles.tiles
*/
//	onExit: function() {
//
//	}

});