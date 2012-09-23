define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var footer = require('text!templates/footerTemplate.html');

	var helperModel = Backbone.Model.extend({
	
        initFooter: function(){
            return footer;
        },

        initNav: function(){
        	$('#nav_list a').on('click', function(e){
        		e.preventDefault();
        		
        		//This is to prevent reloading a page the user is already on
        		if($(e.target).attr('href') == '#pets' && window.location.hash == "#pets/page/1") {
        			e.preventDefault();
        		} else {
        			Router.navigate($(e.target).closest('a').attr('href'), true);
        		}

        	})
        },

        showSpinner: function(){
        	return '<div class="spinner"><img src="images/loader.gif" /></div>';
        }

	});

	return helperModel;

});