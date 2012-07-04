define([
    'core/util/log',
    'lib/views/ButtonsDemoView',
    'lib/views/ResponsiveDemoView'
], function(log, ButtonsDemoView, ResponsiveDemoView){

    function DemosController(){
        log('DemosController constructor called.');
        this.buttonsDemoView = new ButtonsDemoView();
        this.responsiveDemoView = new ResponsiveDemoView();
    }

    DemosController.prototype.showButtonsDemoPage = function(){
        log('DemosController.showButtonsDemoPage');
        this.buttonsDemoView.render();
    };

    DemosController.prototype.showResponsiveDemoPage = function(){
        log('DemosController.showResponsiveDemoPage');
        this.responsiveDemoView.render();
    };






    return DemosController;
});