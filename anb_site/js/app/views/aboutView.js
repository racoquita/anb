define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var aboutTemplate = require('text!templates/aboutTemplate.html');
    var aboutContentDiv;

	var AboutView =  Backbone.View.extend({
		id: 'about_view',
        
        initialize: function(){
        	this.render();
            this.load();
            console.log('init about')
        },

        render: function(){	
        	$(this.el).html(aboutTemplate);
        },

        events: {
            //'mouseenter #about_menu span':'changeHeading',
            //'mouseleave #about_menu':'revertHeading',
            'click #about_menu span': 'changeHeading'
        },

        changeHeading: function(e){
            console.log('changing')
            var sectionName = $(e.target).text();
            sectionName = sectionName.toLowerCase();
            sectionName = sectionName.replace(/ /g,"");

            var aboutContentDiv = $(this.el).find('#'+sectionName);
            
            $('#about h3').text($(e.target).text());
            $(e.target).siblings().removeClass('active');
            $(e.target).toggleClass('active');

            aboutContentDiv.siblings().removeClass('active');
            aboutContentDiv.addClass('active');    
            
        },

        revertHeading: function(){
            $('#about h3').text('What we Do');
        }
	});

    return AboutView
});