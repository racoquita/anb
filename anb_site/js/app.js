// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
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

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main', '../router', 'backbone'], function(MasterView, Router, Backbone){


	masterView = new MasterView();	
	Router.initialize({masterView: masterView});




});

