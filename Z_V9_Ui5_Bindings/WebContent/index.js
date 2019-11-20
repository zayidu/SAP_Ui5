sap.ui.require([
	"sap/m/Text",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/BindingMode",
	"sap/ui/model/resource/ResourceModel"
], function (Text , JSONModel , XMLView , BindingMode , ResourceModel) {
	"use strict";

	// Attach an anonymous function to the SAPUI5 'init' event
	sap.ui.getCore().attachInit(function () {
		
		// Create a JSON model from an object literal
//		var oModel = new JSONModel({
//			greetingText: "Salut, Je m'appelle Z de JSON"
//		});
		
		
		var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products"); // Aggregation binding (or "list binding") allows a control to 
//							be bound to a list within the model data and allows relative binding to the
//							list entries by its child controls.
		
//		It will automatically create as many child controls as are needed to display the data in the model using 
//		one of the following two approaches:
//			Use template control that is cloned as many times as needed to display the data.
//
//			Use a factory function to generate the correct control per bound list entry based on the data received at runtime.
		
		// Create a JSON model from an object literal
		var oModel = new JSONModel({
			firstName: "Zayid",
			lastName: "Ansari",
			enabled: true,
			panelHeaderText: "Data Binding",
				address: {
					street: "13A, Raja Singh Street",
					city: "Pondischerry",
					zip: "605001",
					country: "India"
				},
				"salesToDate" : 12345.6789,
				"currencyCode" : "EUR",
				"priceThreshold": 20

		});
		
//		oModel.setDefaultBindingMode(BindingMode.OneWay); // Insert the single highlighted line immediately after the 
//																creation of the model object in index.js.

//		Now, no matter what state the checkbox is in, the input fields remain open for input because one-way data 
//		binding ensures that data flows only from the model to the UI, but never in the other direction.
//
//		The binding mode (one-way or two-way) is set on the model itself. Therefore, unless you specifically 
//		alter it, a binding instance will always be created using the model's default binding mode.
//
//		Should you wish to alter the binding mode, then there are two ways of doing this:
//		Alter the model's default binding mode. This is the approach used above.
//
//		Specify the data binding mode for a specific binding instance by using the oBindingInfo.mode parameter. 
//		This change applies only to this data binding instance. Any other binding instances will continue 
//		to use the model's default binding mode. 
//		For more information, see API Reference: sap.ui.base.ManagedObject.bindProperty.
		
//		Note
//		There are two important points to understand about alterations to a model object's data binding mode:
//		If you alter the default binding mode of a model (as in the example above), then unless you explicitly 
//		say otherwise, all binding instances created after that point in time will use the altered binding mode.
//		Altering a model's default binding mode has no effect on already existing binding instances.
		
		// Assign the model object to the SAPUI5 core
		sap.ui.getCore().setModel(oModel);
		
		// Create a text UI element that displays a hardcoded text string
//		new Text({text: "{/greetingText}"}).placeAt("content"); // The text property of the sap.m.Text control is set to 
//				the value {/greetingText}. The curly brackets enclosing a binding path (binding syntax) 
//				are automatically interpreted " +
//				"as a binding. These binding instances are called PropertyBindings. In this case, the control's " +
//				"text property is bound to the greetingText property at the root of the default model, as the " +
//				"slash (/) at the beginning of the binding path denotes an absolute binding path.
		
		
		// Create a resource bundle for language specific texts
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.Z.i18n.i18n"
		});
		
		var oResourceModel_fr = new ResourceModel({
			bundleName: "sap.ui.Z.i18n.i18n_fr"
		});

		// Assign the model object to the SAPUI5 core using the name "i18n"
		sap.ui.getCore().setModel(oResourceModel, "i18n");
		
		// Assign the FR model object to the SAPUI5 core using the name "i18n_fr"
		sap.ui.getCore().setModel(oResourceModel_fr, "i18n_fr");
		
//		Since we are creating a resource model, the file name is assumed to have the extension .properties; 
//		this does not need to be stated explicitly. The resource model is set to the core using the model name i18n.
		
	
		
		// Display the XML view called "App"
		var oView =  new XMLView({
			viewName: "sap.ui.Z.view.App"
		}).placeAt("content");
		
		// Register the view with the message manager
		sap.ui.getCore().getMessageManager().registerObject(oView, true);
/*
 * 
 * The changes to the coding are minimal:
The XML view is now created as a named object called oView.
The view object oView is registered with the MessageManager.
Once registered, the XML view is then inserted into the DOM as before.

You can now enter a non-numeric value into the Sales To Date field and either press Enter or move 
the focus to a different UI control. This action triggers either the onenter or onchange event and 
then SAPUI5 executes the validation function belonging to the sap.ui.model.type.Currency data type.

Now that the view has been registered with the MessageManager, any validation error messages will be 
picked up by the MessageManager, which in turn checks its list of registered objects and then passes the 
error message back to the correct view for display.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * We delete the code that assigned the sap.m.Text field to the UI and add an XML view that is identified by its resource name.

You can now refresh the application preview and select or deselect the checkbox. 
You will see that the input fields are automatically enabled or disabled in response to the state of the checkbox.

It is clear that we have not written any code to transfer data between the user interface and the model, 
yet the Input controls are enabled or disabled according to the state of the checkbox. 
This behaviour is the result of the fact that all SAPUI5 models implement two-way data binding, 
and for JSON Models, two-way binding is the default behavior.

Two things are happening here:
Data binding allows the property of a control to derive its value from any suitable property in a model.

SAPUI5 automatically handles the transport of data both from the model to the controls, and back from the 
controls to the model. This is called two-way binding.

In contrast to the two-way binding behavior shown above, one-way data binding is also possible. 
Here, data is transported in one direction only: from the model, through the binding instance to the consumer 
(usually the property of a control), but never in the other direction. In this example, we will change the 
previous example to use one-way data binding. This will illustrate how the flow of data from the user interface 
back to the model can be switched off if required.

 */		
		
		
	});
});

