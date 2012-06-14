define([
    'core/util/log',
    'jquery',
    'compiled-templates/demos/buttonsDemoPage'
], function(log, $, buttonsDemoPageTemplateFunction){

    function app(){

    }

    $(function(){
       log('document ready.');
        $('body').append(buttonsDemoPageTemplateFunction());
    });

    return new app();
});