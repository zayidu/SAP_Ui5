sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/Fragment"
], function (Controller, MessageToast , Fragment) {
   "use strict";
   return Controller.extend("sap.ui.Z.controller.HelloPanel", {
      onShowH : function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
         var sMsg = oBundle.getText("msg", [sRecipient]);
         // show message
         MessageToast.show(sMsg);
      },
      
//      The onOpenDialog method now accesses its component by calling the helper method getOwnerComponent. 
//      When calling the open method of the reuse object we pass in the current view to connect it to the dialog.
//      We add a button to the header area of the App.view.xml to show the reuse of the hello world dialog. 
//      When pressing the button the dialog will be opened as with the button that we previously created in the panel.
		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		}
      
//      ,
//		onOpenDialog : function () {
//			var oView = this.getView();
//
//			// create dialog lazily
//			if (!this.byId("helloDialog")) {
//				// load asynchronous XML fragment
//				Fragment.load({
//					id: oView.getId(),
//					name: "sap.ui.Z.view.HelloDialog",
//					controller: this
//						
////						If the dialog in the fragment does not exist yet, the fragment is instantiated by calling 
////						the sap.ui.xmlfragment method with the following arguments:
////							The ID of the HelloPanel view
////
////							This parameter is used to prefix the IDs inside our fragment. There, we have 
////							defined the ID helloDialog for the Dialog control, and we can access the dialog via 
////							the view by calling oView.byId("helloDialog"). This makes sure that even if you instantiate 
////							the same fragment in other views in the same way, each dialog will have its unique ID that is 
////							concatenated from the view ID and the dialog ID.
////
////							Using unique IDs is important, because duplicate IDs lead to errors in the framework.
////
////							The path of the fragment definition
////
////							We add the dialog as "dependent" on the view to be connected to the lifecycle of the
////							view’s model. A convenient side-effect is that the dialog will automatically be destroyed
////							when the view is destroyed. Otherwise, we would have to destroy the dialog manually to free
////							its resources.
////
////							Conventions:
////							Always use the addDependent method to connect the dialog to the lifecycle management and
////							data binding of the view, even though it is not added to its UI tree.
////
////							Private functions and variables should always start with an underscore.		
//							
//				}).then(function (oDialog) {
//					// connect dialog to the root view of this component (models, lifecycle)
//					oView.addDependent(oDialog);
//					oDialog.open();
//				});
//			} else {
//				this.byId("helloDialog").open();
//			}
//		},
//		
//		onCloseDialog : function () {
//			this.byId("helloDialog").close();
//		}
		
//		As previously described, fragments are pure UI reuse artifacts and do not have a controller. 
//		The third parameter of the sap.ui.xmlfragment function is optional and allows passing in a reference 
//		to a (controller) object. For our dialog we reference the HelloPanel controller. However, the third parameter 
//		does not necessarily have to be a controller but can be any object. Just don't forget the this keyword.
//
//		The event handler function is put into the same controller file and it closes the dialog by accessing the 
//		internal helper function that returns the dialog.
		
		
   });
});