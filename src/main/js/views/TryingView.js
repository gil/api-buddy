define([
	"controllers/TryingController",
	"collections/ParamsCollection",
	"collections/ErrorsCollection",
	"models/ParamModel",
	"text!templates/tryingTemplate.html",
	"text!templates/footerTemplate.html"
],function(TryingController, ParamsCollection, ErrorsCollection, ParamModel, tryingTemplate, footerTemplate){

	var TryingView = Backbone.View.extend({

		events: {
			"submit .try-form" : "tryClick",
			"click .try-param-add" : "duplicateParam",
			"click .try-param-remove" : "removeParam",
			"click .try-format-json" : "formatJSON",
			"click .try-format-xml" : "formatXML"
		},

		elements: {
			"form" : ".try-form",
			"tryResult" : ".try-result",
			"tryResultText" : ".try-result-text",
			"inputs" : ".trying-input",
			"status" : ".try-result-status"
		},

		className: "trying",

		endpoint: null,

		initialize: function() {

			// Initialize properties
			this.endpoint = null;

			// Bind functions
			this.tryClick = _.bind(this.tryClick, this);

			// Render templates
			this.tryingTemplate = _.template( tryingTemplate );

			// Listen to events
			APIBuddy.on("endpointSelected", this.render, this);
			APIBuddy.on("tryResult", this.showResult, this);
			APIBuddy.on("updateStatus", this.updateStatus, this);
		},

		render: function(endpoint) {

			// Store endpoint
			this.endpoint = endpoint;

			// Render screen
			this.$el
				.empty()
				.append( this.tryingTemplate({
					label: endpoint.getLabel(),
					url: endpoint.get("url"),
					method: endpoint.get("method"),
					description: endpoint.get("description"),
					dynamicParams: endpoint.get("dynamicParams"),
					params: this.getAllParams( endpoint ),
					errors: this.getAllErrors( endpoint )
				}) )
				.append( footerTemplate )
				.appendTo( $("body") );

			this.reloadElements();

			// Hide result, when there is a upload
			if( this.hasUpload() ) {
				this.$tryResult.hide();
			}
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

		hasUpload: function() {
			return (this.$("input[type=file]").length > 0);
		},

		tryClick: function(e) {

			// No uploads? Call using Ajax and prevent form submit
			if( !this.hasUpload() ) {

				// Call API
				TryingController.tryEndpoint( this.endpoint, this.getParamElements(this.endpoint) );

				// Avoid submiting form
				e.preventDefault();
				return false;

			} else {

				// Set form action and call upload
				this.$form.attr( "action", Config.url + this.endpoint.get("url") );
			}
		},

		duplicateParam: function(e) {

			// Get elements to be cloned and clone
			var input = $(e.target).parent().find(".trying-input, .trying-signal");
			var clones = input.clone();

			// Create a div and add to the DIV outside the field
			input.parents(".try-param").append(
				$('<div class="param-clone"></div>').append( clones )
			);
			this.reloadElements();

			// Clean values and focus the cloned input
			clones.val("").first().focus();
		},

		removeParam: function(e) {

			// Find all clones
			var clones = $(e.target).parents(".try-param").find(".param-clone");

			// Remove the last one
			clones.last().remove();
			this.reloadElements();

			// Focus the last one now
			clones.eq(-2).find(".trying-input").first().focus();
		},

		getParamElements: function(endpoint) {

			// Find elements for each endpoint parameter and return a map
			var requestParams = [];
			var params = this.getAllParams( endpoint );

			_.each(params, function(param){

				requestParams.push({
					model: param,
					el: this.$inputs.filter( "#" + param.get("name") )
				});

			}, this);

			// Get dynamic parameters
			var dynParamNames = this.$(".trying-input.dyn-param-name").toArray();
			var dynParamValues = this.$(".trying-input.dyn-param-value").toArray();

			_.each(dynParamNames, function(nameField, index){

				requestParams.push({
					model: new ParamModel({ name: $(nameField).val() }),
					el: $( dynParamValues[index] )
				});
			});

			return requestParams;
		},

		updateStatus: function(status) {

			this.$status
				.html( "[" + status.label + "]" )
				.removeClass("status-yellow status-green status-red")
				.addClass(status.className);
		},

		showResult: function(result, contentType, url) {

			if( contentType && contentType.indexOf("image/") == 0 ) {

				// Image content type? Create image element.
				this.$tryResult
					.empty()
					.append(
						$("<h2/>").addClass("try-title").text("Result"),
						$("<img/>").attr("src", url)
					);

			} else {

				// Show result
				this.$tryResultText.val(result);

				// Try to auto format result
				if( result ) {
					if( result.charAt(0) == "{" ) {
						this.formatJSON();
					} else if( result.charAt(0) == "<" ) {
						this.formatXML();
					}
				}

			}
		},

		formatJSON: function() {

			try{
				var formatedVal = vkbeautify.json( this.$tryResultText.val() );
				this.$tryResultText.val( formatedVal );
				//JSON.stringify(JSON.parse(text), null, '\t');
			} catch (e) {
				alert("Invalid format!");
			}
		},

		formatXML: function() {

			try{
				var formatedVal = vkbeautify.xml( this.$tryResultText.val() );
				this.$tryResultText.val( formatedVal );
			} catch (e) {
				alert("Invalid format!");
			}
		}

	});

	return TryingView;

});