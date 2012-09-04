define(function (require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var fosterTemplate = require('text!templates/fosterTemplate.html');


	var FosterView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        
        	this.render();
        
        },
        
        render: function(){
        	$(this.el).html(fosterTemplate);
        },

        events: {
            "click #choose a.blue_button" : "changeForm"
        },

        changeForm: function(e){
            e.preventDefault();
            
            $("#choose a.blue_button").toggleClass("selected");
        }
	});

    return FosterView
});