define(function (require) {
 
    var _ = require('underscore');
    var Backbone = require('backbone');    

	var PetRouter = Backbone.Router.extend({
		initialize: function(){
			window.location.hash = "home";
		},

		routes: {
		
			":page":"loadPage",
            ":page/:section": "loadSection",
            ":page/:section/:sub": "loadSub"

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

		loadSection: function(page, section){
			loadedView.renderSection(section);
		},
		loadSub: function(search, page, num){
			console.log(search + page + num)
			loadedView.page = num
			loadedView.renderSub(num);

			

			
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