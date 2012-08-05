define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/demos/responsiveDemoPageTemplate',
    'lib/widgets/ResponsiveMasterDetailList'
], function(log, Backbone, $, responsiveDemoPageTemplate, ResponsiveMasterDetailListWidget){

    var ResponsiveDemoView = Backbone.View.extend({
        el:'#pages',
        events:{
            "click #masterList li" : "masterListItemClick"
        },
        initialize : function(){
            log('ResponsiveDemoView.initialize called.');

            this.responsiveMasterDetailListWidget = new ResponsiveMasterDetailListWidget({el:''});

        },
        render: function(){
            log('ResponsiveDemoView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(responsiveDemoPageTemplate());

                //wire up ResponsiveMasterDetailListWidget
            });
        },
        masterListItemClick : function(e){
            var $listItem = $(e.target);
            log('masterListItemClick : {0}', $listItem.html());
        }
    });

    return ResponsiveDemoView;
});