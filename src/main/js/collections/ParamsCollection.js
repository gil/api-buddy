define([
	"models/ParamModel"
], function(ParamModel){
	
	var ParamsCollection = Backbone.Collection.extend({

		model: ParamModel

	});

	ParamsCollection.globalParams = new ParamsCollection();

	return ParamsCollection;

});