sap.ui.define([
	 "sap/ui/core/UIComponent",
	 "sap/ui/model/json/JSONModel",
	 "sap/ui/model/resource/ResourceModel"
],
	function (UIComponent , JSONModel , ResourceModel ) {
		"use strict";
		return UIComponent.extend("sap.ui.Z.Component",{
//			We create an initial Component.js file in the webapp folder that will hold 
//			our application setup. The init function of the component is automatically 
//			invoked by SAPUI5 when the component is instantiated. Our component inherits 
//			from the base class sap.ui.core.UIComponent and it is obligatory to make the 
//			super call to the init function of the base class in the overridden init method.
			
//			METADATA Section
			metadata : {
		         rootView: {
		            "viewName": "sap.ui.Z.view.App",
		            "type": "XML",
		            "async": true,
		            "id": "app"
		         }
		      },
			
			
//		      INIT function 
			init : function(){
				"use strict";
				UIComponent.prototype.init.apply(this, arguments);
				
				// set data model
		         var oData = {
		            recipient : {
		               name : "Monde"
		            }
		         };
		         var oModel = new JSONModel(oData);
		         this.setModel(oModel);

		         // set i18n model
		         var i18nModel = new ResourceModel({
		            bundleName : "sap.ui.Z.i18n.i18n"
		         });
		         this.setModel(i18nModel, "i18n");
			}
		      
//		      The Component.js file consists of two parts now: The new metadata section that simply 
//		      defines a reference to the root view and the previously introduced init function that 
//		      is called when the component is initialized. Instead of displaying the root view directly 
//		      in the index.html file as we did previously, the component will now manage the display of the app view.
//
//		      In the init function we instantiate our data model and the i18n model like we did before 
//		      in the app controller. Be aware that the models are directly set on the component and not 
//		      on the root view of the component. However, as nested controls automatically inherit the models 
//		      from their parent controls, the models will be available on the view as well.	
		      
//		      Conventions
//		      The component is named Component.js.
//
//		      Together with all UI assets of the app, the component is located in the webapp folder.
//
//		      The index.html file is located in the webapp folder if it is used productively.
		      
		      
		});
});