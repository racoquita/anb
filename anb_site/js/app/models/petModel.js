define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var petModel = Backbone.Model.extend({
	
		defaults: {
    		
    		photo: 'images/placeholder.png',
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
    		obj = {
    			age: data.age,
    			animal: data.animal,
    			id: data.id,
    			name: data.name,
    			sex: data.sex == 'M' ? 'Male' : 'Female',
    			size: data.size,
    			email: data.contact.email
    		}

    		if(data.media.photos) obj.photo = data.media.photos.photo[0]
    		
    		return obj;
    	}
	});

	return petModel;

});