define([
	"collections/GroupsCollection",
	"text!templates/groupTemplate.html",
	"text!templates/endpointTemplate.html"
], function(GroupsCollection, groupTemplate, endpointTemplate){

	var EndpointsView = Backbone.View.extend({

		className: "endpoints",

		tagName: "ul",

		initialize: function() {

			this.endpointTemplate = _.template( endpointTemplate );
			this.groupTemplate = _.template( groupTemplate );
		},

		render: function() {

			// For each endpoint group
			var groupId = 0;
			var groups = GroupsCollection.groups.models;

			_.each( groups, function(group) {

				// Appen the group
				var groupRenderer = $(this.groupTemplate({
					name: group.get("name")
				}));
				
				this.$el.append(groupRenderer);

				var endpointsUL = groupRenderer.find(".group-endpoints");

				// For each endpoint in group
				var endpointId = 0;
				var endpoints = group.get("endpoints").models;

				_.each( endpoints, function(endpoint) {

					// Append the endpoint
					var endpointRenderer = $(this.endpointTemplate({
						method : endpoint.get("method"),
						label: endpoint.getLabel(),
						url: endpoint.get("url")
					}));

					endpointRenderer.find(".endpoint-label").on("click", {group: groupId, endpoint: endpointId}, this.endpointClick);
					endpointsUL.append(endpointRenderer);

					// Increment endpoint ID
					endpointId++;

				}, this);

				// Increment group ID
				groupId++;

			}, this);

			// Add endpoints menu
			$("body").append(this.el);
		},

		endpointClick: function(e) {

			APIBuddy.router.navigate("try/" + e.data.group + "/" + e.data.endpoint, {trigger: true});
		}

	});

	return EndpointsView;

});