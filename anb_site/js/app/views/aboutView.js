define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var aboutTemplate = require('text!templates/aboutTemplate.html');

	var AboutView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        	this.render();
            this.load();
        },

        render: function(){	
        	$(this.el).html(aboutTemplate);
        },

        events: {
            'mouseenter #about_menu span':'changeHeading',
            'mouseleave #about_menu':'revertHeading'
        },

        changeHeading: function(e){
            $('#about h3').text($(e.target).text());
            
        },

        revertHeading: function(){
            $('#about h3').text('About');
        }
	});

    return AboutView
});