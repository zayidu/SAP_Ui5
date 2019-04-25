sap.ui.jsview("tables.table", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf tables.table
	*/ 
	getControllerName : function() {
		return "tables.table";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf tables.table
	*/ 
	createContent : function(oController) {
		
		
		
		var oCol1 = new sap.ui.table.Column({
			label : new sap.m.Label({
				text:"Name"
			}),
		template:new sap.m.Text({
			text:"{Name}"	
		})
		});
		
		var oCol2 = new sap.ui.table.Column({
			label: new sap.m.Label({
				text:"Place"
			}),
			template:new sap.m.Text({
				text:"{Place}"	
			})
		});
		
		var oCol3 = new sap.ui.table.Column({
			label: new sap.m.Label({
				text:"Id"
			}),
			template:new sap.m.Text({
				text:"{Id}"	
			})
		});
		
		var oTable = new sap.ui.table.Table("idTable",{
			title: "Z Table",
			columns: [
				oCol1,
				oCol2,
				oCol3
			],
			cellClick:[oController.goToNextPage, oController]
			
		});
		
		
		oTable.bindRows({
			path:"/names"
		});
		
 		var oPage =  new sap.m.Page({
			title: "Bienvenue Tous le monde! Je suis Zayidu et Je suis Awesome.",
			content: [
				oTable	
			]
		});
 		
 		return oPage;
 		
	}

});