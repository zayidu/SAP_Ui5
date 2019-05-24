/*global QUnit*/

sap.ui.define([
	"Z_App_Deep_St/Z_App_Deep_St/controller/V_Detail.controller"
], function (Controller) {
	"use strict";

	QUnit.module("V_Detail Controller");

	QUnit.test("I should test the V_Detail controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});