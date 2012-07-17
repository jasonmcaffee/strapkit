define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/demos/demosHomePageTemplate',
    'lib-third-party/FastButton'
], function(log, Backbone, $, demosHomePageTemplate, FastButton){

    var DemosHomeView = Backbone.View.extend({
        el:'#pages',
        initialize : function(){
            log('DemosHomeView.initialize called.');
            $(function(){

            });

        },
        render: function(){
            log('DemosHomeView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(demosHomePageTemplate());
            });
        }
    });

    return DemosHomeView;
});