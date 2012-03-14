define([
	"Config.flickr",
	"routers/AppRouter",
	"views/EndpointsView",
	"views/TryingView",
	"controllers/GroupsController",
	"controllers/ParamsController"
],function(Config, AppRouter, EndpointsView, TryingView, GroupsController, ParamsController) {

	window.APIBuddy = {

		views: {
			"endpointsView": EndpointsView,
			"tryingView": TryingView
		},

		viewInstances: {},

		router: null,

		start: function() {

			// Register views
			this.registerViews();

			// Register Config globally, to make it easier to access 
			window.Config = Config;

			// Parse config data
			GroupsController.parseGroups( Config.groups );
			ParamsController.parseGlobalParams( Config.globalParams );

			// Start first view
			APIBuddy.tryingView();
			APIBuddy.endpointsView().render();

			// Start history manager
			this.router = new AppRouter();
			Backbone.history.start();
		},

		registerViews: function() {

			for( var viewName in this.views ) {
				APIBuddy[viewName] = this.getView(viewName);
			}
		},

		getView: function(viewName) {
			return function() {

				if( typeof this.viewInstances[viewName] === "undefined" ) {
					this.viewInstances[viewName] = new this.views[viewName]();
				}

				return this.viewInstances[viewName];
			};
		}

	};

	_.extend(APIBuddy, Backbone.Events);

	return APIBuddy;

});