define([
    'core/util/log',
    'jquery',
    'compiled-templates/demos/demo-one'
], function(log, $, demoOneTemplateFunction){

    function app(){

    }

    $(function(){
       log('document ready.');
        $('body').append(demoOneTemplateFunction());
    });

    return new app();
});