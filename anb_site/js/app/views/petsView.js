define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    
    var PetItemView = require('views/petItemView');
    var petsTemplate = require('text!templates/petsTemplate.html');
    var petItemTemplate = require('text!templates/petItemTemplate.html');
    var petDetailTemplate = require('text!templates/petDetailTemplate.html');
    var PetDetailView = require('views/petDetailView');

    var petCollection = require('collections/petCollection');
    var paginator = require('views/paginator')

    pfc = new petCollection();
	
	var petsView = Backbone.View.extend({
        el: $('#container'),
        page: 1,

        initialize: function(){
            var self = this;

            this.available_filters = [];

            pfc.fetch({
                data: {type: "pets"},
                page: self.page,
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

            $(self.el).find('#filters').append(self.createFilters());
            $(self.el).append(new paginator({model: this.model, page: self.options.page}).render().el);

           
        },

        renderSection: function(section){
            console.log(section + ' render this section');

            var self = this;
            var thispet = _.find(pfc.models, function(item){
                return item.id == section;
               

            });
            self.renderPetDetail(thispet)
            //console.log(thispet)
            //console.log(thispet.attributes);
        },
        renderPetDetail: function(item){
            
            var petDetailView = new PetDetailView({model : item}) 
            $('#results_container').html(petDetailView.render().el);

        },

        renderSub: function(sub){
            console.log(sub)
            var p = sub ? parseInt(sub, 10) : 1;
            console.log(pfc.models);

            
        },

        renderPet: function(item){
        	var petItemView = new PetItemView({ model: item });
	      	
	      	$(this.el).find('#results_container').append(petItemView.render().el);
        },

        getAttributes: function(){
            var self = this, types = ['animal', 'sex', 'age', 'size'], attributes = {};

            _.each(types, function(type){
                var obj = _.uniq(pfc.pluck(type), false, function(attr){
                    return attr;
                });
                attributes[type] = obj;
            });

            return attributes;
        },

        createFilters: function(){
            var self = this, filterOptions = $("<div/>");

            _.each(self.getAttributes(), function(item){
                _.each(item, function(attr){

                    self.available_filters.push(attr);

                    var option = $("<button/>", {
                        id: attr.toLowerCase(),
                        value: attr.toLowerCase(),
                        text: attr,
                        class: 'selected'
                    }).appendTo(filterOptions)
                });
            });         

            return filterOptions;
        },

        events:{
            "click #filter_menu h4" : "toggleFilters",
        	"click #filters button" : "setAnimalFilter",
            "click article" : "loadPet"
        },

        loadPet: function(e){
            window.location.hash = '#pets/' + $(e.target).closest('.pet_container').attr('data-id');
        },

        toggleFilters: function(){
            $(this.el).find('#filters').toggleClass('open').slideToggle(250);
            $('#filters').hasClass('open') ? $('h4 span').text(',') : $('h4 span').text('+');
        },

        setAnimalFilter: function(e){
            var self = this, remove = e.target.value;

            $(e.target).toggleClass('selected');
        
            console.log(this.available_filters);

        	/*this.$el.find('button').removeClass('selected');
           	
           	this.$el.find(e.currentTarget).attr('class', "selected");
           	
        	this.filterAnimal = e.target;*/
        	/*window.location.hash = '#pets/' + this.filterAnimal.value;*/

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