define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var petModel = Backbone.Model.extend({
	
		defaults: {
    		
    		photo: 'images/placeholder.png',
    		photos : '',
    		age: "",
			animal: "",
			id: "",
			sex: "",
			name: "",
			size: "",
			description: "No description available at this time",
			contact: "",
			mix: "",
			status: "",
			breeds: "",
			email: ""

    	},
    	parse: function(data){
    		
    		obj = {
    			age: data.age,
    			animal: data.animal,
    			id: data.id,
    			name: data.name,
    			sex: data.sex == 'M' ? 'Male' : 'Female',
    			size: data.size,
    			email: data.contact.email,
    			breeds: data.breeds.breed,

    		}

    		if(data.media.photos) {
    			obj.photo = data.media.photos.photo[0]
    			obj.photos = data.media.photos.photo
    		}
    		
    		return obj;
    	}
	});

	return petModel;

});