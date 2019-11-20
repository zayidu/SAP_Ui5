sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/ViewSettingsDialog",
	"sap/m/ViewSettingsItem"
], function(
	BaseController,
	Filter,
	FilterOperator,
	Sorter,
	ViewSettingsDialog,
	ViewSettingsItem
) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.employee.overview.EmployeeOverviewContent", {

		onInit: function () {
			
			var oRouter = this.getRouter();
			
			this._oTable = this.byId("employeesTable");
			this._oVSD = null;
			this._sSortField = null;
			this._bSortDescending = false;
			this._aValidSortFields = ["EmployeeID", "FirstName", "LastName"];
			this._sSearchQuery = null;
			this._oRouterArgs = null;

			this._initViewSettingsDialog();
			
			// make the search bookmarkable
			oRouter.getRoute("employeeOverview").attachMatched(this._onRouteMatched, this);
			
		},

		_onRouteMatched : function (oEvent) {
			// save the current query state
			this._oRouterArgs = oEvent.getParameter("arguments");
			this._oRouterArgs.query = this._oRouterArgs["?query"] || {};

			if (this._oRouterArgs.query) {

				// search/filter via URL hash
				this._applySearchFilter(this._oRouterArgs.query.search);
				
				// sorting via URL hash
				this._applySorter(this._oRouterArgs.query.sortField, this._oRouterArgs.query.sortDescending);
				
				// show dialog via URL hash
				if (!!this._oRouterArgs.query.showDialog) {
					this._oVSD.open();
				}

			}
		},
		
		onSortButtonPressed : function () {
//			this._oVSD.open();
			var oRouter = this.getRouter();
			this._oRouterArgs.query.showDialog = 1;
			oRouter.navTo("employeeOverview",this._oRouterArgs);
		},

		onSearchEmployeesTable : function (oEvent) {
			var oRouter = this.getRouter();
			// update the hash with the current search term
			this._oRouterArgs.query.search = oEvent.getSource().getValue();
			oRouter.navTo("employeeOverview",this._oRouterArgs, true /*no history*/);
		},

		_initViewSettingsDialog : function () {
			this._oVSD = new ViewSettingsDialog("vsd", {
				confirm: function (oEvent) {
					var oSortItem = oEvent.getParameter("sortItem");
//					this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
					this._oRouterArgs.query.sortField = oSortItem.getKey();
					this._oRouterArgs.query.sortDescending = oEvent.getParameter("sortDescending");
					oRouter.navTo("employeeOverview",this._oRouterArgs, true /*without history*/);
				}.bind(this),
				cancel : function (oEvent){
					delete this._oRouterArgs.query.showDialog;
					oRouter.navTo("employeeOverview",this._oRouterArgs, true /*without history*/);
				}.bind(this)
			});

			// init sorting (with simple sorters as custom data for all fields)
			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "EmployeeID",
				text: "Employee ID",
				selected: true			// by default the MockData is sorted by EmployeeID
			}));

			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "FirstName",
				text: "First Name",
				selected: false
			}));

			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "LastName",
				text: "Last Name",
				selected: false
			}));
		},

		_applySearchFilter : function (sSearchQuery) {
			var aFilters, oFilter, oBinding;

			// first check if we already have this search value
			if (this._sSearchQuery === sSearchQuery) {
				return;
			}
			this._sSearchQuery = sSearchQuery;
			this.byId("searchField").setValue(sSearchQuery);

			// add filters for search
			aFilters = [];
			if (sSearchQuery && sSearchQuery.length > 0) {
				aFilters.push(new Filter("FirstName", FilterOperator.Contains, sSearchQuery));
				aFilters.push(new Filter("LastName", FilterOperator.Contains, sSearchQuery));
				oFilter = new Filter({ filters: aFilters, and: false });  // OR filter
			} else {
				oFilter = null;
			}

			// update list binding
			oBinding = this._oTable.getBinding("items");
			oBinding.filter(oFilter, "Application");
		},

		/**
		 * Applies sorting on our table control.
		 * @param {string} sSortField		the name of the field used for sorting
		 * @param {string} sortDescending	true or false as a string or boolean value to specify a descending sorting
		 * @private
		 */
		_applySorter : function (sSortField, sortDescending){
			var bSortDescending, oBinding, oSorter;

			// only continue if we have a valid sort field
			if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {

				// convert  the sort order to a boolean value
				if (typeof sortDescending === "string") {
					bSortDescending = sortDescending === "true";
				} else if (typeof sortDescending === "boolean") {
					bSortDescending =  sortDescending;
				} else {
					bSortDescending = false;
				}

				// sort only if the sorter has changed
				if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
					return;
				}

				this._sSortField = sSortField;
				this._bSortDescending = bSortDescending;
				oSorter = new Sorter(sSortField, bSortDescending);

				// sync with View Settings Dialog
				this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

				oBinding = this._oTable.getBinding("items");
				oBinding.sort(oSorter);
			}
		},

		_syncViewSettingsDialogSorter : function (sSortField, bSortDescending) {
			// the possible keys are: "EmployeeID" | "FirstName" | "LastName"
			// Note: no input validation is implemented here
			this._oVSD.setSelectedSortItem(sSortField);
			this._oVSD.setSortDescending(bSortDescending);
		}
		,
		onItemPressed : function (oEvent) {
			var oItem, oCtx, oRouter;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employeeResume",{
				employeeId : oCtx.getProperty("EmployeeID"),
				query : {
					tab : "Info"
				}
/*
 * Next we add the itemPress handler .onItemPressed to the EmployeeOverviewContent controller. 
 * It reads from the binding context which item has been chosen and navigates to the employeeResume route. 
 * We have already added this route and the corresponding target in a previous step and can now reuse it. From 
 * now on it is possible to navigate to the employeeResume route from our employee table as well as from the employee 
 * detail page created in an earlier step (the route name is employee).
 */			
			
			});
		}

	});

});


