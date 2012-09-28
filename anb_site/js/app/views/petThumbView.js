define(function (require) {
    // Load any app-specific modules
  
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var petItemTemplate = require('text!templates/petItemTemplate.html');
	var petModel = require('models/petModel');

	var petThumbView =  Backbone.View.extend({
	
        el: $('.thumbs'),

        tagName: 'li',
        
        render: function(){
        
        	$(this.el).append(tmpl(this.model.toJSON()));
        	
        	return this;
        }
	});

    return petThumbView
});