sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
	"use strict";

	return ManagedObject.extend("sap.ui.opensap.controller.Dialog", {

		constructor : function (oView) {
			debugger;
			this._oView = oView;
		},

		exit : function () {
			debugger;
			delete this._oView;
		},

		open : function () {
			debugger;
			var oView = this._oView;

			// create dialog lazily
			if (!oView.byId("Dialog")) {
				debugger;
				var oFragmentController = {
						onFermerDialog : function () {
						oView.byId("Dialog").close();
					}
				};
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "sap.ui.opensap.view.Dialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					debugger;
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				debugger;
				oView.byId("Dialog").open();
			}
		}

	});

});