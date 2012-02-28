define([
	"controllers/TryingController",
	"collections/ParamsCollection",
	"text!templates/tryingTemplate.html"
],function(TryingController, ParamsCollection, tryingTemplate){

	var TryingView = Backbone.View.extend({

		className: "trying",

		initialize: function() {

			this.tryingTemplate = _.template( tryingTemplate );
			APIBuddy.on("endpointSelected", this.render, this);
			APIBuddy.on("tryResult", this.showResult, this);
			APIBuddy.on("updateStatus", this.updateStatus, this);
		},

		render: function(endpoint) {

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

			$(this.el).html( trying );
			$(this.el).find(".try-form").on("submit", {endpoint: endpoint}, this.tryClick);
			$(this.el).find(".try-format-json").on("click", this.formatJSON);
			$(this.el).find(".try-format-xml").on("click", this.formatXML);

			// Add API trying screen			
			$("body").append(this.el);
		},

		tryClick: function(e) {

			// Read parameters
			var params = {};
			
			$(".trying-input").each(function(index, el){
				
				el = $(el);

				if( el.val().trim().length > 0 ) {
					params[ el.attr("id") ] = el.val();	
				}
			});

			// Call API
			TryingController.tryEndpoint( e.data.endpoint, params );

			// Avoid submiting form
			e.preventDefault();
			return false;
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