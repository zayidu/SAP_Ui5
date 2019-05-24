sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("ZApp_Deep_Structure.controller.V_Detail", {
		//          ************************** Init Function *********************************
		//          **************************************************************************
		onInit: function () {
			debugger;
			var oModel = new JSONModel();
			this.getView().byId("packItem").setModel(oModel);
		},

		//          ************************** DELETE Function *******************************
		//          **************************************************************************
		ondelete: function () {
			debugger;
			var oTable = this.getView().byId("packItem");
			var oModel2 = oTable.getModel();
			var aRows = oModel2.getData().data;
			// Get the selected Context (identify which rows were checked)
			var aContexts = oTable.getSelectedContexts();

			for (var i = aContexts.length - 1; i >= 0; i--) {
				var oThisObj = aContexts[i].getObject();
				// $.map() is used for changing the values of an array.
				// Here we are trying to find the index of the selected row
				// refer - http://api.jquery.com/jquery.map/
				var index = $.map(aRows, function (obj, index) {

					if (obj === oThisObj) {
						return index;
					}
				});

				// The splice() method adds/removes items to/from an array
				// Here we are deleting the selected index row
				// https://www.w3schools.com/jsref/jsref_splice.asp

				aRows.splice(index, 1);

			}
			// Set the Model with the Updated Data after Deletion
			oModel2.setData({
				data: aRows
			});

		},

		//          ************************** ADD Function **********************************
		//          **************************************************************************
		onAdd: function () {
			debugger;
			// Get the values of the input fields.
			var mat = this.getView().byId("inMaterial").getValue();
			var bat = this.getView().byId("inBatch").getValue();
			var qty = this.getView().byId("inQty").getValue();
			var uom = this.getView().byId("inUOM").getValue();

			// // Get the values of the header input fields
			// var ComCode = this.getView().byId("inputCC").getValue();
			// var Plant = this.getView().byId("inputPlant").getValue();
			// if (ComCode == "" && Plant == "") {
			// 	alert("Company Code and Plant cannot be blank");
			// }

			if (mat !== "" && bat !== "" && qty !== "" && uom !== "") {
				// Push this entry into array and bind it to the table
				var itemRow = {
					Material: mat,
					Batch: bat,
					Quantity: qty,
					Unit: uom
				};
				// Now get the model for the Table which we defined in the view with id = ‘packItem’ using below syntax.
				var oModel = this.getView().byId("packItem").getModel();

				// Then get the property “/data” of the model.
				var itemData = oModel.getProperty("/data");

				if (typeof itemData !== "undefined" && itemData !== null && itemData.length > 0) {

					// Append the data using .push.length > 0
					itemData.push(itemRow);

				} else {
					itemData = [],
						// Append Empty row
						itemData.push(itemRow);
				}

				// Set Model
				oModel.setData({
					data: itemData
				});

				// Clear the input fields.
				this.getView().byId("inMaterial").setValue("");
				this.getView().byId("inBatch").setValue("");
				this.getView().byId("inQty").setValue("");
				this.getView().byId("inUOM").setValue("");

			} else {
				alert("Material/Batch/Quantity/UOM cannot be blank");
			};
		}
	});
});