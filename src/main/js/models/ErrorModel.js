define(function(){	

	var ErrorModel = Backbone.Model.extend({

		defaults: {
			label: null,
			description: null
		}

	});

	return ErrorModel;

});