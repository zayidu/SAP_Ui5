sap.ui.jsview("evwntadvance.eventAdvance", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf evwntadvance.eventAdvance
	*/ 
	getControllerName : function() {
		return "evwntadvance.eventAdvance";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf evwntadvance.eventAdvance
	*/ 
	createContent : function(oController) {
 		
		var oBtn = new sap.m.Button({
			text: "Zayidu"
		}).addEventDelegate({
			onAfterRendering: funtion(oBtn){
				$(oBtn.srcControl.getDomRef()).draggable({
					cancel:false
				});
			} 
		});
		
		var oPage =  new sap.m.Page({
			title: "Draggable Button UI:",
			content: [
				oBtn
			]
		});
 		
 		return oPage;
	}

});