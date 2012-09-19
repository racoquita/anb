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
            this.clonedCollection = new Backbone.Collection;

            //this is just to let us know when the collection is beign cloned
            self.clonedCollection.on("add", function(pModel) {
                    console.log("adding " + pModel.get("name") + "to the cloned collection"); 
            });
            
            requestTimeout(function(){
                if(pfc.length != 0) {
                    self.renderPetList();
                    //self.pfc_clone = _.clone(pfc); <-------- Old Clone
                   
                 } 
                 else {
                     $('#pet_results').append(helper.showSpinner());
                     pfc.on("petEvent", self.renderPetList, self);
                     //self.pfc_clone = _.clone(pfc);  <----- this is the old clone
                 }
            }, 500);
            
            //this.on("click:filterAnimal", self.filterByAnimal, self);  
        },
        
        render: function(){
            var self = this;

            $(this.el).html(petsTemplate);
        },

        renderPetList: function(){
            var self = this;
            //Here I looped thru the models of the original pfc and added them to the cloned Collection
            _.each(pfc.models, function(pModel){
                        
                self.clonedCollection.add(pModel);
            })

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
            var petItemView = new PetItemView({ model: item }), 
                singlePet = petItemView.render().el;
            
            return $(singlePet).html();
        },

        createFilters: function(){
            var self = this, 
                filterOptions = $("<div/>");
            
            self.available_filters = []
            
            _.each(self.getAttributes(), function(item){
                
                arg = arguments[1]
                _.each(item, function(attr){

                    self.available_filters.push(attr.toLowerCase())

                    var option = $("<button/>", {
                        id: attr.toLowerCase(),
                        value: attr.toLowerCase(),
                        text: attr,
                        class: 'selected ' + arg 

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

        },
        renderPetDetail: function(item){
            
            var petDetailView = new PetDetailView({model : item}) 
            
            $(this.el).find('#results_container').html(petDetailView.render().el);

        },

        getAttributes: function(){
            var self = this, 
                types = ['animal', 'sex', 'age', 'size'], 
                attributes = {};

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
            "click #filters button" : "setFilter",
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

        animalFilter: function(animalSelected){
            var self = this
            
            var filtered = _.filter(pfc.models, function(item){
                return item.get('animal').toLowerCase() != animalSelected;
            });

            pfc.reset(filtered, {silent: true});

            self.pagination(1);

            requestTimeout(function(){
                //pfc = self.pfc_clone; <------  Instead I used "reset" and passed cloned collection models (below)
                pfc.reset(self.clonedCollection.models);
                self.pagination(1);
            }, 3000);
        },
        ageFilter: function(ageSelected){
            var self = this;

            var filtered = _.filter(pfc.models, function(item){
                
                return item.get('age').toLowerCase() != ageSelected;
            });

            pfc.reset(filtered, {silent: true});
            self.pagination(1);
        },
        sexFilter: function(sexSelected){
            var self = this;

            var filtered = _.filter(pfc.models, function(item){
                
                return item.get('sex').toLowerCase() != sexSelected;
            });

            pfc.reset(filtered, {silent: true});
            self.pagination(1);
        },
        sizeFilter: function(sizeSelected){
            var self = this;

            var filtered = _.filter(pfc.models, function(item){
                
                return item.get('size').toLowerCase() != sizeSelected;
            });

            pfc.reset(filtered, {silent: true});
            self.pagination(1);
        },

        setFilter: function(e){
            var self = this, 
                remove = e.target.value;
                //indexOfRemove = self.available_filters.indexOf(remove);
                //console.log(indexOfRemove);
                //console.log(self.available_filters.splice(indexOfRemove, 1))   
                
            $(e.target).toggleClass('selected');
            filter = $(e.target).attr('class');
            
            switch(filter){
                case 'animal':
                    this.animalFilter(e.target.value);
                break;
                case 'age':
                    this.ageFilter(e.target.value);
                break;
                case 'sex':
                    this.sexFilter(e.target.value);
                break;
                case 'size':
                    this.sizeFilter(e.target.value);
                break;
            }
            //this.filterByAnimal(e.currentTarget.value);
            //this.$el.find('button').removeClass('selected');
           	//this.$el.find(e.currentTarget).attr('class', "selected");
            //this.trigger('click:filterAnimal')
        }
    });

    return petsView;
});