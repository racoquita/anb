define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	
	var MasterView = Backbone.View.extend({
		el: $('#container'),
		
		initialize: function(){		
			this.render();
		},

		render: function(){
			window.location.hash = "#home";
		}
	
	});
	
	return MasterView
   
});