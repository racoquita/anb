define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');    

	var PetRouter = Backbone.Router.extend({
		routes: {
		
			'home': 'loadHome',
			'pets': 'loadPets',
			'about' : 'loadAbout',
			'donate' : 'loadDonate',
			'volunteer': 'loadVolunteer',
			'pets/:animal': 'filterByAnimal',
			'pets/:age': 'filterByAge'
			
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
		loadVolunteer: function(){
			new (require('views/volunteerView'))
		},
		filterByAnimal: function(animal){
			console.log(animal + " filtering")
			var pview = new (require('views/petsView'));
			
			pview.filterAnimal = animal;
			pview.trigger('click:filterAnimal')
		},
		filterByAge: function(age){
			console.log(age);
		
		}
	
	
	});

	var initialize = function(options){
		masterView = options.masterView;
        var router = new PetRouter(options);

        Backbone.history.start();
	};

	return {initialize:initialize};
});