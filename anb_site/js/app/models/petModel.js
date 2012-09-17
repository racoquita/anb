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
			breeds: [],
			email: "",
            contact: {},
            options: {}

    	},
    	parse: function(data){
    	console.log(data);



    		obj = {
    			age: data.age,
    			animal: data.animal,
                description : data.description,
    			id: data.id,
    			name: data.name,
    			sex: data.sex == 'M' ? 'Male' : 'Female',
    			size: data.size,
    			email: data.contact.email,
    			breeds: data.breeds.breed,
                mix: data.mix,
                contact: data.contact,
                options: data.options

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