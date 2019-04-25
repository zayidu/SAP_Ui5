 sap.ui.jsview("tiles.tiles", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf tiles.tiles
	*/ 
	getControllerName : function() {
		return "tiles.tiles";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf tiles.tiles
	*/ 
	createContent : function(oController) {
		
		var oT1 = new sap.m.StandardTile({
			title:"Zayidu",
			info:"Homo-Sapien",
			icon:"sap-icon://sap-ui5"
		});
		
		var oT2 = new sap.m.StandardTile({
			title:"Mehwsih",
			info:"Homo-Sapien",
			icon:"sap-icon://sap-ui5"
		});
		
		var oTileCont = new sap.m.TileContainer({
			tiles:[
				oT1,
				oT2
			]
		});
		
 		var oPage =  new sap.m.Page({
			title: "Title",
			content: [
			
			]
		});
 		return oPage;
	}

});