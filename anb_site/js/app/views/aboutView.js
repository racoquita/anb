define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var aboutTemplate = require('text!templates/aboutTemplate.html');


	var AboutView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        
        	this.render();
        
        },
        
        render: function(){
        	$(this.el).html(aboutTemplate);
        
        }
	});

    return AboutView
});