/*
 * Create a new index.js file that will contain the application logic for this tutorial. 
 * We start by placing the sap.m.Text control into the html content. Since the value of the control's text 
 * property has been hard-coded, it is unrelated to any data that might exist within a model object. Therefore, 
 * data binding is not being used here.
 * 
 * The business data within a model can be defined using various formats:
JavaScript Object Notation (JSON)
Extensible Markup Language (XML)
OData
Your own custom format (not covered in this tutorial)

Note
There is also a special type of model called a "resource model". 
This model type is used as a wrapper object around a resource bundle file. The names of such files must end 
with .properties and are used typically for holding language-specific text.

We will use this in Step 6: Resource Models.

When JSON, XML and resource models are created, the data they contain is loaded in a single 
request (either from a file stored locally on the client or by requesting it from a Web server). 
In other words, after the model's data has been requested, the entire model is known to the application. 
These models are known as client-side models and tasks such as filtering and sorting are performed locally on the client.

An OData model however, is a server-side model. This means that whenever an application needs data from the 
model, it must be requested from the server. Such a request will almost never return all the data in the model, 
typically because this would be far more data than is required by the client application. Consequently, tasks such 
as sorting and filtering should always be delegated to the server.

In this tutorial, we will focus on JSON models since they are the simplest ones to work with.

Create a new JSON model passing the data as object literal and store the resulting model instance in a local variable called oModel.

Set oModel to be the default model within the entire SAPUI5 core.

This makes the model object globally available to all controls used within the application.

In this case we have bound the model object to the SAPUI5 core. This has been done for simplicity, 
but is not considered good practice. Generally speaking, a model object holding business data should be 
bound to the view that displays the data. We will correct this part of the code in the following steps.

Models can be set on every control by calling setModel(). The model is then propagated to all aggregated 
child controls (and their children, and so on…). All child control will then have access to that model

 * 
 */