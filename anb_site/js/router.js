define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');    

	var PetRouter = Backbone.Router.extend({
		routes: {
		
			'search': 'loadSearch',
			'pets': 'loadPets',
			'about' : 'loadAbout',
			'donate' : 'loadDonate',
			'volunteer': 'loadVolunteer'
		},

		loadSearch: function(){
			new (require('views/searchView'));
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
		}
	
	
	});

	var initialize = function(options){
		masterView = options.masterView;
        var router = new PetRouter(options);

        Backbone.history.start();
	};

	return {initialize:initialize};
});