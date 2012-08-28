define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var searchTemplate = require('text!templates/searchTemplate.html');


	var AboutView =  Backbone.View.extend({
	
        
        initialize: function(){
        
        	this.render();
        
        },
        
        render: function(){
        	$(this.el).html(searchTemplate);
        
        }
	});

    return AboutView
});