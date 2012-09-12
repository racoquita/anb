define(function (require) {
 
    var _ = require('underscore');
    var Backbone = require('backbone');    
    var petsView = require('views/petsView')
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
		loadResults: function(search, page, num){
			//console.log(search + page + num)
			//NEW STUFF 
			var p = num ? parseInt(num, 10) : 1;
        
	       	pfc.fetch({
	       		data: {type: "pets"},
                
                success: function (response) {
                    //loadedView.render();
                    //self.load();
                    pfc = response;
                    var pview = new petsView({model: pfc, page: p});
                    pview.render()

                }
	        });

			
		},
		loadSection: function(id){
			console.log(id)
			loadedView.renderSection(item);
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