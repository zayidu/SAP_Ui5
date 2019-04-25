sap.ui.jsview("listdemo.view_2", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf listdemo.view_2
	*/ 
	getControllerName : function() {
		return "listdemo.view_2";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf listdemo.view_2
	*/ 
	createContent : function(oController) {
		var oLabel = new sap.m.Label({
			text:"{label>/data}",
		});
		
 		var oPage =  new sap.m.Page({
			title: "Bienvenue de Deuxieme Screen",
			showNavButton:true,
			navButtonPress: function(){
				app.back(); 
			},
			content: [
				oLabel
			]
		});
 		return oPage;
	}

});