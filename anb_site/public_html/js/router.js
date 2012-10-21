define(function (require) {
 
    var _ = require('underscore');
    var Backbone = require('backbone');    
    var petsView = require('views/petsView');
    var PetCollection =require('collections/petCollection')
  
	var PetRouter = Backbone.Router.extend({
		initialize: function(){
			window.location.hash = "home";
		},

		routes: {
		
			":page":"loadPage",
            ":page/pet/:id": "loadPet",
            ":page/page/:number": "loadPetResults"
		},

		loadPage: function(page){
			requirejs(['views/' + page + 'View'], function(returnedView){
				if(typeof loadedView != 'undefined'){
					loadedView.unload();
				}
				if(typeof returnedView != 'undefined') {
					loadedView = new returnedView();
				}
	        });
		},
		
		//this is supposed to load the pet detail view 
		loadPet: function(page, id){
			loadedView.renderSection(id);
		},

		//this loads the pets page results
		loadPetResults: function(page, num){
			loadedView.pagination(num);
		}
	
	});

	Router = new PetRouter();
    Backbone.history.start();

	return Router;
});