define(function(){
	
	_.extend(Backbone.View.prototype, {

		// Reload all elements from "elements" object to allow easier access
		reloadElements: function() {

			_.each(this.elements, _.bind(function(selector, name) {
				this[ "$" + name ] = this.$(selector);
			}, this));
		}

	});

	return null;

});