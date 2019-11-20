sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
	"use strict";

	return ManagedObject.extend("sap.ui.Z.controller.HelloDialog", {

		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function () {
			var oView = this._oView;

			// create dialog lazily
			if (!oView.byId("helloDialog")) {
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("helloDialog").close();
					}
				};
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "sap.ui.Z.view.HelloDialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
				
//				The implementation of the HelloDialog reuse object extends an sap.ui.base.ManagedObject object to inherit some of
//				the core functionality of SAPUI5.
//
//				Our open method is refactored from the HelloPanel controller and instantiates our dialog fragment as in the previous steps.
				
//				Note
//				We do not pass a controller as third parameter to function sap.ui.xmlfragment but a local helper object oFragmentContoller 
//				which included the needed event handler function onCloseDialog for the fragment
				
//				The open method now contains our dialog instantiation. The first time the open method is called, 
//				the dialog is instantiated. The oView argument of this method is used to connect the current view to the dialog. 
//				We will call the open method of this object later in the controller.
//
//				The onCloseDialog event handler is simply moved from the HelloPanel controller to the reuse object.
//
//				We also add an exit function, just like we did in the component, that will be called automatically when 
//				the object is being destroyed. To free up all allocated memory in the helper object, we delete the property 
//				that holds the reference to the view. The view itself will be destroyed by the component, 
//				so we don't need to take care for that.
				
				
			} else {
				oView.byId("helloDialog").open();
			}
		}

	});

});