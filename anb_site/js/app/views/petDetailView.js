define( function (require) {

   var $ = require('jquery');
   var _ = require('underscore');
   var Backbone = require('backbone');
   var petDetailTemplate = require('text!templates/petDetailTemplate.html');
   var fView = require('views/fosterView');
   
   var PetDetailView = Backbone.View.extend({

	    template: petDetailTemplate,
        
      initialize: function(options){
      	this.render();

      },  
	    render: function(){
	    	var tmpl = _.template(this.template);

	    	$(this.el).html(tmpl(this.model.toJSON()));
	    	
	    	return this;
	    },

      events: {
          'click .detail_adopt':'handleAdopt',
          'click .backToPets' : 'returnToPets'
      },

      handleAdopt: function(e){
          var self = this;

          e.preventDefault();

          var fosterView = new fView();
          
          Router.navigate('#foster', true);
          
          var pobj = {
              'name':this.model.attributes.name,
              'id':this.model.id,
              'photo':this.model.attributes.photo
          }

          fosterView.ifPet(pobj);

      },
      returnToPets: function(e){
        e.preventDefault()
        Router.navigate('#pets', true)
        pfc.trigger('click:all')

      }
    });
    return PetDetailView;
})