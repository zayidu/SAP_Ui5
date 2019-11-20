//We define the app controller in its own file by extending the Controller 
//object of the SAPUI5 core. In the beginning it holds only a single function 
//called onShowHello that handles the button's press event by showing an alert.

//Conventions:
//Controller names are capitalized
//
//Controllers carry the same name as the related view (if there is a 1:1 relationship)
//
//Event handlers are prefixed with on
//
//Controller names always end with *.controller.js

//In SAPUI5 , resources are often referred to as modules. In this step, 
//we replace the alert from the last exercise with a proper Message Toast from 
//the sap.m library. The required modules are enabled to be loaded asynchronously.

sap.ui.define(
		[
			"sap/ui/core/mvc/Controller",
			"sap/m/MessageToast",
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/resource/ResourceModel"
		],
//		function(Controller, MessageToast , JSONModel , ResourceModel ){
		function(Controller, MessageToast ){
			"use strict";
//			The "use strict"; literal expression was introduced by ECMAScript 5. 
//			It tells the browser to execute the code in a so called “strict mode”. The strict mode 
//			helps to detect potential coding issues at an early state at development time, that means, 
//			for example, it makes sure that variables are declared before they are used. Thus, it helps 
//			to prevent common JavaScript pitfalls and it’s therefore a good practice to use strict mode.
			return Controller.extend("sap.ui.Z.controller.App",
					{
				
//				We add an init function to the controller. onInit is one of SAPUI5’s 
//				lifecycle methods that is invoked by the framework when the controller is created, 
//				similar to a constructor function of a control.
//
//				Inside the function we instantiate a JSON model. The data for the model only 
//				contains a single property for the “recipient”, and inside this it also contains one 
//				additional property for the name.
//
//				To be able to use this model from within the XML view, we call the setModel function 
//				on the view and pass on our newly created model. The model is now set on the view.
//
//				The message toast is just showing the static "Hello World" message. We will show how 
//				to load a translated text here in the next step.
				
//				onInit : function(){
//								var Odata = {
//										recepient : {
//											name : 'De la Mot'
//										}
//								};
//								var oModel = new JSONModel(Odata);
//								this.getView().setModel(oModel);
//								
//								var i18nModel = new ResourceModel({
//									bundleName : "sap.ui.Z.i18n.i18n"
//								});
//								
//								
//								this.getView().setModel(i18nModel, "i18n");
//								
//				}
//				,				
				
//			In the onInit function we instantiate the ResourceModel that points to the new message 
//			bundle file where our texts are now located (i18n.properties file). 
//			The bundle name sap.ui.demo.walkthrough.i18n.i18n consists of the application namespace 
//			sap.ui.demo.walkthrough (the application root as defined in the index.html), the folder
//			name i18n and finally the file name i18n without extension. The SAPUI5 runtime calculates 
//			the correct path to the resource; in this case the path to our i18n.properties file. Next, 
//			the model instance is set on the view as a named model with the key i18n. You use named models
//			when you need to have several models available in parallel.
//
//			In the onShowHello event handler function we access the i18n model to get the text from the 
//			message bundle file and replace the placeholder {0} with the recipient from our data model. 
//			The getProperty method can be called in any model and takes the data path as an argument. 
//			In addition, the resource bundle has a specific getText method that takes an array of strings as second argument.
//
//			The resource bundle can be accessed with the getResourceBundle method of a ResourceModel.
//			Rather than concatenating translatable texts manually, we can use the second parameter of
//			getText to replace parts of the text with non-static data. During runtime, SAPUI5 tries to 
//			load the correct i18n_*.properties file based on your browser settings and your locale.
//			In our case we have only created one i18n.properties file to make it simple. However, you can 
//			see in the network traffic of your browser’s developer tools that SAPUI5 tries to load one or
//			more i18n_*.properties files before falling back to the default i18n.properties file.
				
				onShowH : function(){
//							debugger;
							"use strict";
//							alert("Salut Z");
							console.log("Clicked");
//							MessageToast.show("Salut Z");
							
							var oBundle = this.getView().getModel("i18n").getResourceBundle();
							var sRecipient = this.getView().getModel().getProperty("/recipient/name");
							var sMsg = oBundle.getText("msg", [sRecipient]);
							MessageToast.show(sMsg);
							
//							We extend the array of required modules with the fully qualified path to sap.m.MessageToast. 
//							Once both modules, Controller and MessageToast, are loaded, the callback function is called and 
//							we can make use of both objects by accessing the parameters passed on to the function.
//
//							This Asynchronous Module Definition (AMD) syntax allows to clearly separate the module loading 
//							from the code execution and greatly improves the performance of the application. The browser
//							can decide when and how the resources are loaded prior to code execution.
//
//							Conventions
//							Use sap.ui.define for controllers and all other JavaScript modules to define a global namespace. 
//							With the namespace, the object can be addressed throughout the application.
//
//							Use sap.ui.require for asynchronously loading dependencies but without declaring a namespace, 
//							for example code that just needs to be executed, but does not need to be called from other code.
//
//							Use the name of the artifact to load for naming the function parameters (without namespace).							
						}
					});
			
		}
		);