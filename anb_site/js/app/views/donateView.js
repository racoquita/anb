define(function (require) {
   
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var donateTemplate = require('text!templates/donateTemplate.html');


	var DonateView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        
        	this.render();
        
        },
        
        render: function(){
        	$(this.el).html(donateTemplate);
        
        }
	});

    return DonateView
});