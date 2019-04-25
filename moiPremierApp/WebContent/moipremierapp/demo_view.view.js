sap.ui.jsview("moipremierapp.demo_view", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf moipremierapp.demo_view
	*/ 
	getControllerName : function() {
		return "moipremierapp.demo_view";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf moipremierapp.demo_view
	*/ 
	createContent : function(oController) {
		
		var oInput = new sap.m.Input({
			placeholder: "Taper Votre nom ..."
		});
		var oBtn = new sap.m.Button({
			text:"Envoyez"
		});
		
 		var oPage = new sap.m.Page({
			title: "Salut Monsieur/Madam, Helo toute le monde...",
			content: [
				oInput,
				oBtn
				
			
			]
		});
		
		return oPage;
	}

});