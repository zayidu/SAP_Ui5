/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Z_App_Deep_St/Z_App_Deep_St/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});