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
		loadResults: function(search, page, num){
			//console.log(search + page + num)
			//NEW STUFF 
			var p = num ? parseInt(num, 10) : 1;
        	// the only thing i need from here is page: p
        	//if we find a way to pase the page into the loaded view i dont have to fetch
	       	
	       	// pfc.fetch({
	       	//  	data: {type: "pets"},
                
         //         success: function (response) {
         //             //loadedView.render();
         //             //self.load();
         //             pfc = response;
                      new petsView({page: p});
                      //pview.render()

         //         }
	        // });

			
		},
		loadSection: function(page, id){
			console.log(page, id)
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