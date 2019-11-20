sap.ui.define([
	 "sap/ui/core/UIComponent",
	 "sap/ui/model/json/JSONModel",
	 "sap/ui/model/resource/ResourceModel",
	 "./controller/HelloDialog"
],
	function (UIComponent , JSONModel , ResourceModel , HelloDialog ) {
		"use strict";
		return UIComponent.extend("sap.ui.Z.Component",{
//			We create an initial Component.js file in the webapp folder that will hold 
//			our application setup. The init function of the component is automatically 
//			invoked by SAPUI5 when the component is instantiated. Our component inherits 
//			from the base class sap.ui.core.UIComponent and it is obligatory to make the 
//			super call to the init function of the base class in the overridden init method.			
			
//			METADATA Section
			
//			metadata : {
//		         rootView: {
//		            "viewName": "sap.ui.Z.view.App",
//		            "type": "XML",
//		            "async": true,
//		            "id": "app"
//		         }
//		      },
		      
		      
//		      Descriptor for Applications
		      metadata : {
		            manifest: "json"
		      }, 
		      
//		      All application-specific configuration settings will now further be put in a separate 
//		      descriptor file called manifest.json . This clearly separates the application coding 
//		      from the configuration settings and makes our app even more flexible. For example, all 
//		      SAP Fiori applications are realized as components and come with a descriptor file in 
//		      order to be hosted in the SAP Fiori launchpad .
		      
//		      The SAP Fiori launchpad acts as an application container and instantiates the app 
//		      without having a local HTML file for the bootstrap. Instead, the descriptor file 
//		      will be parsed and the component is loaded into the current HTML page. 
//		      This allows several apps to be displayed in the same context. Each app can define local settings, 
//		      such as language properties, supported devices, and more. And we can also use the descriptor file 
//		      to load additional resources and instantiate models like our i18n resource bundle.
		      
//		      Automatic model instantiation is only available as of SAPUI5 version 1.30. 
//		      If you are using an older version, you can manually instantiate the resource bundle
//		      and other models of the app in the init method of the Component.js file as we did in 
//		      Step 9: Component Configuration.
		      
//		      The content of the manifest.json file is a configuration object in JSON format 
//		      that contains all global application settings and parameters. The manifest file is called
//		      the descriptor for applications, components, and libraries and is also referred to as “descriptor” 
//		      or “app descriptor” when used for applications. It is stored in the webapp folder and read by SAPUI5 
//		      to instantiate the component. There are three important sections defined by namespaces in the manifest.json file:
//		    	  
//		    	  sap.app:
//
//		    	  The sap.app namespace contains the following application-specific attributes:
//		    	  id (mandatory): The namespace of our application component
//
//		    	  The ID must not exceed 70 characters. It must be unique and must correspond to the component ID/namespace.
//
//		    	  type: Defines what we want to configure, here: an application
//
//		    	  i18n: Defines the path to the resource bundle file
//
//		    	  title: Title of the application in handlebars syntax referenced from the app's resource bundle
//
//		    	  description: Short description text what the application does in handlebars syntax referenced from the app's resource bundle
//
//		    	  applicationVersion: The version of the application to be able to easily update the application later on
//
//		    	  
//		    	  
//		    	  sap.ui:
//
//		    	  The sap.ui namespace contributes the following UI-specific attributes:
//		    	  technology: This value specifies the UI technology; in our case we use SAPUI5
//
//		    	  deviceTypes: Tells what devices are supported by the app: desktop, tablet, phone (all true by default)
//
//		    	  
//		    	  
//		    	  sap.ui5:
//
//		    	  The sap.ui5 namespace adds SAPUI5-specific configuration parameters that are automatically processed by SAPUI5. The most important parameters are:
//		    	  rootView: If you specify this parameter, the component will automatically instantiate 
//		    	  the view and use it as the root for this component
//
//		    	  dependencies: Here we declare the UI libraries used in the application
//
//		    	  models: In this section of the descriptor we can define models that will be automatically 
//		    	  instantiated by SAPUI5 when the app starts. Here we can now define the local resource bundle. 
//		    	  We define the name of the model "i18n" as key and specify the bundle file by namespace. As in 
//		    	  the previous steps, the file with our translated texts is stored in the i18n folder and 
//		    	  named i18n.properties. We simply prefix the path to the file with the namespace of our 
//		    	  app. The manual instantiation in the app component's init method will be removed later in this step.
//
//		    	  For compatibility reasons the root object and each of the sections state the descriptor 
//		    	  version number 1.1.0 under the internal property _version. Features might be added or changed in 
//		    	  future versions of the descriptor and the version number helps to identify the application settings 
//		    	  by tools that read the descriptor.
		      
//		      Note
//		      Properties of the resource bundle are enclosed in two curly brackets in the descriptor. 
//		      This is not a SAPUI5 data binding syntax, but a variable reference to the resource bundle in 
//		      the descriptor in handlebars syntax. The referred texts are not visible in the app built in this 
//		      tutorial but can be read by an application container like the SAP Fiori launchpad.
		      
//		      In the component's metadata section, we now replace the rootView property with the property 
//		      key manifest and the value json. This defines a reference to the descriptor that will be loaded and parsed 
//		      automatically when the component is instantiated. We can now completely remove the lines of code containing the 
//		      model instantiation for our resource bundle. It is done automatically by SAPUI5 with the help of the configuration 
//		      entries in the descriptor. We can also remove the dependency to sap/ui/model/resource/ResourceModel 
//		      and the corresponding formal parameter ResourceModel because we will not use this inside our anonymous callback function.
		      
//		      Tip
//		      In previous versions of SAPUI5, additional configuration settings for the app, like the service 
//		      configuration, the root view, and the routing configuration, had to be added to the metadata 
//		      section of the Component.js file. As of SAPUI5 version 1.30, we recommend that you define these
//		      settings in the manifest.json descriptor file. Apps and examples that were created based on an older
//		      SAPUI5 version still use the Component.js file for this purpose - so it is still supported, but not recommended.
		      
//		      Conventions
//		      The descriptor file is named manifest.json and located in the webapp folder.
//
//		      Use translatable strings for the title and the description of the app.
			
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
		         
		         
		         
		      // set Reuse dialog:
					this._helloDialog = new HelloDialog(this.getRootControl());
				},
				
//				The dialog instantiation is refactored to a new helper object which is stored in a private 
//				property of the component. For instantiation of the helper object, we have to pass the view 
//				instance to which the dialog is added (see method call addDependent in the implementation of the 
//				helper object HelloDialog.js below).
//
//				
//				We want to connect the reuse dialog to the lifecycle of the root view of the app, so we pass 
//				an instance of the root view on to the constructor. It can be retrieved by calling the getRootControl 
//				method of the component.				
				
//				Note
//				As defined in parameter rootView in the manifest.json file, 
//				our root view is sap.ui.Z.view.App. From the component, the root view can be retrieved 
//				at runtime by accessing the rootControl aggregation.
				
//				To be able to open the dialog from other controllers as well, we implement a reuse function openHelloDialog
//				which calls the open method of our helper object. By doing so, we also decouple the implementation details 
//				of the reuse dialog from the application coding.
//
//				Up to this point we added the new property _helloDialog to the component and assigned an instance of the 
//				HelloDialog object to it. We want to make sure that the memory allocated for this helper object is freed 
//				up when the component is destroyed. Otherwise our application may cause memory leaks.
//
//				To do so, we use the exit hook. The SAPUI5 framework calls the function assigned to exit when destroying 
//				the component. We call the destroy function of HelloDialog to clean up the helper class and end its lifecycle.
//				Nevertheless, the instance itself would still exist in the browser memory. Therefore we delete our reference 
//				to the HelloDialog instance by calling delete this._helloDialog and the garbage collection of the browser can 
//				clean up its memory.
				
//				Note
//				We don't have to destroy the instance of JSONModel that we created, because we assigned it to the component
//				with the setModel function. The SAPUI5 framework will destroy it together with the component.

				exit : function() {
					this._helloDialog.destroy();
					delete this._helloDialog;
				},

				openHelloDialog : function () {
					this._helloDialog.open();
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