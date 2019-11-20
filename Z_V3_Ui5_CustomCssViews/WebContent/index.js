sap.ui.define([
//	"sap/m/Text"
//	"sap/ui/core/mvc/XMLView"
	"sap/ui/core/ComponentContainer"
	],
//	function (Text){
//	function (XMLView){
	function (ComponentContainer) {
	"use strict";
//	alert("Salut Monsieur");
	
	
//	new Text(
//			{
//				text: "Salut La Monde"
//			}).placeAt("content");
	
//	Instead of using native JavaScript to display a dialog we want to use a simple SAPUI5 control. 
//	Controls are used to define appearance and behavior of parts of the screen.
//
//	In the example above, the callback of the init event is where we now instantiate a SAPUI5 text control. 
//	The name of the control is prefixed by the namespace of its control library sap/m/ and the options are passed 
//	to the constructor with a JavaScript object. For our control we set the text property to the value “Hello World”.
//
//	We chain the constructor call of the control to the standard method placeAt that is used to place SAPUI5 
//	controls inside a node of the document object model (DOM) or any other SAPUI5 control instance. We pass 
//	the ID of a DOM node as an argument. As the target node we use the body tag of the HTML document and give it the ID content.
//
//	All controls of SAPUI5 have a fixed set of properties, aggregations, and associations for configuration. 
//	You can find their descriptions in the Demo Kit. In addition, each controls comes with a set of public 
//	functions that you can look up in the API reference.
	
//	Only instances of sap.ui.core.Control or their subclasses can be rendered stand-alone and have 
//	a placeAt function. Each control extends sap.ui.core.Element that can only be rendered inside controls. 
//	Check the API reference to learn more about the inheritance hierarchy of controls. The API documentation 
//	of each control refers to the directly known subclasses.
	
	
//	XMLView.create(
//			{
//				viewName:"sap.ui.Z.view.App"
//			}).then(
//					function(oView){
//						oView.placeAt("content");
//					})
					
//					We replace the instantiation of the sap.m.Text control by our new App XML view. 
//					The view is created by a factory function of SAPUI5 which makes sure that the view is 
//					correctly configured and can be extended by customers. The name is prefixed with the 
//					namespace sap.ui.demo.walkthrough.view in order to uniquely identify this resource.
//					From this step onwards, it is necessary to run the app on a Web server.
//					We structure the app with multiple files that are loaded from the local file system. 
//					Without a Web server, this is prevented by the browser due to security reasons. 
//					If the error message "sap is not defined" appears in the developer tools of the browser, 
//					you need to check the resource path in the bootstrap.
					
	new ComponentContainer({
		name: "sap.ui.Z",
		settings : {
			id : "Z"
		},
		async: true
	}).placeAt("content");
}
);

//create a new index.js script that will contain the application logic for this tutorial step. 
//We do this to avoid having executable code directly in the HTML file for security reasons. 
//This script will be called by the index.html. We defined it there as a module in a declarative way.