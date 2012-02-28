require.config({

	// Used to avoid cache. Probably for dev environment only.
	urlArgs: "bust=" +  (new Date()).getTime(),

	paths: {
		"templates" : "../templates"
	}

});

require([
	"order!libs/jquery",
	"order!libs/underscore",
	"order!libs/json2",
	"order!libs/backbone",
	"order!libs/vkbeautify",
	"order!APIBuddy"
], function(){

	var APIBuddy = _.last(arguments);
	APIBuddy.start();

});