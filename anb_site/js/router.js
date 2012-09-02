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
			
		}
	
	});

	Router = new PetRouter();
    Backbone.history.start();

	return Router;
});