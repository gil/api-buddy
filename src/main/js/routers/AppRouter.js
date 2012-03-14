define([
	"collections/GroupsCollection"
], function(GroupsCollection){
	
	return Backbone.Router.extend({
		
		routes: {
			"try/:group/:endpoint" : "showEndpoint"
		},

		showEndpoint: function(groupId, endpointId) {

			// Look for group
			var group = GroupsCollection.groups.models[groupId];

			if( group ) {

				// Look for endpoint inside group
				var endpoint = group.get("endpoints").models[endpointId];

				// Trigger endpoint
				if (endpoint) {
					APIBuddy.trigger("endpointSelected", endpoint);
				}
			}
		}

	});

});