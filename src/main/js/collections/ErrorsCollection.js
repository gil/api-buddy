define([
	"models/ErrorModel"
], function(ErrorModel){
	
	var ErrorsCollection = Backbone.Collection.extend({

		model: ErrorModel

	});

	ErrorsCollection.globalErrors = new ErrorsCollection();

	return ErrorsCollection;

});