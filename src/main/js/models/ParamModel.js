define(function(){	

	var ParamModel = Backbone.Model.extend({

		defaults: {
			label: null,
			name: null,
			value: null,
			description: null,
			visible: true,
			globalParam: false,
			urlParam: false,
			multiValue: false,
			multipart: false,
			required: false,
			headerParam: false
		},

		getLabel: function() {

			if ( !this.get("label") ) {
				return this.get("name");
			}

			return this.get("label");
		},

		getDescription: function () {
			if (this.get("required")) {
				return this.get("description") + ' (REQUIRED)';
			}
			
			return this.get("description");
		}

	});

	return ParamModel;

});