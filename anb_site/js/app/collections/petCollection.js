define(function (require) {
  
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var petModel = require('models/petModel');
  
	var PetCollection = Backbone.Collection.extend({
	
		model: petModel,
        url: 'xhr/get_shelter.php',
    	parse: function(response){
    		console.log(response)
    		
    		return response.pets.pet;
    	}   
	
	});
	
	return PetCollection;
    
});