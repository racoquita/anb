define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var helper_model = require('models/helperModel');
    var petCollection = require('collections/petCollection');

    pfc = new petCollection();

	var MasterView = Backbone.View.extend({
		el: $('#wrapper'),
		
		initialize: function(){
            var self = this;

            this.render();

            helper = new helper_model();

            pfc.fetch({
                data: {type: "pets"},
                success: function (response) {
                    pfc = response;
                    pfc.trigger("petEvent");
                }
            });
		},

		render: function(){
			Router.navigate('home', true);
		},

		events: {
			"click #nav_list li a" : "moveShadowNav",
			"click #adopt_btn": "goToPetsView"
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
		
		},

		goToPetsView: function  () {
			window.location.hash = "pets";
		}
	});

	window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                function(callback, element){
                    window.setTimeout(callback, 500 / 60);
                };
    })();

    window.requestTimeout = function(fn, delay) {
        if( !window.requestAnimationFrame       && 
            !window.webkitRequestAnimationFrame)
                return window.setTimeout(fn, delay);

        var start = new Date().getTime(),
            handle = new Object();

        function loop(){
            var current = new Date().getTime(),
                delta = current - start;

            delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
        };

        handle.value = requestAnimFrame(loop);
        return handle;
    };
	
	return MasterView;
});