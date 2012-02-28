define([
	"Config"
],function(Config){

	var TryingController = {

		tryEndpoint: function(endpoint, params) {

			// Update status to loading
			APIBuddy.trigger("updateStatus", {label: "Loading...", className: "status-yellow"});

			// Generate URL
			var url = Config.url + endpoint.get("url");

			// Read the method
			var method = endpoint.get("method").trim().toLowerCase();

			if( Config.methodParam ) {

				// Passing the method as a parameter
				params[Config.methodParam] = method;

				// If it's not GET, then any other method should be passed as POST.
				if( method != "get" ) {
					method = "post";
				}
			}

			// Do Ajax request
			$.ajax(url, {

				type: method,

				data: params,

				dataType: "text",

				success: function(data, textStatus, jqXHR) {

					APIBuddy.trigger("tryResult", data);
					APIBuddy.trigger("updateStatus", {label: "Ok!", className: "status-green"});
				},

				error: function(jqXHR, textStatus, errorThrown) {

					var prettyError = JSON.stringify(jqXHR, null, '\t');
					APIBuddy.trigger("tryResult", prettyError);
					APIBuddy.trigger("updateStatus", {label: "Error!", className: "status-red"});
				}

			});

		}

	}

	return TryingController;

});