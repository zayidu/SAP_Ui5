sap.ui.jsview("deuxscreenapp.DeuxiemeScreen", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf deuxscreenapp.DeuxiemeScreen
	*/ 
	getControllerName : function() {
		return "deuxscreenapp.DeuxiemeScreen";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf deuxscreenapp.DeuxiemeScreen
	*/ 
	createContent : function(oController) {
		var olabel = new sap.m.Label("idlabel");
 		var oPage =  new sap.m.Page({
			title: "Deuxieme Screen",
			showNavButton:true,
			navButtonPress:function(oEvt){
				app.back();
				
			},
			content: [
				olabel
			]
		});
 		return oPage;
	}

});