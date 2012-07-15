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
                log('HomeView.render executing now that dom is ready...');
                //render the template function to the dom
                //var newHtml = homePageTemplateFunction();
                //log('newHtml is : ' + newHtml);
                self.$el.html(homePageTemplateFunction()); //todo: this doesn't work in opera
            });
        }
    });

    return HomeView;
});