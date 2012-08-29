define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var petCollection = require('collections/petCollection');
    var PetItemView = require('views/petItemView');
    var petsTemplate = require('text!templates/petsTemplate.html');
    var petItemTemplate = require('text!templates/petItemTemplate.html')
	
	var petsView = Backbone.View.extend({
        el: $('#container'),

        initialize: function(){
        	
        	
        	var self = this;
            this.collection  = new petCollection();
           	this.collection.fetch({ 
        		data: {type: "pets"},
        		success: function () {
         			 
         			
         			

         		
         			self.render();
        		}
        	});
        	
            this.collection.on("reset", self.render, self);
           
        },
        
        render: function(){
        	var self = this;
        	
            $(this.el).html(petsTemplate);
       
            _.each(this.collection.models, function(item) {
                
                self.renderPet(item)
            
            }, this);
            self.$el.find('#filters').append(self.createFilter());
            

        },
        
        renderPet: function(item){
        	
        	var petItemView = new PetItemView({ model: item })
	        //console.log(item.attributes);
	      	//var tmpl = _.template(petItemTemplate);
	      	//$(this.el).append(tmpl(item.attributes));
	      	
	      	this.$el.append(petItemView.render().el)
        
        },
        getAnimals: function(){
        	//console.log('getting animals')
        	//console.log(this.collection.pluck('animal'))
        	
        	return _.uniq(this.collection.pluck('animal'), false, function(animal){
        	
        		//console.log(animal)
        		return animal.toLowerCase();
        	});
        
        },
        createFilter: function(){
        	var self = this;
        	var filterOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimals(), function(item){
        	
        		console.log(item);
        		var option = $("<button/>", {
        			value: item,
        			text: item
        		
        		}).appendTo(filterOptions)
     			console.log(option)
     			
        	});
        	
        	
        	console.log(filterOptions)
        	return filterOptions;
        }
    });

    return petsView;
});