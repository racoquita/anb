define(function (require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var volunteerTemplate = require('text!templates/volunteerTemplate.html');


	var VolunteerView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        
        	this.render();
        
        },
        
        render: function(){
        	$(this.el).html(volunteerTemplate);
        
        }
	});

    return VolunteerView
});