define(function (require) {
  
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var petModel = require('models/petModel');
  
	var PetCollection = Backbone.Collection.extend({
		initialize: function(){
			typeof(options) != 'undefined' || (options = {});
    		this.page = 1;
    		typeof(this.perPage) != 'undefined' || (this.perPage = 16);
		},
		model: petModel,
        url: 'xhr/get_shelter.php',
    	parse: function(response){
    		//this.page = response.page;
    		//this.perPage = response.perPage;
    		this.total = response.pets.pet.length;
    		return response.pets.pet;

    	},
    	pageInfo: function(pageNum){
    		var info = {
    			total: this.total,
    			page: pageNum ? pageNum : this.page,
    			perPage: this.perPage,
    			pages: Math.ceil(this.total / this.perPage),
    			prev: false,
    			next: false

    		};
    		
    		var max = Math.min(this.total, this.page * this.perPage);

		    if (this.total == this.pages * this.perPage) {
		      max = this.total;
		    }

		    info.range = [(this.page - 1) * this.perPage + 1, max];

		    if (this.page > 1) {
		      info.prev = this.page - 1;
		    }

		    if (this.page < info.pages) {
		      info.next = this.page + 1;
		    }

		    return info;

    	},
    	 nextPage: function() {
		    if (!this.pageInfo().next) {
		      return false;
		    }
		    this.page = this.page + 1;
		    return this.fetch();
		},
		previousPage: function() {
		  if (!this.pageInfo().prev) {
		      return false;
		  }
		  this.page = this.page - 1;
		    return this.fetch();
		}

	});
	
	return PetCollection;
    
});