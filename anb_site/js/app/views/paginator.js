define(function (require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var Paginator = Backbone.View.extend({

        className: "pagination pagination-centered",

        initialize:function () {
           
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
            //console.log(pageCount);
            
            // var currentPage = this.options.page ? this.options.page <= pageCount  ;
            // console.log(currentPage)
            $(this.el).append('<div><a id="prev" href="#pets/page/'+(this.options.page - 1)+'">Previous</a> &nbsp;<a href="#pets/page/'+ (this.options.page + 1) +'" id="next">Next</a> </div>')

            return this;
        }
    });
    return Paginator
})

 