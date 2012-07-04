define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/homePageTemplate'
], function(log, Backbone, $, homePageTemplateFunction){

    var HomeView = Backbone.View.extend({
        el:'#pages',
        initialize : function(){
            log('HomeView.initialize called.');

        },
        render: function(){
            log('HomeView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(homePageTemplateFunction());
            });
        }
    });

    return HomeView;
});