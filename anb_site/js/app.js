requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        templates: '../../templates',
        views: '../app/views',
        collections: '../app/collections',
        models: '../app/models'
    }
});

requirejs(['app/main', '../router', 'backbone'], function(MasterView, Router, Backbone){

	masterView = new MasterView();

	_.extend(Backbone.View.prototype, {
	        load: function(){
	        	var self = this;

	        	$(self.el).css({'display':'none'});
	        	$(self.el).fadeIn(500);
	        },

	        unload: function(){
	        	setTimeout(function(){
	        		$(self.el).fadeOut(500);
	        	}, 500);
	        	
	        }

    	});

});

