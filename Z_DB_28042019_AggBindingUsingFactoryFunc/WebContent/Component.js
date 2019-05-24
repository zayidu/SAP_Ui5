sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView , ResourceModel) {
	"use strict";

	// Attach an anonymous function to the SAPUI5 'init' event
	sap.ui.getCore().attachInit(function () {
		
		var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products");
		
		// Create a JSON model from an object literal
		debugger;
		var oModel = new JSONModel({
			firstName: "ZAYIDU",
			lastName: "A",
			enabled: true,
			address: {
				street: "Rue Raja",
				city: "Pondicherry",
				zip: "605001",
				country: "Inde"
			},
			"salesToDate" : 12345.6789,
			"priceThreshold": 20,
			"currencyCode" : "EUR"

		});
		
		debugger;
//		oModel.setDefaultBindingMode('OneWay');
//		oModel.setDefaultBindingMode(BindingMode.OneWay);
		
		// Assign the model object to the SAPUI5 core
		sap.ui.getCore().setModel(oModel);
		
		// Create a resource bundle for language specific texts
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.db.i18n.i18n_fr"
		});

		// Assign the model object to the SAPUI5 core using the name "i18n"
		sap.ui.getCore().setModel(oResourceModel, "i18n");

		// Display the XML view called "App"
		var oView = new XMLView({
			viewName: "sap.ui.db.view.App"
//		}).placeAt("content");
	    });
		
		// Register the view with the message manager
		sap.ui.getCore().getMessageManager().registerObject(oView, true);
		
		// Insert the view into the DOM
		oView.placeAt("content");

	});
});