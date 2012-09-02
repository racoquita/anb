define(function (require) {
   
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var homeTemplate = require('text!templates/homeTemplate.html');

	var HomeView =  Backbone.View.extend({
		el: $("#container"),
        
        initialize: function(){
        	this.render();
        },
        
        render: function(){
        	$(this.el).html(homeTemplate);        
        }
	});

    return HomeView;
});