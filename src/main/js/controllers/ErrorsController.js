define([
	"collections/ErrorsCollection"
],function(ErrorsCollection){

	var ErrorsController = {

		parseGlobalErrors: function(errors) {

			_.each(errors, function(error) {
				ErrorsCollection.globalErrors.add(error);
			});
		}

	}

	return ErrorsController;

});