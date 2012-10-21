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

	_.extend(Backbone.View.prototype, {
        load: function(){
        	var self = this;

			requestTimeout(function(){
				$(self.el).addClass('fadeInRightBig');
                $(self.el).append(helper.initFooter());
				$('#container').html(self.el);
			}, 250);
        },

        unload: function(){
        	var self = this;

        	$(this.el).addClass('fadeOutLeftBig');

        	requestTimeout(function(){
        		$(self.el).remove();
        	}, 500);
        }
    });

    masterView = new MasterView();
});

