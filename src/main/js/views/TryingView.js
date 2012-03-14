define([
	"controllers/TryingController",
	"collections/ParamsCollection",
	"collections/ErrorsCollection",
	"models/ParamModel",
	"text!templates/tryingTemplate.html",
	"text!templates/footerTemplate.html"
],function(TryingController, ParamsCollection, ErrorsCollection, ParamModel, tryingTemplate, footerTemplate){

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

			// Render screen
			var trying = $(this.tryingTemplate({
				label: endpoint.getLabel(),
				url: endpoint.get("url"),
				method: endpoint.get("method"),
				description: endpoint.get("description"),
				dynamicParams: endpoint.get("dynamicParams"),
				params: this.getAllParams( endpoint ),
				errors: this.getAllErrors( endpoint )
			}));

			el.html( trying );
			
			// Add endpoint handlers
			el.find(".try-form").on("submit", {_this: this, endpoint: endpoint}, this.tryClick);
			el.find(".try-param-add").on("click", this.duplicateParam);
			el.find(".try-param-remove").on("click", this.removeParam);

			// Add formating handlers
			el.find(".try-format-json").on("click", this.formatJSON);
			el.find(".try-format-xml").on("click", this.formatXML);

			// Add footer
			el.append( footerTemplate );

			// Add API trying screen			
			$("body").append(el);
		},

		getAllParams: function(endpoint) {

			var globalParams = ParamsCollection.globalParams.models;
			var endpointParams = endpoint.get("params").models;

			return globalParams.concat( endpointParams );
		},

		getAllErrors: function(endpoint) {

			var globalErrors = ErrorsCollection.globalErrors.models;
			var endpointErrors = endpoint.get("errors").models;

			return endpointErrors.concat( globalErrors );
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

		duplicateParam: function(e) {

			// Get elements to be cloned and clone
			var input = $(e.target).parent().find(".trying-input, .trying-signal");
			var clones = input.clone();

			// Create a div and add to the DIV outside the field
			input.parent().parent().append(
				$('<div class="param-clone"></div>').append( clones )
			);

			// Focus the cloned input
			clones.val("").first().focus();
		},

		removeParam: function(e) {

			// Find all clones
			var clones = $(e.target).parent().parent().find(".param-clone");

			// Remove the last one
			clones.last().remove();

			// Focus the last one now
			clones.eq(-2).find(".trying-input").focus();
		},

		getParamElements: function(endpoint) {

			// Find elements for each endpoint parameter and return a map
			var requestParams = [];
			var params = this.getAllParams( endpoint );
			var inputs = $(".trying-input");

			_.each(params, function(param){

				var paramName = param.get("name");
				var el = inputs.filter("#" + paramName);

				requestParams.push({
					model: param,
					el: el
				});
			});

			// Get dynamic parameters
			var dynParamNames = $(".trying-input.dyn-param-name").toArray();
			var dynParamValues = $(".trying-input.dyn-param-value").toArray();

			_.each(dynParamNames, function(nameField, index){

				requestParams.push({
					model: new ParamModel({ name: $(nameField).val() }),
					el: $(dynParamValues[index])
				});
			});

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