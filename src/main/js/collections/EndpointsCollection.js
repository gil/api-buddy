define([
	"models/EndpointModel",
	"collections/ParamsCollection"
], function(EndpointModel, ParamsCollection){
	
	var EndpointsCollection = Backbone.Collection.extend({

		model: EndpointModel,

		parse: function(endpoints) {

			var endpointModels = endpoints.models;

			_.each(endpointModels, function(endpoint) {

				var params = endpoint.get("params");
				var paramsCollection = new ParamsCollection();

				_.each(params, function(param) {
					paramsCollection.add( param );
				});

				endpoint.set("params", paramsCollection);

			});

			return endpoints;
		}

	});

	return EndpointsCollection;

});