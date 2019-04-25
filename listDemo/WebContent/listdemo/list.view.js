sap.ui.jsview("listdemo.list", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf listdemo.list
	*/ 
	getControllerName : function() {
		return "listdemo.list";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf listdemo.list
	*/ 
	createContent : function(oController) {
		
		var oData = {
				names:[{

			Name: "Zayidu",
			Place: 	"Pondicherry"
				},
				{
			Name: "Mehwish",
			Place: 	"Patna "	
				}
				
				]
		};
		
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oData);
		
//		var oItem = new sap.m.StandardListItem({
//			title:"{/Name}",
//			description:"{/Place}",
//		});
//		
//		var oList = new sap.m.List({
//			headerText:"Monde",
//			item:[
//				oItem	
//			]
//		});
		
		var oList = new sap.m.List({
			headerText:"Monde",
			item:[
					
			]
		});
		
		
		
		oList.bindItems({
			path:"/names",
			template: new sap.m.StandardListItem({
				title: "{Name}",
				description: "{Place}" 
			
			})
		});
		
		oList.setModel(oModel); 
//		oList.setModel(oModel);
		
 		var oPage = new sap.m.Page({
			title: "Title",
			content: [
				oList
			]
		});
 		return oPage;
	}

});