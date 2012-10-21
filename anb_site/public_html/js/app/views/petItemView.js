define(function (require) {
    // Load any app-specific modules
  
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var petItemTemplate = require('text!templates/petItemTemplate.html');
	var petModel = require('models/petModel');

	var petItemView =  Backbone.View.extend({
	
        tagName: 'article',
        
        template: petItemTemplate,
        
        render: function(){
        
        	var tmpl = _.template(this.template);
        	$(this.el).append(tmpl(this.model.toJSON()));
        	
        	return this;
        }
	});

    return petItemView
});