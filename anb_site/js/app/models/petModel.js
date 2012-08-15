define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');


	
	var PetModel = Backbone.Model.extend({
	
		defaults: {
    		photo: '../../../img/placeholder.png',
    		age: "",
			animal: "",
			id: "",
			sex: "",
			name: "",
			size: "",
			description: "",
			contact: "",
			mix: "",
			status: "",
			breeds: "",
			email: ""

    	},
    	parse: function(data){
    		//console.log(data)
    		obj = {
    			//photo: data.media.photos.photo,
    			age: data.age,
    			animal: data.animal,
    			id: data.id,
    			name: data.name,
    			sex: data.sex,
    			size: data.size,
    			email: data.contact.email
    		
    		}
    		return obj
    	}
	
	});

	return PetModel;

});