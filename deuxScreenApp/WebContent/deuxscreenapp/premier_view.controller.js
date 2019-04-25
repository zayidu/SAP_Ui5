sap.ui.controller("deuxscreenapp.premier_view", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf deuxscreenapp.premier_view
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf deuxscreenapp.premier_view
*/
//	onBeforeRendering: function() {
		
//	},
	 goToDeuxieme : function(oEvt) {
		var oLabel = sap.ui.getCore().byId("idlabel");
		var oInput = sap.ui.getCore().byId("idinput").getValue();
		
		if (oInput !== undefined) {
			oLabel.setText(oInput);
		app.to("idpremier_view2");
		}
		
	}
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf deuxscreenapp.premier_view
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf deuxscreenapp.premier_view
*/
//	onExit: function() {
//
//	}

});