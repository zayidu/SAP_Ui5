//sap.ui.define([
//	"sap/ui/core/mvc/XMLView"
//
//], function (XMLView) {
//	"use strict";
//
//	XMLView.create({
//		viewName: "sap.ui.opensap.view.App"
//	}).then(function (oView) {
//		oView.placeAt("content");
//	});
//});
sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";
	debugger;
	new ComponentContainer({
		name: "sap.ui.opensap",
		settings : {
			id : "opensap"
		},
		async: true
	}).placeAt("content");
});