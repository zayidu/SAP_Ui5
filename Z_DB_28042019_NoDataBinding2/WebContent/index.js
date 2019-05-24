sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.db",
		settings : {
			id : "db"
		},
		async: true
	}).placeAt("content");
});