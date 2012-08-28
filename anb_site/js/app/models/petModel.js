define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');


	
	var PetModel = Backbone.Model.extend({
	
		defaults: {
    		photo: 'images/placeholder.png',
    		//photo: "",
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
    		//sconsole.log(data.media.photos.photo[0])
    		obj = {
    			//photo: data.media.photos.photo[0],
    			//photo: data.media.photos.photo[0],
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