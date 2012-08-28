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
	
		
		tagName: "article",
        
        className: "pet-container",
        
        template: petItemTemplate,
        
	});

    return petItemView
});