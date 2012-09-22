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
                'choice':$('input[name=choice]:radio:checked').val(),
                'petname': $('#petname').val(),
                'firstname': $('#firstname').val(),
                'lastname':$('#lastname').val(),
                'email':$('#email').val(),
                'phone':$('#phone').val(),
                'address':$('#address').val(),
                'city':$('#city').val(),
                'state':$('#state').val(),
                'zip':$('#zip').val()
            };
            
            $.ajax({
                url: "xhr/send_form_email.php",
                type: "POST",
                data: email_obj,
                success: function(response){
                    response = $.parseJSON(response);

                    if(response.status == 0) {
                        $('#response_info').html('<p class="error">' + response.message + '</p>');
                    } else if(response.status == 1) {
                        $('#response_info').html('<p class="success">' + response.message + '</p>');
                        $('#submit_container').remove();
                    } else {
                        $('#response_info').html(
                            '<div>' +
                                '<p>' + response.error_1 + '</p>' +
                                '<p class="error">' + response.error_msg + '</p>' +
                                '<p>' + response.error_2 + '</p>' +
                            '</div>'
                        );
                    }
                }
            });
        }
	});

    return FosterView
});