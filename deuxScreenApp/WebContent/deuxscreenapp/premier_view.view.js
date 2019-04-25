sap.ui.jsview("deuxscreenapp.premier_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf deuxscreenapp.premier_view
	*/ 
	getControllerName : function() {
		return "deuxscreenapp.premier_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf deuxscreenapp.premier_view
	*/ 
	createContent : function(oController) {
		
		var oInput = new sap.m.Input("idinput" , {
			placeholder: "Taper Votre nom ..."
		});
		var oBtn = new sap.m.Button("idbutton" , {
			text:"Envoyez",
			press: [oController.goToDeuxieme, oController]
		})
		
 		var oPage = new sap.m.Page({
			title: "Premier Screen",
			content: [
				oInput,
				oBtn
				
			
			]
		});
		
		return oPage;
	}

});