define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var footer = require('text!templates/footerTemplate.html');

	var helperModel = Backbone.Model.extend({
	
        initFooter: function(){
            return footer;
        },

        showSpinner: function(){
        	return '<div class="spinner"><img src="images/loader.gif" /></div>';
        }

	});

	return helperModel;

});