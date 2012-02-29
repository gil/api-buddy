define([
	"collections/ParamsCollection"
],function(ParamsCollection){

	var ParamsController = {

		parseGlobalParams: function(params) {

			_.each(params, function(param) {
				
				param.globalParam = true;
				ParamsCollection.globalParams.add(param);
			});
		}

	}

	return ParamsController;

});