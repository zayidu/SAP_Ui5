sap.ui.jsview("simpleform.form", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf simpleform.form
	*/ 
	getControllerName : function() {
		return "simpleform.form";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf simpleform.form
	*/ 
	createContent : function(oController) {
		
		var oLabel = new sap.m.Label({
			text: 'Form'
		});
		var oInput = new sap.m.Input({
			placeholder: "Taper Votre nom ..."
		});
		var oRI = new sap.m.RatingIndicator({
			
		});
		var oBtn = new sap.m.Button({
			text:"Envoyez"
		});
		var oDate = new sap.m.DatePicker({
			
		});
//		var oFile = new sap.ui.unified.FileUploader({
//			
//		}),
		
		
 		var oPage = new sap.m.Page({
			title: "Z_Form",
			content: [
				oLabel,
				oInput,
				oRI,
				oBtn,
				oDate,
//				oFile
				
			]
		});
 		
 		
 		return oPage;
	}

});