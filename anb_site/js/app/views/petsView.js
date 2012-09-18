define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    
    var PetItemView = require('views/petItemView');
    var PetDetailView = require('views/petDetailView');
    var paginator = require('views/paginator');
    var petsTemplate = require('text!templates/petsTemplate.html');
    var petItemTemplate = require('text!templates/petItemTemplate.html');
    var petDetailTemplate = require('text!templates/petDetailTemplate.html');
	
	var petsView = Backbone.View.extend({
        id: 'pets_view',
    
        initialize: function(){
            var self = this;
            
            self.render();
            self.load();
            
            requestTimeout(function(){
                if(pfc.length != 0) {
                    self.renderPetList();
                } else {
                    $('#pet_results').append(helper.showSpinner());
                    pfc.on("petEvent", self.renderPetList, self);
                }
            }, 500);
            
            /*this.on("click:filterAnimal", self.filterByAnimal, self);  */
        },
        
        render: function(){
            var self = this;
            
            $(this.el).html(petsTemplate);
        },

        renderPetList: function(){
            $('.spinner').remove();
            $(this.el).find('#filters').append(this.createFilters());

            Router.navigate('pets/page/1', true); 
        },

        pagination: function(number){
            var num = parseInt(number), 
                pets = pfc.models, 
                len = pets.length, 
                petsHTML = '',
                startPos = (num - 1) * 16, 
                endPos = Math.min(startPos + 16, len);

            $('#pet_results').empty();

            for (var i = startPos; i < endPos; i++) {
                petsHTML += this.renderPet(pets[i]);
            }

            $('#pet_results').append(petsHTML);

            $(this.el).find('#pagination').html(new paginator({model: this.model, page: num}).render().el);

            return this;
        },

        renderPet: function(item){
            var petItemView = new PetItemView({ model: item }), singlePet = petItemView.render().el;
            return $(singlePet).html();
        },

        createFilters: function(){
            var self = this, filterOptions = $("<div/>");

            _.each(self.getAttributes(), function(item){
                _.each(item, function(attr){
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

       //renders petDetailsPage as a section of this (i'll explain why as a section)
        renderSection: function(section){

            var thispet = _.find(pfc.models, function(item){
                return item.id == section;
               
            });
            this.renderPetDetail(thispet);
            console.log(thispet)

        },
        renderPetDetail: function(item){
            
            var petDetailView = new PetDetailView({model : item}) 
            
            $(this.el).find('#results_container').html(petDetailView.render().el);

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

        events:{
            "click #filter_menu h4" : "toggleFilters",
        	"click #filters button" : "setAnimalFilter",
            "click .pet_container" : "loadPet"
        },

        loadPet: function(e){
            console.log(e);
            var petId = $(e.target).closest('.pet_container').attr('data-id');

            Router.navigate('pets/pet/'+ petId, true);
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