define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var directory = require('../app/collections/petDirectory')
    
    
    
	var petDirectoryView = require('../app/views/petDirectoryView')
	var petView = require('../app/views/petView')
	
	var MasterView = Backbone.View.extend({
		el: $('#container'),
		
		initialize: function(){
		
			this.render();
		},
		render: function(){
		
			window.location.has = 'bob';
			
		}
	
	
	
	});
	
	return MasterView

  	
   
   
});