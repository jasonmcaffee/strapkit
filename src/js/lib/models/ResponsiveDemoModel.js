
define([
    'core/util/log',
    'backbone'
], function(log, Backbone){
    log('ResponsiveDemoView module loaded.');

    var ResponsiveDemoModel = new Backbone.Model.extend({
        defaults:{
            masterListItems:[
                {
                    itemText: 'Master Item 1'
                },
                {
                    itemText: 'Master Item 2'
                },
                {
                    itemText: 'Master Item 3'
                }
            ]
        }
    });

    return ResponsiveDemoModel;
});