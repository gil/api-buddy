define(function(){

	var TryingController = {

		tryEndpoint: function(endpoint, params) {

			// Update status to loading
			APIBuddy.trigger("updateStatus", {label: "Loading...", className: "status-yellow"});

			// Generate URL
			var url = Config.url + endpoint.get("url");

			// Read the method
			var method = endpoint.get("method").trim().toLowerCase();

			// Read the parameters
			var ajaxParams = {};

			_.each(params, function(param){

				var name = param.model.get("name");
				var value = param.el.val() ? param.el.val().trim() : "";

				// URL param?
				if( param.model.get("urlParam") ) {

					// Replace all occurrences on URL
					url = url.split("{" + name + "}").join(value);

				} else if( value.length > 0 ) {

					// Add to send on Ajax request
					ajaxParams[ name ] = value;

				}

			});

			// Should we send the method as a parameter?
			if( Config.methodParam ) {

				ajaxParams[Config.methodParam] = method;

				// If it's not GET, then any other method should be passed as POST.
				if( method != "get" ) {
					method = "post";
				}
			}

			// Do Ajax request
			$.ajax(url, {

				type: method,

				data: ajaxParams,

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