define([
    'core/util/log',
    'lib/views/ButtonsDemoView'
], function(log, ButtonsDemoView){

    function DemosController(){
        log('DemosController constructor called.');
        this.buttonsDemoView = new ButtonsDemoView();
    }

    DemosController.prototype.showButtonsDemoPage = function(){
        log('DemosController.showButtonsDemoPage');
        this.buttonsDemoView.render();
    };




    return DemosController;
});