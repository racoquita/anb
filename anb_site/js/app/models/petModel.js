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
    			//obj.photos = data.media.photos.photo
                obj.photos = this.uniquePhotosX(data.media.photos)

    		}
    		
    		return obj;
    	},
        uniquePhotosX: function(obj){
            var photosXArr = [];
            var htmlString = ''
            _.each(obj, function(photoObj){
                //console.log($.unique(photoObj))
                _.each(photoObj, function(photo){

                    var photoString = photo.substr(0, photo.lastIndexOf('-'));
                    photosXArr.push(photoString)
                })
            })
            
            _.each($.unique(photosXArr), function(photoSt){
                htmlString += '<li><img width="100" src="'+photoSt+'-x.jpg" /></li>'
            })
            return htmlString;
        }

	});

	return petModel;

});