sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
	"./controller/Dialog"
], function (UIComponent, JSONModel, Dialog) {
   "use strict";
   return UIComponent.extend("sap.ui.opensap.Component", {
      metadata : {
            manifest: "json"
      },
      init : function () {
    	  debugger;
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
            	name : "Le Meilleur"
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);
         
      // set dialog
			this._Dialog = new Dialog(this.getRootControl());
	  // create the views based on the url/hash
			this.getRouter().initialize();
		},


		exit : function() {
			debugger;
			this._Dialog.destroy();
			delete this._Dialog;
		},

		onOuvertDialog : function () {
			debugger;
			this._Dialog.open();
      }, 
      onFermerDialog : function () {
    	    debugger;
			this._Dialog.close();
    }
   });
});


//sap.ui.define([
//   "sap/ui/core/UIComponent",
//	"sap/ui/model/json/JSONModel",
//	"sap/ui/model/resource/ResourceModel"
//], function (UIComponent, JSONModel , ResourceModel ) {
//   "use strict";
//   return UIComponent.extend("sap.ui.opensap.Component", {
//	  metadata : {
//		  rootView: {
//	            "viewName": "sap.ui.opensap.view.App",
//	            "type": "XML",
//	            "async": true,
//	            "id": "app"
//	         }
//	      },
//	      init : function () {
//	          // call the init function of the parent
//	          UIComponent.prototype.init.apply(this, arguments);
//	          // set data model
//	          var oData = {
//	             recipient : {
//	                name : "Le Meilleur"
//	             }
//	          };
//	          var oModel = new JSONModel(oData);
//	          this.setModel(oModel);
//
//	          // set i18n model
//	          var i18nModel = new ResourceModel({
//	             bundleName : "sap.ui.opensap.i18n.i18n"
//	          });
//	          this.setModel(i18nModel, "i18n");
//	       }
//	    });
//	 });

