sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employee.Employee", {
		onInit: function () {
			"use strict";
			debugger;
			
			var oRouter = this.getRouter();
			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			/*
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			*/
		},
		
/*
 * 
 * Now we create the file Employee.controller.js in the webapp/controller/employee folder. In this controller file, 
 * we want to detect which employee shall be displayed in order to show the employee’s data in the view. 
 * Therefore, we query the router for the route employee and attach a private event listener function _onRouteMatched 
 * to the matched event of this route.

In the event handler, we can access the arguments parameter from the oEvent parameter that contains all 
parameters of the pattern. Since this listener is only called when the route is matched, we can be sure that 
the mandatory parameter employeeId is always available as a key in arguments; otherwise the route would not have
 matched. The name of the mandatory parameter employeeId correlates to the {employeeId} from our pattern definition of 
 the route employee and thus to the value in the URL.

In _onRouteMatched we call bindElement() on the view to make sure that the data of the specified employee is available 
in the view and it’s controls. The ODataModel will handle the necessary data requests to the back end in the background. 
While the data is loading, it would be nice to show a busy indicator by simply setting the view to busy. Therefore, we 
pass an events object to bindElement() to listen to the events dataRequested and dataReceived. The attached functions 
handle the busy state by calling oView.setBusy(true) and oView.setBusy(false) respectively.

We also add an event handler to the change event as a private function _onBindingChange. It checks if the data could be 
loaded by querying the binding context of the view. As seen in the previous steps, we will display the notFound target 
if the data could not be loaded.

Note
Instead of calling attachMatched(…) on a route we could also call attachRouteMatched(…) directly on the router. However, 
the event for the latter is fired for every matched event of any route in the whole app. We don’t use the latter because 
we would have to implement an additional check for making sure that current route is the route that has been matched. 
We want to avoid this extra overhead and register on the route instead.
 * 
 * 
 */		
		_onRouteMatched : function (oEvent) {
			"use strict";
			debugger;
			
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						"use strict";
						debugger;
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						"use strict";
						debugger;
						oView.setBusy(false);
					}
				}
			});
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
		onShowResume : function (oEvent) {
			
/*
 * Then we change the Employee.controller.js file by adding the press handler onShowResume 
 * for the Flip to Resume link. The handler simply navigates to a new route employeeResume and fills 
 * the mandatory parameter employeeId with the property EmployeeID from the view’s bound context. The route 
 * employeeResume is not available yet, so we will have to add it to our routing configuration.
 * 
 * In the routing configuration, we add a new route employeeResume which references a target with the same name. The route’s pattern expects an {employeeId} as a mandatory parameter and ends with the static string /resume.

The target employeeResume references the view employee.Resume that we are about to create. 
The target’s viewLevel is 4; compared to the employee target this is one level lower again. 
To configure a flip navigation, we simply set the transition of our target to flip. Together with the correct 
viewLevel configuration this will trigger the correct forward and backward flip navigation whenever the target is displayed.

Note
Possible values for the transition parameter are:

slide (default)

flip

show

fade

You can also implement your own transitions and add it to a control that extends sap.m.NavContainer 
(for example, sap.m.App or sap.m.SplitApp). For more information, see the API Reference for NavContainer.
 * 
 */			
			"use strict";
			debugger;
			
			var oCtx = this.getView().getElementBinding().getBoundContext();

			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}
		
	});
});