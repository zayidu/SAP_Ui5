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
		
		var oTileTemp = new sap.m.StandardTile({
			icon:"{Icon}",
			title:"{Name}",
			info:"{Place}"
		});
		
		
		var oTileCont = new sap.m.TileContainer({

		});
		
		oTileCont.bindAggregation("tiles","/names",oTileTemp);
		
 		var oPage =  new sap.m.Page({
			title: "Title",
			content: [
			
			]
		});
 		return oPage;
	}

});