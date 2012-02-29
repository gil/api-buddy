define([
	"controllers/TryingController",
	"collections/ParamsCollection",
	"text!templates/tryingTemplate.html",
	"text!templates/footerTemplate.html"
],function(TryingController, ParamsCollection, tryingTemplate, footerTemplate){

	var TryingView = Backbone.View.extend({

		className: "trying",

		initialize: function() {

			this.tryingTemplate = _.template( tryingTemplate );
			APIBuddy.on("endpointSelected", this.render, this);
			APIBuddy.on("tryResult", this.showResult, this);
			APIBuddy.on("updateStatus", this.updateStatus, this);
		},

		render: function(endpoint) {

			var el = $(this.el);

			// Read parameters to render
			var globalParams = ParamsCollection.globalParams.models;
			var endpointParams = endpoint.get("params").models;
			var allParams = globalParams.concat( endpointParams );

			// Render screen
			var trying = $(this.tryingTemplate({
				label: "[" + endpoint.get("method").toUpperCase() + "] " + endpoint.getLabel(),
				description: endpoint.get("description"),
				params: allParams
			}));

			el.html( trying );
			el.find(".try-form").on("submit", {_this: this, endpoint: endpoint}, this.tryClick);
			el.find(".try-format-json").on("click", this.formatJSON);
			el.find(".try-format-xml").on("click", this.formatXML);

			// Add footer
			el.append( footerTemplate );

			// Add API trying screen			
			$("body").append(el);
		},

		tryClick: function(e) {

			var endpoint = e.data.endpoint;
			var _this = e.data._this;

			// Call API
			TryingController.tryEndpoint( endpoint, _this.getParamElements(endpoint) );

			// Avoid submiting form
			e.preventDefault();
			return false;
		},

		getParamElements: function(endpoint) {

			// Find elements for each endpoint parameter and return a map
			var requestParams = [];
			var params = endpoint.get("params");

			if( params.length > 0 ) {

				params = params.models;

				_.each(params, function(param){

					var paramName = param.get("name");
					var el = $("#" + paramName + ".trying-input");

					requestParams.push({
						model: param,
						el: el
					});
				});
			}

			return requestParams;
		},

		updateStatus: function(status) {
			$(".try-result-status").html( "[" + status.label + "]" )
									.removeClass("status-yellow status-green status-red")
									.addClass(status.className);
		},

		showResult: function(result) {
			$(".try-result-text").val(result);
		},

		formatJSON: function() {

			try{
				var resultTextArea = $(".try-result-text");
				resultTextArea.val( vkbeautify.json( resultTextArea.val() ) );
				//JSON.stringify(JSON.parse(text), null, '\t');
			} catch (e) {
				alert("Invalid format!");
			}
		},

		formatXML: function() {

			try{
				var resultTextArea = $(".try-result-text");
				resultTextArea.val( vkbeautify.xml( resultTextArea.val() ) );
			} catch (e) {
				alert("Invalid format!");
			}
		}

	});

	return TryingView;

});