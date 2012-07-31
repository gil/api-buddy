define(function(){

	var TryingController = {

		tryEndpoint: function(endpoint, params) {

			// Update status to loading
			APIBuddy.trigger("updateStatus", {label: "Loading...", className: "status-yellow"});

			// Generate URL
			var url = Config.url;
			var endpointUrl = endpoint.get("url");

			// Read the method
			var method = endpoint.get("method").trim().toLowerCase();

			// Read the parameters
			var ajaxParams = {};

			_.each(params, function(param){

				var name = param.model.get("name");
				var value = getValueFrom( param.el );

				// URL param?
				if( param.model.get("urlParam") ) {

					// Replace all occurrences on URL
					endpointUrl = endpointUrl.split("{" + name + "}").join(value);

				} else if( value != null ) {

					// Add to send on Ajax request
					if( !ajaxParams[ name ] ) {
						ajaxParams[ name ] = value;	
					} else {

						// Group params by name, when there is more than one with the same name (dynamic params)
						if( !_.isArray( ajaxParams[ name ] ) ) {
							ajaxParams[ name ] = [ ajaxParams[ name ] ];
						}

						ajaxParams[ name ].push( value );
					}
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

			// Should we send arrays the traditional way?
			var traditionalSerialization = Config.traditionalSerialization ? true : false;

			// Using proxy? Send the URL and method
			if( Config.usingProxy ) {

				ajaxParams[ "__api_url" ] = endpointUrl;
				ajaxParams[ "__api_method" ] = method;

			} else {

				// No proxy, just append the endpoint to the URL
				url += endpointUrl;
			}

			// Do Ajax request
			$.ajax(url, {

				type: method,

				data: ajaxParams,

				traditional: traditionalSerialization,

				dataType: "text",

				crossDomain: true,

				cache: false,

				success: function(data, textStatus, jqXHR) {

					APIBuddy.trigger( "tryResult", data, jqXHR.getResponseHeader('content-type'), this.url );
					APIBuddy.trigger( "updateStatus", {label: "Ok!", className: "status-green"} );
				},

				error: function(jqXHR, textStatus, errorThrown) {

					var prettyError = JSON.stringify(jqXHR, null, '\t');
					APIBuddy.trigger( "tryResult", prettyError );
					APIBuddy.trigger( "updateStatus", {label: "Error!", className: "status-red"} );
				}

			});

		}

	}

	function getValueFrom(fields) {

		var values = [];

		// Get all the values
		fields.each(function(index, field){

			var value = $(field).val();

			if( value && value.length > 0 ) {
				values.push( value );
			}
		});

		if( values.length == 1 ) {

			// Single value, return as string
			return values[0];

		} else if( values.length > 1 ) {

			// Multiple values, return as array
			return values;
		}

		return null;
	}

	return TryingController;

});