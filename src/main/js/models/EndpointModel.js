define(function(){	

	var EndpointModel = Backbone.Model.extend({

		defaults: {
			label: null,
			description: null,
			url: "",
			method: "GET",
			params: []
		},

		getLabel: function() {

			if ( !this.get("label") ) {
				return this.get("url");
			}

			return this.get("label");
		}

	});

	return EndpointModel;

});