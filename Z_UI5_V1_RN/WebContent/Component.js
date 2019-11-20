sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.nav.Component", {

		metadata: {
			manifest: "json"
		},

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();
            
/*
 * Single-page applications based on SAPUI5 can use a so-called “router” to dispatch hash-based URLs to one or more 
 * views of the app. Therefore, the router needs to know how to address and show the views. In SAPUI5, we can simply 
 * add a routing section to our existing sap.ui5 section in the descriptor file to configure the router. There are 
 * three properties that can be used to configure the routing of your application:
config

This section contains the global router configuration and default values that apply for all routes and targets. 
The default value for routerClass is sap.ui.core.routing.Router. We set the routerClass to sap.m.routing.Router 
because we implement an app based on sap.m. Furthermore, we define where our views are located in the app. To load and 
display views automatically, we also specify the controlId of the control that is used to display the pages and the 
aggregation (controlAggregation) that will be filled when a new page is displayed. We will create only XMLviews in this 
tutorial, so we can set the viewType property to XML. All our views will be available in the view folder of the 
namespace sap.ui.demo.nav, so we can set the viewPath to sap.ui.demo.nav.view. The transition allows us to set a default 
value for how the transition should happen; you can choose between slide (default), flip, fade, and show. 
All parameters of the config section can be overruled in the individual route and target definitions if needed.
Note
The possible values for routerClass are sap.ui.core.routing.Router, sap.m.routing.Router, or any other subclasses 
of sap.ui.core.routing.Router. Compared to sap.ui.core.routing.Router the sap.m.routing.Router is optimized for mobile 
apps and adds the properties viewLevel, transition and transitionParameters which can be specified for each route or 
target created by the sap.m.routing.Router. The transitionParameters can also be used for custom transitions. Please 
check the API Reference for more information.

routes

Each route defines a name, a pattern, and one or more targets to navigate to when the route has been hit. 
The pattern is basically the hash part of the URL that matches the route. The sequence of the routes is important 
because only the first matched route is used by the router. In our case, we have an empty pattern to match the empty 
hash. The name property allows you to choose a unique route name that helps you to navigate a specific route or to 
determine the matched route in one of the matched handlers (we'll explain that in a later step). The target property 
references one or more targets from the section below that will be displayed when the route has been matched.

targets

A target defines the view that is displayed. It is associated with one or more routes or it can be displayed manually 
from within the app. Whenever a target is displayed, the corresponding view is loaded and added to the aggregation 
configured with the controlAggregation option of the control. This option is configured using controlId. Each target 
has a unique key (home). The viewName defines which view shall be loaded. In our little example, the absolute view 
path to be loaded for our home target is determined by the default "viewPath": "sap.ui.demo.nav.view" and "viewName": "Home". 
This leads to "sap.ui.demo.nav.view.Home". The viewLevel is especially relevant for flip and slide transitions. It helps 
the router to determine the direction of the transition from one page to another. (This will also be explained later.) 
A target can be assigned to a route, but it's not necessary. Targets can be displayed directly in the app without 
hitting a route.

This basic routing configuration was easy enough. However, you can’t see it in action until you have initialized the 
router.

Note
As of SAPUI5 version 1.30, we recommend that you define the routing in the manifest.json descriptor file using routes 
and targets. In older versions of SAPUI5, the routing configuration had to be done directly in the metadata section of 
the component, and with different syntax.

We override the init function and call the parent’s init function first. We get a reference to the router and 
call initialize() on it. The router is instantiated automatically with the configuration loaded in the descriptor. 
The routing events and our configuration in the descriptor are now automatically enabled in the app. Running the app 
at this point would lead to an error, because the home view is not implemented yet.

Setting the viewLevel to 2 helps the router to determine how to animate the (in our case) slide transition. 
For us, this means that a navigation from the home page to the employees target will be animated with a “Slide to Left” 
animation. In contrast to that, the back navigation from the employees target to the home page will be 
animated with a “Slide to Right” animation. This behavior is due to the fact that the home page has a lower viewLevel 
than the employees target.
 */            
            
            
            
        }

	});

});
