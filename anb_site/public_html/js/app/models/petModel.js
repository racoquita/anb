define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
    var Moment = require('moment.min');

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
			email: "sbigthumbs@aol.com",
            contact: {},
            options: {},
            phone: ''
    	},
        
    	parse: function(data){
            var new_desc, update = data.lastUpdate.replace(/T.*$/,''), update = update.split('-');
            var a = moment([2012, 9, 27]), b = moment([update[0], update[1], update[2]]), test = b.diff(a);

            test < 0 ? 
                new_desc = $(data.description.substr(0, data.description.lastIndexOf('<center>'))).text() + helper.getDonate() : 
                new_desc = data.description;

            if(data.size == 'L') {
                data.size = "Large";
            } else if(data.size == 'M') {
                data.size = "Medium";
            } else {
                data.size = "Small"
            }

    		obj = {
    			age: data.age,
    			animal: data.animal,
                description : new_desc,
    			id: data.id,
    			name: data.name,
    			sex: data.sex == 'M' ? 'Male' : 'Female',
    			size: data.size,
    			breeds: data.breeds.breed,
                mix: data.mix,
                contact: data.contact,
                options: data.options
    		};

            if(typeof data.contact.email === 'string') obj.email = data.contact.email;
            if(typeof data.contact.phone === 'string') obj.phone = data.contact.phone;

    		if(data.media.photos) {
    			obj.photo = data.media.photos.photo[0];
                obj.photos = this.uniquePhotosX(obj.photo, data.media.photos);
    		}
    		
    		return obj;
    	},

        uniquePhotosX: function(mainPhoto, mediaObj){
            var self= this;
            var photosXArr = [];
            var htmlString = ''
            _.each(mediaObj, function(photoObj){
                _.each(photoObj, function(photo){

                    var photoString = photo.substr(0, photo.lastIndexOf('-'));
                    photosXArr.push(photoString)
                })
            })
            
            _.each($.unique(photosXArr), function(photoSt){
                var photoThumb = photoSt+'-x.jpg';
                
                if(photoThumb === mainPhoto){
                    htmlString += '<li><img class="active" width="100" src="'+photoThumb+'" /></li>'
                }else{

                    htmlString += '<li><img width="100" src="'+photoThumb+'" /></li>'
                }
                
            })
            return htmlString;
        }

	});

	return petModel;

});