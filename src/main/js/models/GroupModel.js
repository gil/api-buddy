define(function(){	

	var GroupModel = Backbone.Model.extend({

		defaults: {
			name: null,
			endpoints: null
		}

	});

	return GroupModel;

});