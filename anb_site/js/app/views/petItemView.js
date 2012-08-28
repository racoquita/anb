define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var petItemTemplate = require('text!templates/petItemTemplate.html');
	var petModel = require('models/petModel');

	var petItemView =  Backbone.View.extend({
	
        
        template: petItemTemplate,
        
        render: function(){
        
        	
       	 //$(this.el).append(petItemTemplate);
        	var tmpl = _.template(this.template);
        	$(this.el).append(tmpl(this.model.toJSON()));
        	
        	return this;
        }
	});

    return petItemView
});