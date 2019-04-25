sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
	"use strict";

	return ManagedObject.extend("sap.ui.opensap.controller.Dialog", {

		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function () {
			var oView = this._oView;

			// create dialog lazily
			if (!oView.byId("Dialog")) {
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
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				oView.byId("Dialog").open();
			}
		}

	});

});