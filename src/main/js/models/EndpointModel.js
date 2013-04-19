define(function(){	

	var EndpointModel = Backbone.Model.extend({

		defaults: {
			label: null,
			description: null,
			dynamicParams: false,
			url: "",
			method: "GET",
			jsonType: false,
			className: null,
			params: [],
			errors: []
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