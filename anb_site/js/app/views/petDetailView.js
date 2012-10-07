define( function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var petDetailTemplate = require('text!templates/petDetailTemplate.html');
    var fView = require('views/fosterView');

    direction = 'right';

    var PetDetailView = Backbone.View.extend({

        template: petDetailTemplate,
            
        initialize: function(options){
            if (this.collection.length == 0){
              this.collection = pfc;
            }

            this.render();
        },
          
        render: function(){
        	var tmpl = _.template(this.template), self = this;
        	$(this.el).html(tmpl(this.model.toJSON()));
            if(this.collection.indexOf(this.model) == 0){
                $(self.el).find('#prevPet').addClass('hidden');
            }
        	return this;
        },

        events: {
            'click .detail_adopt':'handleAdopt',
            'click .backToPets' : 'returnToPets',
            'click .thumbs img' : 'switchImg',
            'click #prevPet' : 'prevPet',
            'click #nextPet' : 'nextPet'
        },

        handleAdopt: function(e){
            var self = this, fosterView = new fView();

            e.preventDefault();
            Router.navigate('#foster', true);

            var pobj = {
                'name':this.model.attributes.name,
                'id':this.model.id,
                'photo':this.model.attributes.photo
            }
            fosterView.ifPet(pobj);
          },

        returnToPets: function(e){
            e.preventDefault();
            Router.navigate('#pets', true);
            pfc.trigger('click:all');
        },

        switchImg: function(e){
            e.preventDefault();
            $(this.el).find('img.active').removeClass('active');
            $(e.currentTarget).addClass('active');
            $(this.el).find('.pPhoto img').attr('src' , $(e.currentTarget).attr('src') );
        },

        nextPet: function(e){
            var self = this, ind = this.collection.indexOf(this.model) + 1;
            
            direction = 'right';
            e.preventDefault();

            this.model = this.collection.at(ind);
            Router.navigate('pets/pet/'+ this.model.id, true);
        },

        prevPet: function(e){
            direction = 'left';
            e.preventDefault();

            if(this.collection.indexOf(this.model) == 0){
                alert('index of model is 0 ')  
            }

            var self = this, ind = this.collection.indexOf(this.model) - 1 
            this.model = this.collection.at(ind);
            Router.navigate('pets/pet/'+ this.model.id, true);
        }
    });
    return PetDetailView;
})