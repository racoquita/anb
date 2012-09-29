define(function (require){

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

    var footer = require('text!templates/footerTemplate.html');

	var helperModel = Backbone.Model.extend({
	
        initFooter: function(){
            return footer;
        },

        initNav: function(){
        	$('#nav_list a').on('click', function(e){
        		e.preventDefault();
        		
        		//This is to prevent reloading a page the user is already on
        		if($(e.target).attr('href') == '#pets' && window.location.hash == "#pets/page/1") {
        			e.preventDefault();
        		} else {
        			Router.navigate($(e.target).closest('a').attr('href'), true);
        		}

        	})
        },

        showSpinner: function(){
        	return '<div class="spinner"><img src="images/loader.gif" /></div>';
        },

        getDonate: function(){
            var donate = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
                            '<input type="hidden" name="cmd" value="_donations">' +
                            '<input type="hidden" name="business" value="sbigthumbs1@aol.com">' +
                            '<input type="hidden" name="lc" value="US">' +
                            '<input type="hidden" name="item_name" value="A New Beginning Pet Rescue Inc">' +
                            '<input type="hidden" name="no_note" value="0">' +
                            '<input type="hidden" name="currency_code" value="USD">' +
                            '<input type="hidden" name="bn" value="PP-DonationsBF:paypal.png:NonHostedGuest">' +
                            '<input type="image" src="http://members.petfinder.com/~FL163/images/paypal.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">' +
                            '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">' +
                        '</form>';
            return donate;
        }

	});

	return helperModel;

});