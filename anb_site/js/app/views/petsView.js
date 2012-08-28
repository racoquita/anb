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
    var petItemTemplate = require('text!templates/petItemTemplate.html')
	
	var petsView = Backbone.View.extend({
        el: $('#body'),

        initialize: function(){
        	
        	
        	var self = this;
            this.collection  = new petCollection();
           	this.collection.fetch({ 
        		data: {type: "pets"},
        		success: function () {
         			 self.render();
        		}
        	});
        	
            this.collection.on("reset", self.render, self);
           
        },
        
        render: function(){
        	var self = this;
        	
            $(this.el).html(petsTemplate);
       
            _.each(this.collection.models, function(item) {
                
                self.renderPet(item)
            
            }, this);
        },
        
        renderPet: function(item){
        
        	//console.log(item);
        	
	      	var tmpl = _.template(petItemTemplate);
	      
	      	$(this.el).append(tmpl(item.attributes));
        
        }

    });

    return petsView;
});