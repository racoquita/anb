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
    		 _.each(this.models, function(pModel){
                    
                
                this.originalModels.add(pModel);
            })
        

    		
		},
		model: petModel,
        url: 'xhr/get_shelter.php',
    	parse: function(response){
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
		},
		filterData: function(params){
			console.log(params)
			var self = this;
			
            for(var key in params){
                var val = params[key];

                if(typeof val === "object"){

                    var union = [];
                    for(var k in val){

                        var subval = val[k];
                        
                        var matched = _.filter(this.models, function(item){
                            return item.get(key) == subval
                        });
                        union = union.concat(matched);
                    }
                    this.models = union;
                }else{

                    var results = _.filter(this.models, function(item){
                        return item.get(key) == val;
                    });
                    this.models = results;
                }
            }
            return this.models;
		},
		clearFilters: function(){
			console.log(this.originalModels)
			return this.originalModels

		}

	});
	
	return PetCollection;
    
});