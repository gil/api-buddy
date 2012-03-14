define([
	"models/GroupModel",
	"collections/EndpointsCollection",
], function(GroupModel, EndpointsCollection){
	
	var GroupsCollection = Backbone.Collection.extend({

		model: GroupModel,

		parse: function(groups) {

			_.each(groups, function(group) {

				// Generate endpoints collection
				var endpoints = new EndpointsCollection();

				_.each(group.endpoints, function(endpoint) {
					endpoints.add( endpoint );
				});

				endpoints = endpoints.parse(endpoints);
				group.endpoints = endpoints;

			});

			return groups;
		}

	});

	GroupsCollection.groups = new GroupsCollection();

	return GroupsCollection;

});