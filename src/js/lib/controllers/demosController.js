define([
    'core/util/log',
    'lib/views/ButtonsDemoView',
    'lib/views/ResponsiveDemoView',
    'lib/views/DemosHomeView'
], function(log, ButtonsDemoView, ResponsiveDemoView, DemosHomeView){

    function DemosController(){
        log('DemosController constructor called.');
        this.buttonsDemoView = new ButtonsDemoView();
        this.responsiveDemoView = new ResponsiveDemoView();
        this.demosHomeView = new DemosHomeView();
    }

    DemosController.prototype.showButtonsDemoPage = function(){
        log('DemosController.showButtonsDemoPage');
        this.buttonsDemoView.render();
    };

    DemosController.prototype.showResponsiveDemoPage = function(){
        log('DemosController.showResponsiveDemoPage');
        this.responsiveDemoView.render();
    };

    DemosController.prototype.showDemosHomePage = function(){
        log('DemosController.showDemosHomePage');
        this.demosHomeView.render();
    };






    return DemosController;
});