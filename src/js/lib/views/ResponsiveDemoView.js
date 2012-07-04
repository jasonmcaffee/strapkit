define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/demos/responsiveDemoPageTemplate'
], function(log, Backbone, $, responsiveDemoPageTemplate){

    var ResponsiveDemoView = Backbone.View.extend({
        el:'#pages',
        initialize : function(){
            log('ResponsiveDemoView.initialize called.');

        },
        render: function(){
            log('ResponsiveDemoView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(responsiveDemoPageTemplate());
            });
        }
    });

    return ResponsiveDemoView;
});