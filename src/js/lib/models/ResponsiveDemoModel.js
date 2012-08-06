
define([
    'core/util/log',
    'backbone'
], function(log, Backbone){
    log('ResponsiveDemoView module loaded.');

    var ResponsiveDemoModel = Backbone.Model.extend({
        defaults:{

            masterListItems:[
                {
                    itemText: 'Master Item 1',
                    detailListItems:[
                        {itemText:'Master Item 1 Detail 1'},
                        {itemText:'Master Item 1 Detail 2'},
                        {itemText:'Master Item 1 Detail 3'},
                        {itemText:'Master Item 1 Detail 4'}
                    ]
                },
                {
                    itemText: 'Master Item 2',
                    detailListItems:[
                        {itemText:'Master Item 2 Detail 1'},
                        {itemText:'Master Item 2 Detail 2'},
                        {itemText:'Master Item 2 Detail 3'},
                        {itemText:'Master Item 2 Detail 4'}
                    ]
                },
                {
                    itemText: 'Master Item 3',
                    detailListItems:[
                        {itemText:'Master Item 3 Detail 1'},
                        {itemText:'Master Item 3 Detail 2'},
                        {itemText:'Master Item 3 Detail 3'},
                        {itemText:'Master Item 3 Detail 4'}
                    ]
                }
            ],

            //when a user clicks a master list item, this should be set.
            selectedMasterListItem : undefined
        },

        initialize:function(){
            this.attributes.selectedMasterListItem = this.attributes.masterListItems[0];
        }
    });


    return ResponsiveDemoModel;
});