define(function (require) {
 
    var _ = require('underscore');
    var Backbone = require('backbone');    
    var petsView = require('views/petsView');
    var PetCollection =require('collections/PetCollection')
  
	var PetRouter = Backbone.Router.extend({
		initialize: function(){
			window.location.hash = "home";
		},

		routes: {
		
			":page":"loadPage",
            ":page/pet/:id": "loadPet",
            ":page/page/:number": "loadPetResults",
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
			console.log('load a pet');
			console.log(page + ' ' + id);
			/*loadedView.unload()
			loadedView.renderSection(id);*/
		},

		//this loads the pets page results dont erase
		loadPetResults: function(page, num){
			loadedView.pagination(num);
		},

		filterAnimal: function(animal){
			console.log(animal + " filtering")
			var pview = new (require('views/petsView'));
			
			pview.filterAnimal = animal;
			pview.trigger('click:filterAnimal')
		},
		
		filterByAge: function(age){
			console.log(age);
		}
	
	});

	Router = new PetRouter();
    Backbone.history.start();

	return Router;
});