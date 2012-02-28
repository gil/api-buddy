define(function(){	

	var ParamModel = Backbone.Model.extend({

		defaults: {
			label: null,
			name: null,
			value: null,
			description: null,
			visible: true
		},

		getLabel: function() {

			if ( !this.get("label") ) {
				return this.get("name");
			}

			return this.get("label");
		}

	});

	return ParamModel;

});