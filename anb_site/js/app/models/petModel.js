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
			email: "",
            contact: {},
            options: {}
    	},
        
    	parse: function(data){

            var new_desc, update = data.lastUpdate.$t.replace(/T.*$/,''), update = update.split('-');
            var a = moment([2012, 9, 27]), b = moment([update[0], update[1], update[2]]), test = b.diff(a);

            test < 0 ? 
                new_desc = $(data.description.$t.substr(0, data.description.$t.lastIndexOf('<center>'))).text() + helper.getDonate() : 
                new_desc = data.description.$t;

    		obj = {
    			age: data.age.$t,
    			animal: data.animal.$t,
                description : new_desc.$t,
    			id: data.id.$t,
    			name: data.name.$t,
    			sex: data.sex.$t == 'M' ? 'Male' : 'Female',
    			size: data.size.$t,
    			email: data.contact.email.$t,
    			breeds: data.breeds.breed.$t,
                mix: data.mix.$t,
                contact: data.contact.$t,
                options: data.options.$t
    		}

    		if(data.media.photos) {
    			obj.photo = data.media.photos.photo[0].$t;
                obj.photos = this.uniquePhotosX(obj.photo, data.media.photos.$t);
    		}
    		
    		return obj;
    	},

        uniquePhotosX: function(mainPhoto, mediaObj){
            var self= this;
            var photosXArr = [];
            var htmlString = ''
            _.each(mediaObj, function(photoObj){
                _.each(photoObj, function(photo){
                    var photoString = photo.$t.substr(0, photo.$t.lastIndexOf('-'));
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