/*
Finally create the controller for the Employee Overview page in the webapp/controller/employee/overview folder. 
It basically sets up a ViewSettingsDialog to sort and filter the table of employees and implements event handlers 
for the search field and for the sorting of the table.

There is nothing special about this implementation. If you are interested in how to set up a table with sorting and
 filtering you can check the corresponding steps of the Walkthrough tutorial or the examples in the Demo Kit. 
 We will mainly make use of the UI and the functionality for showing additional navigation and routing features. 
 Therefore, we suggest copying the code and trying it out.

Open webapp/index.html#/employees/overview and check the new views. As you can see, the three views are wired 
together automatically by the router based on our configuration in the descriptor. In the top area of the page, 
you see a static text and below you see the table filled with data from our test service. The whole routing functionality 
that we see in this example is implemented by referencing two targets from one route.

Of course, you can also search the table and change the sorting. When the sorting dialog opens, it creates a block layer 
so that the back button and other controls cannot be accessed. However, you can still use the back button of the browser. 
As you can see, the dialog is closed automatically by the router before navigating.
Note
The default behavior of the sap.m router is that all dialogs are closed when the hash changes (i.e. when calling navTo,
 display or pressing the back button of the browser). You can change this default behavior by 
 calling getTargetHandler().setCloseDialogs(false) on the router or on the Targets object.

However, we have one problem yet to solve: the search and table ordering are not bookmarkable. Fortunately, 
we have additional navigation features at hand and you will see how this works in the next steps

In order to make the search bookmarkable we have to think about how the pattern of the corresponding 
route should match the bookmark. We decide to allow /#/employees/overview?search=mySearchQueryString in 
order to bookmark a search. Therefore, we simply extend our routing configuration a little. We add the 
optional :?query: parameter to the route employeeOverview. We keep in mind that we want to use search as the 
URL parameter for the search term that was entered in the search field.

Now we handle the optional query parameter from the employeeOverview route in our EmployeeOverviewContent controller. 
First we change the onInit function by adding an event listener for the matched event of the employeeOverview route. 
Then we buffer the current router arguments as received from the event. If a query is available, the result 
from oEvent.getParameter("arguments") will contain a ?query property with an object of all URL parameters specified, 
otherwise it is undefined. For an easier access and to always initialize the query, we save the ?query object containing 
all query parameters to this._oRouterArgs.query and delete the duplicate at this._oRouterArgs["?query"]. If we have a 
search term query at the search key we continue and call this._applySearchFilter(this._oRouterArgs.query.search) to 
trigger a search based on the search query parameter from the URL.

Storing the arguments objects internally in the controller is important, because we will use the current arguments 
when calling navTo() in the search event handler onSearchEmployeesTable and pass on the arguments with the updated 
search term. We keep the URL and the UI in sync by navigating to the current target again with the current value of 
the search field from the event’s source. The search value is stored in this._oRouterArgs.query.search together with 
the other query parameters and it is passed directly to the router again

That’s it, now our search is bookmarkable and reflected in the URL. 
Try to access the following pages in your browser:
webapp/index.html#/employees/overview

webapp/index.html#/employees/overview?search=

webapp/index.html#/employees/overview?search=an

When you change the value in the search field, you see that the hash updates accordingly.

We enhance the EmployeeOverviewContent controller further to add support for bookmarking the 
table’s sorting options. We expect two query parameters sortField and sortDescending from the URL for 
configuring the sorting of the table. In the matched handler of the route employeeOverview we add an additional 
call to this._applySorter(this._oRouterArgs.query.sortField, this._oRouterArgs.query.sortDescending). 
This triggers the sorting action based on the two query parameters sortField and sortDescending from the URL.

Next we change the confirm event handlers of our ViewSettingsDialog. The confirm handler updates the current 
router arguments with the parameters from the event accordingly. Then we call oRouter.navTo("employeeOverview",
this._oRouterArgs, true) with the updated router arguments to persist the new sorting parameters in the URL. Both 
the previous arguments (i.e. search) and the new arguments for the sorting will then be handled by the matched event 
handler for the employeeOverview route.

Congratulations! Even the sorting options of the table can now be bookmarked. Try to access the following pages:
webapp/index.html#/employees/overview?sortField=EmployeeID&sortDescending=true

webapp/index.html#/employees/overview?search=an&sortField=EmployeeID&sortDescending=true

When changing the table’s sorting options, you will see that the hash updates accordingly.

Once again we will update the EmployeeOverviewContent controller to add support for the bookmarking 
of our sorting dialog. We decide to choose a query parameter showDialog that controls if the dialog is opened 
directly when we navigate to the page with a deep link. Therefore, we extend the matched event handler for the 
employeeOverview route. If the query parameter showDialog is set to 1 (note the implicit conversion to a Boolean 
type for the check) we open the dialog. We only have to make sure that the dialog does not get closed again by the 
router as this behavior is the default when navigating. Therefore, we call oEvent.preventDefault() to tell the router 
that we want to keep the dialog open.

Next we change the press handler of the sort button. In the onSortButtonPressed function we 
set this._oRouterArgs.query.showDialog = 1 and call navTo() to let the router do the job instead of directly 
opening the dialog. Finally, we delete this._oRouterArgs.query.showDialog before calling navTo() in the confirm 
and cancel event handlers of the ViewSettingsDialog. This is important to make sure that the dialog does not open 
again by the matched handler.

We are now done with this step. Try to access the following pages:
webapp/index.html#/employees/overview?showDialog=1

webapp/index.html#/employees/overview?search=an&sortField=EmployeeID&sortDescending=true&showDialog=1

As you can see, the dialog opens automatically if the parameter showDialog=1 is added to the URL. That’s exactly what we wanted.

*/