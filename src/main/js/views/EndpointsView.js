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
			this.render();
		},

		render: function() {

			// For each endpoint group
			var groups = GroupsCollection.groups.models;

			_.each( groups, function(group) {

				// Appen the group
				var groupRenderer = $(this.groupTemplate({
					name: group.get("name")
				}));

				var endpointsUL = $(groupRenderer).find(".group-endpoints");
				$(this.el).append(groupRenderer);

				// For each endpoint in group
				var endpoints = group.get("endpoints").models;

				_.each( endpoints, function(endpoint) {

					// Append the endpoint
					var endpointRenderer = $(this.endpointTemplate({
						method : endpoint.get("method"),
						label: endpoint.getLabel()
					}));

					endpointRenderer.find(".endpoint-label").on("click", {endpoint: endpoint}, this.endpointClick);
					
					endpointsUL.append(endpointRenderer);

				}, this);

			}, this);

			// Add endpoints menu
			$("body").append(this.el);
		},

		endpointClick: function(e) {

			APIBuddy.tryingView();	
			APIBuddy.trigger("endpointSelected", e.data.endpoint);
		}

	});

	return EndpointsView;

});