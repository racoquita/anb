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
            unload: function(){
                var self = this;

                $(self.el).css({
                    '-webkit-transition':'all 1s ease-out',
                    'opacity':'0'
                });
            },

            load: function(){
                var self = this;

                requestTimeout(function(){
                    $(self.el).css({
                        '-webkit-transition':'all 1s ease-out',
                        'opacity':'1'
                    });
                }, 1000);
            }
        });

	masterView = new MasterView();

});

