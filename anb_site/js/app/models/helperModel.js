define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var footer = require('text!templates/footerTemplate.html');

	var helperModel = Backbone.Model.extend({
	
        initFooter: function(){
            return footer;
        }

	});

	return helperModel;

});