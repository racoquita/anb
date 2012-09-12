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
            ":page/:id": "loadSection",
            ":page/:results/:number": "loadResults",
            //":page/:results/:number/item": "loadSection"

			/*'pets/:animal': 'filterAnimal',
			'pets/:animal': 'filterByAnimal',
			'pets/:age': 'filterByAge'*/
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
		//this loads the pets page results dont erase
		loadResults: function(search, page, num){
			
			var p = num ? parseInt(num, 10) : 1;
			//console.log(search + ' ' + page + ' ' + num )
         	loadedView.options.page = p
         	loadedView.render();
		},

		//this is supposed to load the pet detail view 
		loadSection: function(page, id){
			
			loadedView.unload()
			loadedView.renderSection(id);
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