define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    /*var petCollection = require('collections/petCollection');
    var petItemView = require('views/petItemView');*/
    var petsTemplate = require('text!templates/petsTemplate.html');
	
	var petsView = Backbone.View.extend({
        el: $('#container'),

        initialize: function(){
            this.render();
        },

        render: function(){
            console.log('rendered pets view');

            $(this.el).html(petsTemplate);
        }

    });

    return petsView;
});