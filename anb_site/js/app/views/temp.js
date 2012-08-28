define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var petCollection = require('collections/petCollection');
    var petItemView = require('views/petItemView');
	
	var DirectoryView = Backbone.View.extend({
	
		el: $("#container"),
        
        initialize: function () {
            
            var self= this;
            
            this.collection = new petCollection();
            
            this.collection.fetch({data:{ type: "pets" }, success: function(){
            	
            	self.$el.find('#filter').append(self.createSelect());
            	
            	self.render();            
            }});
       
            this.on("click:filterAnimal", this.filterByAnimal, this);
            
            this.collection.on("reset", self.render, self);
            
        },
        render: function () {        	

			this.$el.find("article").remove();    

            _.each(this.collection.models, function (item) {
                
                console.log(item);
                this.renderPet(item)
                
            }, this);
            
        },
        renderPet: function (item) {
        
            var petView = new pet_view({
                model: item
            });
            
            this.$el.append(petView.render().el);
        },
        getAnimals: function(){
        	
        	return _.uniq(this.collection.pluck('animal'), false, function(animal){
        		
        		return animal.toLowerCase();
        		
        	});
        },
        getAge: function(){
        	
        	return _.uniq(this.collection.pluck('age'), false, function(age){
        		
        		return age.toLowerCase();
        		
        	});
        },
        createSelect: function(){
        
        	var select = $("<div/>", {
        	
        			html: '<button type="button" class="selected" value="all">All</button>'
        		
        	});
        	
        	_.each(this.getAnimals(), function(item){
        		
        		
        		var option = $('<button />', {
        			
        			value: item.toLowerCase(),
        			text: item
        			
        		}).appendTo(select);
        	});
        	
        	return select;
        },
        events:{
        
        	"click #filter button" : "setAnimalFilter"
        
        },
        setAnimalFilter: function(e){
            
           
           	this.$el.find('button').removeClass('selected');
           	
           	this.$el.find(e.currentTarget).attr('class', "selected");
                    
            this.filterAnimal = e.currentTarget.value;
            
        	this.trigger("click:filterAnimal");
        
        },
        filterByAnimal: function(){
                
        	if(this.filterAnimal === "all"){
        		
        		//console.log(this.filterAnimal);
        	
        		/* this.collection.reset(); */
        		
        		/*petsRouter.navigate("filter/all");*/
        		
        	} else {
        		
        		this.collection.reset(this.collection.models, {silent: true});
        		
        		var filterAnimal = this.filterAnimal,
        			
        			filtered = _.filter(this.collection.models, function(item){
        			
        			return item.get("animal").toLowerCase() === filterAnimal;
        			
        		});
        		
        		this.collection.reset(filtered);
        		
        		/*petsRouter.navigate("filter/"+filterAnimal);*/
        	}
        }

	
	});
	
	return DirectoryView
	
});