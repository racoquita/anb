define(function (require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
	var fosterTemplate = require('text!templates/fosterTemplate.html');


	var FosterView =  Backbone.View.extend({
		id: 'foster_view',
        
        initialize: function(){
        	this.render();
            this.load();
        },
        
        render: function(){
        	$(this.el).html(fosterTemplate);
        },

        events: {
            "change input[type='radio']" : "changeForm",
            "focus input[type='text']" : "clearField",
            "click #submit" : "submitForm"
        },

        changeForm: function(e){
            e.target.value == 'foster' ? $('#petname_label').text('The pet I want to foster is') : $('#petname_label').text('The pet I want to adopt is');            
        },

        clearField: function(e){
            $(e.target).attr('value','');
        },

        submitForm: function(e){
            e.preventDefault();

            var email_obj = {
                'petname': $('#petname').val(),
                'firstname': $('#firstname').val(),
                'lastname':$('#lastname').val()
            };
            
            $.ajax({
                url: "xhr/send_form_email.php",
                type: "POST",
                data: email_obj,
                success: function(response){
                    console.log(response);
                }
            });
        }
	});

    return FosterView
});