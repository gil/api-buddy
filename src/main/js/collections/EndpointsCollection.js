define([
	"models/EndpointModel",
	"collections/ParamsCollection",
	"collections/ErrorsCollection"
], function(EndpointModel, ParamsCollection, ErrorsCollection){
	
	var EndpointsCollection = Backbone.Collection.extend({

		model: EndpointModel,

		parse: function(endpoints) {

			var endpointModels = endpoints.models;

			_.each(endpointModels, function(endpoint) {

				// Generate parameters collection
				var params = endpoint.get("params");
				var paramsCollection = new ParamsCollection();

				_.each(params, function(param) {
					paramsCollection.add( param );
				});

				endpoint.set("params", paramsCollection);

				// Generate errors collection
				var errors = endpoint.get("errors");
				var errorsCollection = new ErrorsCollection();

				_.each(errors, function(error) {
					errorsCollection.add( error );
				});

				endpoint.set("errors", errorsCollection);

			});

			return endpoints;
		}

	});

	return EndpointsCollection;

});