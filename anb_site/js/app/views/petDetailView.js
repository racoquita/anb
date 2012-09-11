define( function (require) {

   var $ = require('jquery');
   var _ = require('underscore');
   var Backbone = require('backbone');
   var petDetailTemplate = require('text!templates/petDetailTemplate.html');
   
   var PetDetailView = Backbone.View.extend({

	    
	    

	    template: petDetailTemplate,
        
        initialize: function(){
        	this.render();
            
        },
	        
	    render: function(){
	        
	    	var tmpl = _.template(this.template);

	    	$(this.el).html(tmpl(this.model.toJSON()));
	    	
	    	return this;
	    }
   })

   return PetDetailView;
})