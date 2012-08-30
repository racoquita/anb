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
            this.on("click:filterAnimal", self.filterAnimal, self)
           
        },
        
        render: function(){
        	var self = this;
        	
            $(this.el).html(petsTemplate);
       
            _.each(this.collection.models, function(item) {
                
                self.renderPet(item)
            
            }, this);
            self.$el.find('#filters').append(self.createFilter());
            self.$el.find('#filters').append(self.createAgeFilter());
            self.$el.find('#filters').append(self.createSexFilter());
            self.$el.find('#filters').append(self.createSizeFilter());

        },
        
        renderPet: function(item){
        	
        	var petItemView = new PetItemView({ model: item });
	      	
	      	this.$el.append(petItemView.render().el)
        
        },
        getAnimals: function(){
        
        	return _.uniq(this.collection.pluck('animal'), false, function(animal){
        	
        		return animal.toLowerCase();
        	});
        
        },
        getAnimalsAge: function(){
        
        	return _.uniq(this.collection.pluck('age'), false, function(age){
        	
        	
        		return age.toLowerCase();
        	});
        },
        getAnimalsSex: function(){
        
        	return _.uniq(this.collection.pluck('sex'), false, function(sex){
        	
        	
        		return sex.toLowerCase();
        	});
        },
        getAnimalsSize: function(){
        
        	return _.uniq(this.collection.pluck('size'), false, function(size){
        	
        	
        		return size.toLowerCase();
        	});
        },
        createAgeFilter: function(){
        	var self = this;
        	var filterAgeOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimalsAge(), function(item){
        	
        		
        		var option = $("<button/>", {
        			value: item.toLowerCase(),
        			text: item
        		
        		}).appendTo(filterAgeOptions)
     			
        	});        	

        	return filterAgeOptions;
        },
        createSexFilter: function(){
        	var self = this;
        	var filterSexOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimalsSex(), function(item){
        	
        		
        		var option = $("<button/>", {
        			value: item.toLowerCase(),
        			text: item
        		
        		}).appendTo(filterSexOptions)
     			
        	});        	

        	return filterSexOptions;
        },
        createSizeFilter: function(){
        	var self = this;
        	var filterSizeOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimalsSize(), function(item){
        	
        		
        		var option = $("<button/>", {
        			value: item.toLowerCase(),
        			text: item
        		
        		}).appendTo(filterSizeOptions)
     			
        	});        	

        	return filterSizeOptions;
        },
        createFilter: function(){
        	var self = this;
        	var filterOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimals(), function(item){
        	
        		//console.log(item);
        		var option = $("<button/>", {
        			value: item.toLowerCase(),
        			text: item
        		
        		}).appendTo(filterOptions)
     			
        	});        	

        	return filterOptions;
        },
        events:{
        
        	"click #filters button" : "setAnimalFilter"
        },
        setAnimalFilter: function(e){
        
        	
        
        	this.filterAnimal = e.target;
        	window.location.hash = '#pets/' + this.filterAnimal.value;
        	
        	//this.trigger("click:filterAnimal")
        	//console.log(this.filterAnimal.value)
        },
        filterByAnimal: function(){
        
        	//console.log(this.filterAnimal);
        	var petsRouter = new PetRouter();
        	petsRouter.navigate("/filter/"+filterAnimal)
        
        }
        
    });

    return petsView;
});