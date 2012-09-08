define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

	var MasterView = Backbone.View.extend({
		el: $('#wrapper'),
		
		initialize: function(){
			var self = this;

			this.render();
		},

		render: function(){			
			Router.navigate('home');
		},

		events: {
			"click #nav_list li a" : "moveShadowNav",
			"click #nav_list li a:not(:eq(0))" : "closeMainWindow",
			"click #nav_list li a:eq(0)" : "openMainWindow",
		},

		closeMainWindow: function(){
			if($('#nav').hasClass('open')){
				$('#nav').removeClass('open');
				$('#welcome, #top_bar').stop().slideToggle(500);
			}
		},

		openMainWindow: function(){
			if(!$('#nav').hasClass('open')){
				$('#nav').addClass('open');
				$('#welcome, #top_bar').stop().slideToggle(500);
			}
		},

		moveShadowNav: function(e){
			var nav_items = $('#nav_list li'),
			clicked_item = $(e.target).closest('li'),
            index = nav_items.index(clicked_item),
        	diff = $('#nav_list').position().left + (index * 188);
        	
        	$('.radial_shadow').css({
                  '-moz-transform':'translateX('+ diff +'px)',
                  '-webkit-transform':'translateX('+ diff +'px)',
                  '-o-transform':'translateX('+ diff +'px)',
                  '-ms-transform':'translateX('+ diff +'px)',
                  'transform':'translateX('+ diff +'px)'
            });
		
		}
	});
	
	return MasterView;
});