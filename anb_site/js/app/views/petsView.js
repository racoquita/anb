define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    
    var PetItemView = require('views/petItemView');
    var petsTemplate = require('text!templates/petsTemplate.html');
    var petItemTemplate = require('text!templates/petItemTemplate.html');
    var petCollection = require('collections/petCollection');

    pfc = new petCollection();
	
	var petsView = Backbone.View.extend({
        el: $('#container'),

        initialize: function(){
            var self = this;

            pfc.fetch({
                data: {type: "pets"},
                success: function (response) {
                    self.render();
                    self.load();
                    pfc = response;
                }
            });

            $(pfc).on("reset", self.render, self);

            /*this.on("click:filterAnimal", self.filterByAnimal, self);  */
        },
        
        render: function(){
        	var self = this;
        
            $(this.el).html(petsTemplate);

       		this.$el.find(".pet-container").remove(); 
            
            _.each(pfc.models, function(item) {
                self.renderPet(item)
            }, this);
            
            self.$el.find('#filters').append(self.createFilter());
            self.$el.find('#filters').append(self.createAgeFilter());
            self.$el.find('#filters').append(self.createSexFilter());
            self.$el.find('#filters').append(self.createSizeFilter());

        },  
        renderPet: function(item){
        	
        	 
        	
        	var petItemView = new PetItemView({ model: item });
	      	
	      	$(this.el).find('#results_container').append(petItemView.render().el)
        
        },
        getAnimals: function(){
        
        	return _.uniq(pfc.pluck('animal'), false, function(animal){
        	
        		return animal.toLowerCase();
        	});
        
        },
        getAnimalsAge: function(){
        
        	return _.uniq(pfc.pluck('age'), false, function(age){
       
        		return age.toLowerCase();
        	});
        },
        getAnimalsSex: function(){
        
        	return _.uniq(pfc.pluck('sex'), false, function(sex){

        		return sex.toLowerCase();
        	});
        },
        getAnimalsSize: function(){
        
        	return _.uniq(pfc.pluck('size'), false, function(size){
        	
        	
        		return size.toLowerCase();
        	});
        },
        createAgeFilter: function(){
        	
        	var self = this;
        	var filterAgeOptions = $("<div/>", {
        	
        		html: '<button type="button" class="selected age" value="all">All</button>'
        	
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
        	
        		html: '<button type="button" class="selected sex" value="all">All</button>'
        	
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
        	
        		html: '<button type="button" class="selected size" value="all">All</button>'
        	
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
        	
        		html: '<button type="button" class="selected animal" value="all">All</button>'
        	
        	});
        	
        	_.each(self.getAnimals(), function(item){
        	
        		//console.log(item);
        		var option = $("<button/>", {
        			value: item.toLowerCase(),
        			text: item,
        			class: 'animal'
        		
        		}).appendTo(filterOptions)
     			
        	});        	

        	return filterOptions;
        },

        events:{
        	"click #filters button" : "setAnimalFilter",
            "click #filter_menu h4" : "toggleFilters"
        },

        toggleFilters: function(){
            $(this.el).find('#filters').toggleClass('open').slideToggle(250);
            $('#filters').hasClass('open') ? $('h4 span').text(',') : $('h4 span').text('+');
        },

        setAnimalFilter: function(e){
        	
        	//console.log(e.target)
        	
/*
        	switch(e.target.value){
        		case 'dog':
        			console.log('filtering Animal')
        		break;
        		
        		case 'young' || 'adult':
        			this.filterAge();
        		
        		break;

        	}
*/
			//console.log(e.currentTarget.value + "value of animal filter");

        	this.$el.find('button').removeClass('selected');
           	
           	this.$el.find(e.currentTarget).attr('class', "selected");
           	
        	this.filterAnimal = e.target;
        	
        	window.location.hash = '#pets/' + this.filterAnimal.value;

        },

        filterByAnimal: function(){
        	
        	var self = this;
        	
        	if(self.filterAnimal !== "all"){
        	
        		pfc.reset(pfc.models, {silent: true});
        		
        		var filterAnimal = self.filterAnimal,
        			filtered = _.filter(pfc.models, function(item){
        				
        				return item.get("age").toLowerCase() === filterAnimal
        				
        			});
        		console.log(filterAnimal)
        		
        		pfc.reset(filtered)
        	}
        }
        
    });

    return petsView;
});