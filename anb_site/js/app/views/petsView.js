define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var petCollection = require('collections/petCollection');
    var petItemView = require('views/petItemView');
    var petsTemplate = require('text!templates/petsTemplate.html');
	
	var petsView = Backbone.View.extend({
        el: $('#test'),

        initialize: function(){
        	
        	
        	var self = this;
            this.collection  = new petCollection();
            this.collection.fetch({data:{ type: "pets" }, success: function(){
            	
            	alert("successfully fetched data")
            	//self.$el.find('#filter').append(self.createSelect());
            	
            	self.render();            
            }});
            
            this.collection.on("reset", self.render, self);
           
        },

        render: function(){
        
            $(this.el).html(petsTemplate);
            var that = this
           	//console.log(this.collection.models);
            _.each(this.collection.models, function (item) {
              
              //	console.log(item)
                that.renderPet(item)
                
            }, this);
        },
        renderPet: function(item){
	      
	      petItemView = new petItemView({
	        	model: item
	        
	      })
	        
        	this.$el.append(petItemView.render().el);
        
        }

    });

    return petsView;
});