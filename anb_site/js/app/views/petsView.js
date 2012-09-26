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
                    //console.log("adding " + pModel.get("name") + "to the cloned collection"); 
            });
           
            requestTimeout(function(){
                if(pfc.length != 0) {
                    self.renderPetList();
                   
                 } 
                 else {
                     $('#pet_results').append(helper.showSpinner());
                     pfc.on("petEvent", self.renderPetList, self);
                 }
            }, 500);
            
            //this.on("click:filterAnimal", self.filterByAnimal, self);  
            this.on("selectEvent", self.onSelectFilter, self)
            this.on("unselectEvent", self.onDeSelectFilter, self)
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
            
            self.available_filters = [];
            
            _.each(self.getAttributes(), function(item){
                
                arg = arguments[1]
                _.each(item, function(attr){

                    self.available_filters.push(attr.toLowerCase())

                    var option = $("<button/>", {
                        id: attr.toLowerCase(),
                        value: attr,
                        text: attr,
                        class: 'selected',
                        className: arg 

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
        getCheckedAttributes: function(){
             //console.log(this.available_filters);
        
             var checkedAttributes = {},
                 types = ['animal', 'sex', 'age', 'size']; 

            _.each(types,  function(type) { 
                    
                var temp = {}
                $('button[classname="'+type+'"].selected').each(function(i){

                    temp[i] = $(this).attr('value');
                    return temp
                    
                }) 
                checkedAttributes[type] = temp
            });
            return checkedAttributes;
        },

        events:{
            "click #filter_menu h4" : "toggleFilters",
            "click #filters button" : "setFilter",
            "click .pet_container" : "loadPet",
        },

        loadPet: function(e){
            pfc.reset(this.clonedCollection.models);
            var petId = $(e.target).closest('.pet_container').attr('data-id');

            Router.navigate('pets/pet/'+ petId, true);
        },

        toggleFilters: function(){
            $(this.el).find('#filters').toggleClass('open').slideToggle(250);
            $('#filters').hasClass('open') ? $('h4 span').text(',') : $('h4 span').text('+');
        },
        animalFilter: function(animalSelected){
           
            this.removeSelectedFilter('animal', animalSelected);

            // requestTimeout(function(){
                
            //     pfc.reset(self.clonedCollection.models);
            //     self.pagination(1);
            // }, 3000);
        },
        ageFilter: function(ageSelected){
           
            this.removeSelectedFilter('age', ageSelected)
        },
        addAnimalFilter: function(animalSelected){

            this.addSelectedFilter('animal', animalSelected )
        },
        addSexFilter: function(sexSelected){

            this.addSelectedFilter('sex', sexSelected )
        },
        addAgeFilter: function(ageSelected){

            this.addSelectedFilter('age', ageSelected )
        },
        addSizeFilter: function(sizeSelected){

            this.addSelectedFilter('size', sizeSelected )
        },
        addSelectedFilter: function(filter, selectedValue){

            var self = this;

             var filtered = _.filter(self.clonedCollection.models, function(item){

                return item.get(filter) == selectedValue;
               
            });
            _.each(filtered, function(fModel){
                
                pfc.add(fModel);
            })   
            
            pfc.reset(pfc.models);
            
            self.pagination(1);

        },
        sexFilter: function(sexSelected){
            var self = this;

            this.removeSelectedFilter('sex', sexSelected)
        },
        sizeFilter: function(sizeSelected){
            
            this.removeSelectedFilter('size', sizeSelected);

        },
        removeSelectedFilter: function(filter, unselectedValue){

            var self = this;
            
            var filtered = _.filter(pfc.models, function(item){
                
                return item.get(filter) != unselectedValue;
            });

            pfc.reset(filtered, {silent: true});
            
            self.pagination(1);

        },
        unfilterData: function(params){
            console.log(params)
            var self = this;
            pfc.reset(self.clonedCollection.models)
           
            for(var key in params){
                var val = params[key];

                if(typeof val === "object"){

                    var union = [];
                    for(var k in val){

                        var subval = val[k];
                        
                        var matched = _.filter(pfc.models, function(item){
                            return item.get(key) == subval
                        });
                        union = union.concat(matched);
                        console.log(union)
                    }
                    pfc.models = union;
                }else{

                    var results = _.filter(pfc.models, function(item){
                        return item.get(key) == val;
                    });
                    pfc.models = results;
                }
            }
            return pfc.models;

        },
        onSelectFilter: function(e){
            pfc.clearFilters();
            console.log(e, 'onSelect');
            var self = this;
            var checkedAttributes = this.getCheckedAttributes();
            
            self.unfilterData(checkedAttributes);
            this.pagination(1);
 

        },
        onDeSelectFilter: function(e){
            
            pfc.clearFilters();
            var checkedAttributes = this.getCheckedAttributes();
           
           
            pfc.reset(pfc.filterData(checkedAttributes), {silent: true});
            this.pagination(1)
        },

        setFilter: function(e){
            $(e.target).toggleClass('selected');

            var self = this,
                remove = e.target.value,
                filter = $(e.target).attr('classname'),
                params = this.getAttributes(),
                indexOfRemove = params[filter].indexOf(remove);
            
            if($(e.target).attr('class') === "selected") {
                console.log('filter checked');
                params[filter].push(remove );
                this.trigger('selectEvent',  params )
                
            }
            else{
                console.log('filter unchecked')
                params[filter].splice(indexOfRemove, 1 )
                this.trigger('unselectEvent', params )

            }              
            
            //params = {animal: 'Cat', age: 'Adult', sex: ['Female', 'Male'] }
            //console.log(pfc.filterData(params))
            // indexOfRemove = params[filter].indexOf(remove);
            // console.log(indexOfRemove)
            
            // if(indexOfRemove !== -1){
            //     alert('removing')
                
            //     params[filter].splice(indexOfRemove, 1 )
                
            //     pfc.filterData(params);
                
            //     //pfc.reset(self.filterData(params))
            //     self.pagination(1)
            // }
            // else{
            //     pfc.clearFilters();
            //     alert('adding')
                
                
            //     params[filter].push(remove);
                
            //     //this.addAnimalFilter(e.target.value)
            //     //this.addSexFilter(e.target.value)
            //     //newParams = self.unfilterData(params)
            //     //pfc.reset(newParams)
            //     pfc.filterData(params);
            //     self.pagination(1)

            // }
            
            //console.log(params[filter], remove)
            //params[filter].splice(params[filter].indexOf(remove), 1 )
            
            //console.log(params[filter] )

            //pfc.filterData(params);

                    

        }
    });

    return petsView;
});