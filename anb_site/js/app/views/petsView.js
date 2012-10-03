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
           
            requestTimeout(function(){
                if(pfc.length != 0) {
                    self.renderPetList();
                } 
                else {
                    $('#pet_results').append(helper.showSpinner());
                    pfc.on("petEvent", self.renderPetList, self);
                }
            }, 500);
            
            this.on("selectEvent", self.onSelectFilter, self)
        },
        
        render: function(){
            $(this.el).html(petsTemplate);
        },

        renderPetList: function(){
            var self = this;

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
            
            _.each(self.getAttributes(), function(item){
                
                arg = arguments[1]
                _.each(item, function(attr){
                    console.log(attr);

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
            var petDetailView = new PetDetailView({model:item}), self = this;

            $(this.el).find('#inner_container').addClass('fadeOutLeft');

            requestTimeout(function(){
                $(self.el).find('#inner_container').html(petDetailView.render().el);
                $('#inner_container').removeClass('fadeOutLeft').addClass('fadeInRight');
            }, 500);
            
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

             var checkedAttributes = {},
                 types = ['animal', 'sex', 'age', 'size']; 

            _.each(types,  function(type) { 
                    
                var temp = {};

                $('button[classname="'+type+'"].selected').each(function(i){

                    temp[i] = $(this).attr('value');
                    return temp;
                    
                }); 
                checkedAttributes[type] = temp;
            });
            return checkedAttributes;
        },

        events:{
            "click #filter_menu h4" : "toggleFilters",
            "click #filters button" : "setFilter",
            "click .pet_container" : "loadPet",
            "mouseenter .pet_container" : "enterPet",
            "mouseleave .pet_container" : "leavePet"
        },

        loadPet: function(e){
            pfc.reset(this.clonedCollection.models);
            var petId = $(e.target).closest('.pet_container').attr('data-id');
            Router.navigate('pets/pet/'+ petId, true);
        },

        enterPet: function(e){
            $(e.target).closest('.pet_container').addClass('pulse');
        },

        leavePet: function(e){
            $(e.target).closest('.pet_container').removeClass('pulse');
        },

        toggleFilters: function(){
            $(this.el).find('#filters').toggleClass('open').slideToggle(250);
            $('#filters').hasClass('open') ? $('h4 span').text(',') : $('h4 span').text('+');
        },

        filterData: function(params){
            //console.log(params)
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
                    }
                    pfc.models = union;
                }
                else{

                    var results = _.filter(pfc.models, function(item){
                        return item.get(key) == val;
                    });
                    
                    pfc.models = results;
                }
            }
            return pfc.models;
        },
        
        onSelectFilter: function(e){
           
            var checkedAttributes = this.getCheckedAttributes();
            this.filterData(checkedAttributes);
            this.pagination(1);

        },

        setFilter: function(e){
            
            $(e.target).toggleClass('selected');

            var self = this,
                filterSelected = e.target.value,
                filter = $(e.target).attr('classname'),
                params = this.getAttributes(),
                indexOfRemove = params[filter].indexOf(filterSelected);
            
            if($(e.target).attr('class') === "selected") {
                //filter selected 
                params[filter].push(filterSelected );
                this.trigger('selectEvent',  params );
                
            }
            else{
                //filter unselected
                params[filter].splice(indexOfRemove, 1 );
                this.trigger('selectEvent', params );

            }             
        }
    });

    return petsView;
});