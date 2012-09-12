define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var Paginator = Backbone.View.extend({

        className: "pagination pagination-centered",

        initialize:function () {
           
            //this.model.bind("reset", this.render, this);
            this.render();
        },

        render:function () {
            var self = this;
            var items = pfc.models;
            var len = items.length;
            
            var pageCount = Math.ceil(len / 16);

            $(this.el).html('<ul />');

            for (var i=0; i < pageCount; i++) {

                $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#pets/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
            }

            $(this.el).append('<div><a id="prev" href="">Previous</a> &nbsp;<a href="" id="next">Next</a> </div>')

            return this;
        }
    });
    return Paginator
})

 