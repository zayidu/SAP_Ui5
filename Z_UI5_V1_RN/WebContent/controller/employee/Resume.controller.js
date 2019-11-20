sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	return BaseController.extend("sap.ui.demo.nav.controller.employee.Resume", {
		onInit: function () {
			"use strict";
			debugger;
			
			var oRouter = this.getRouter();
			this.getView().setModel(new JSONModel(), "view");
			
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			"use strict";
			debugger;
			
			var oArgs, oView , oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
				// support lazy loading for the hobbies and notes tab
				if (oQuery.tab === "Hobbies" || oQuery.tab === "Notes"){
					// the target is either "resumeTabHobbies" or "resumeTabNotes"
					this.getRouter().getTargets().display("resumeTab" + oQuery.tab);  // Now we extend the resume controller a little and add 
//					additional logic to the part of the _onRouteMatched function where a new tab has been selected and validated.
//In case the selectedKey matches Hobbies or Notes we call this.getRouter().getTargets().display("resumeTab" + oQuery.tab)
//to display the corresponding target manually. Here the valid targets are resumeTabHobbies and resumeTabNotes as we 
//have changed the behavior for these two tabs by creating separate views.
//
//					These lines of code make sure that the targets are only loaded when they are needed (“lazy loading”). 
//					But the router does not know the new targets yet, so let’s create them in our routing configuration.
					
/*
 * We add the resumeTabHobbies and resumeTabNotes targets to the descriptor file with additional fields that override 
 * the default configuration as we now want to display the targets locally inside the IconTabBar control and not as pages 
 * of the app.

The resumeTabHobbies target sets the parent property to employeeResume. The parent property expects the name of another 
target. In our case, this makes sure that the view from the parent target employeeResume is loaded before the 
target resumeTabHobbies is displayed. This can be considered as a “view dependency”. By setting the controlId and 
controlAggregation properties the router places the view ResumeHobbies into the content aggregation of the IconTabFilter 
control with ID hobbiesTab. We also set a parameter viewId to a custom ID to illustrate how you could overrule a 
hard-coded ID inside a view.

Note
Each target can define only one parent with its parent property. This is similar to the SAPUI5 control tree 
where each control can have only one parent control (accessed with the method getParent() of sap.ui.base.ManagedObject). 
The controlId property always references a control inside the parent view that is specified with the parent target.

Now we add the resumeTabNotes target similar to the Hobbies target. The resumeTabNotes target defines the parent target 
employeeResume as well, because they share the same parent view. We place the ResumeNotes view into the content aggregation 
of the IconTabFilter control with ID notesTab.

We have now implemented lazy loading for the tabs Hobbies and Notes. These two tabs are now managed by the routing 
configuration and only loaded when we click on them the first time.

Try it out yourself: Open the Network tab of your browser's developer tools and click on the tabs of your app. In the 
network traffic you will see that ResumeHobbies.view.xml file is only loaded when the Hobbies tab is displayed the first time. 
The same applies for the Notes tab. Mission accomplished!

Conventions
Lazy-load content that is not initially displayed to the user
 * 
 */					
				}
				
			} else {
				// the default query param should be visible at all time
				this.getRouter().navTo("employeeResume", {
					employeeId : oArgs.employeeId,
					query: {
						tab : _aValidTabKeys[0]
					}
				},true /*no history*/);
			}

			
		},
		_onBindingChange : function (oEvent) {
			"use strict";
			debugger;
			
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
		,
		onTabSelect : function (oEvent){
			var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID"),
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
			
			
			
/*
 * The resume view contains four tabs as we have seen in the previous steps. However, when the user navigates 
 * to the resume page, only the first tab is displayed initially. Navigating directly to a specific tab or 
 * bookmarking a tab is not yet supported in our current app.
 * 
 * In this step, we implement a bookmarking feature by enabling deep linking to tabs with optional query parameters. 
 * A deep link is basically a link that directly references a deeper structure and parameters of the app in the URL. 
 * It is often bookmarked or shared to have a convenient entry point into the app for a certain task or action. The 
 * selected tab should be reflected in the URL but the tab can also be omitted, for example, when we initially navigate 
 * to the resume page.
 * 
 * Up until now, you could only navigate to an employee’s resume with the deep link webapp/index.html#/employees/3/resume. 
 * This will always select the first tab as implemented by the IconTabBar control. In order to open the page directly with 
 * a specific tab selected and to make the tabs bookmarkable, we add the query parameter to the URL pattern.

This allows URLs like webapp/index.html#/employees/3/resume?tab=Projects where the query parameter defines which tab shall
be displayed. We change the pattern of the employeeResume route to employees/{employeeId}/resume:?query:. 
The new part :?query: allows to pass on queries with any parameters, for example, the hash /#/employees/3/resume?tab=Projects 
or /#/employees/3/resume?tab=Projects&action=edit matches the pattern and can be processed in the matched event.

The :?query: parameter starts and ends with :; this means that it is optional. If you want to make it mandatory, you can 
use the {?query} syntax (everything in between {} is considered as being mandatory).

To update the currently selected tab in the URL we listen to the select event of the IconTabBar by setting 
select=".onTabSelect" in the resume view. The selectedKey is bound to a view model. This allows to easily change 
the selectedKey according to the selected tab in the URL.

When a tab is selected manually, its select handler is called. Therefore, let’s first have a look at the onTabSelect 
event handler that is added at the end of the resume controller. It detects the selectedKey of the tab and navigates to 
the employeeResume route to update the URL in the address bar. Additionally to the mandatory parameter employeeId, 
we pass on a custom query object with a parameter tab and fill it with the selectedKey value that we receive from the 
select event of the IconTabBar. By passing on true as the third argument we replace the current history to make sure 
that manually clicked tabs won’t be added to the browser history.

A dependency to sap/ui/model/json/JSONModel is added to the controller. Now, we modify the onInit function to 
instantiate a JSONModel and use it as the view model. _aValidTabKeys is added to the controller. We want to make 
sure that only valid tabs can be selected. Therefore, the array _aValidTabKeys contains all allowed tab keys that 
we can check against to validate the tab parameter from the URL later. The keys are equal to the keys of our 
IconTabFilters in the resume view.

In the _onRouteMatched event handler, we add the oQuery variable to store a reference to the query object from the router. 
This allows a more comfortable access to the query object.

In case a query object is passed on and the tab parameter has a valid value, we display the specific tab by updating the 
property /selectedTabKey in the view model. As the selectedKey property of the IconTabBar is bound to {view>/selectedTabKey} 
the corresponding tab is selected.

The else case is called when either no or an invalid tab parameter is specified. We navigate to the Info tab to make 
sure that the tab parameter is reflected in the URL at all times. The actual requirements of your app might differ, feel 
free to change it accordingly...

From now on our tabs are bookmarkable. Try to access the following (deep) links directly:
webapp/index.html#/employees/3/resume

webapp/index.html#/employees/3/resume?tab=Info

webapp/index.html#/employees/3/resume?tab=Projects

webapp/index.html#/employees/3/resume?tab=Hobbies

webapp/index.html#/employees/3/resume?tab=Notes

webapp/index.html#/employees/3/resume?tab=SomethingInvalid

When you click on any tab you will see that the hash in the URL changes immediately, and when you change the hash 
in the URL parameter manually, you can see that the UI is also updated accordingly.

 * 
 */			
		}
	});
});