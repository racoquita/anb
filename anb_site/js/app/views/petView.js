define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var PetView =  Backbone.View.extend({
	
	
		tagName: "article",
        
        className: "contact-container",
        
        template: $("#petTemplate").html(),
        
        render: function () {
            
           var tmpl = _.template(this.template);
            
           $(this.el).html(tmpl(this.model.toJSON()));
            
           return this;
        }
	});

    return PetView
});