
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
                        {itemText:'Detail 1', itemText2:'a', itemText3:'b'},
                        {itemText:'Detail 2', itemText2:'c', itemText3:'d' },
                        {itemText:'Detail 3', itemText2:'e', itemText3:'f'},
                        {itemText:'Detail 4', itemText2:'g', itemText3:'h'}
                    ]
                },
                {
                    itemText: 'Master Item 2',
                    detailListItems:[
                        {itemText:'Detail 1', itemText2:'a', itemText3:'b'},
                        {itemText:'Detail 2', itemText2:'c', itemText3:'d' },
                        {itemText:'Detail 3', itemText2:'e', itemText3:'f'},
                        {itemText:'Detail 4', itemText2:'g', itemText3:'h'}
                    ]
                },
                {
                    itemText: 'Master Item 3',
                    detailListItems:[
                        {itemText:'Detail 1', itemText2:'a', itemText3:'b'},
                        {itemText:'Detail 2', itemText2:'c', itemText3:'d' },
                        {itemText:'Detail 3', itemText2:'e', itemText3:'f'},
                        {itemText:'Detail 4', itemText2:'g', itemText3:'h'}
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