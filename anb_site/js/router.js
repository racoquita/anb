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
			'filter/animal': 'filterAnimal'
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
		filterAnimal: function(animal){
			console.log(animal + "filtering")
			
		}
	
	
	});

	var initialize = function(options){
		masterView = options.masterView;
        var router = new PetRouter(options);

        Backbone.history.start();
	};

	return {initialize:initialize};
});