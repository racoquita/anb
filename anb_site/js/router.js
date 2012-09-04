define(function (require) {
 
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');    

	var PetRouter = Backbone.Router.extend({
		routes: {
		
			'home': 'loadHome',

			'pets': 'loadPets',
			'pets/:animal': 'filterAnimal',
			
			'about' : 'loadAbout',
			'donate' : 'loadDonate',
			'pets/:animal': 'filterByAnimal',
			'pets/:age': 'filterByAge',
			'foster': 'loadFoster'
		},

		loadHome: function(){
			new (require('views/homeView'));
		},

		loadPets: function(){
			new (require('views/petsView'));
		},

		loadAbout: function(){
		
			new (require('views/aboutView'))
		},

		loadDonate: function(){
			new (require('views/donateView'))
		},

		loadFoster: function(){
			new (require('views/fosterView'))
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