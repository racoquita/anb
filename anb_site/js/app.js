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

});

