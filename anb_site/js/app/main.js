define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	
	var MasterView = Backbone.View.extend({
		el: $('body'),
		
		initialize: function(){		
			this.render();
		},

		render: function(){
			window.location.hash = "#home";
		},
		events: {
			
			"click #nav_list li a" : "moveShadowNav",
			"click #nav_list li a:not(:eq(0))" : "toggleGraphic"

		},
		moveShadowNav: function(e){
		
			var nav_items = $('#nav_list li'),
			clicked_item = $(e.target).closest('li'),
            index = nav_items.index(clicked_item) - 2,
        	diff = $('#nav_list').position().left + (index * 140);
        	
        	$('.radial_shadow').css({
                  '-moz-transform':'translateX('+ diff +'px)',
                  '-webkit-transform':'translateX('+ diff +'px)',
                  '-o-transform':'translateX('+ diff +'px)',
                  '-ms-transform':'translateX('+ diff +'px)',
                  'transform':'translateX('+ diff +'px)'
            });
		
		},
		toggleGraphic: function(){
			$('#welcome, #top_bar').slideToggle(500);
		
		}
	});
	
	return MasterView;
   
});