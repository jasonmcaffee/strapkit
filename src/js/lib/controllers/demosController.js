define([
    'core/util/log',
    'lib/views/ButtonsDemoView',
    'lib/views/ResponsiveDemoView',
    'lib/views/DemosHomeView',
    'lib/models/ResponsiveDemoModel'
], function(log, ButtonsDemoView, ResponsiveDemoView, DemosHomeView, ResponsiveDemoModel){

    function DemosController(){
        log('DemosController constructor called.');

        //models
        this.responsiveDemoModel = undefined;

        //views
        this.buttonsDemoView = new ButtonsDemoView();
        this.responsiveDemoView = undefined;
        this.demosHomeView = new DemosHomeView();
    }

    DemosController.prototype.showButtonsDemoPage = function(){
        log('DemosController.showButtonsDemoPage');
        this.buttonsDemoView.render();
    };

    DemosController.prototype.showResponsiveDemoPage = function(){
        log('DemosController.showResponsiveDemoPage');

        //this.responsiveDemoModel = this.responsiveDemoModel || new ResponsiveDemoModel();
        //this.responsiveDemoView.model = this.responsiveDemoModel;
        //this.responsiveDemoView.model = this.responsiveDemoView.model || new ResponsiveDemoModel();
        //this.responsiveDemoView.render();
        this.getResponsiveDemoView().render();
    };

    DemosController.prototype.showDemosHomePage = function(){
        log('DemosController.showDemosHomePage');
        this.demosHomeView.render();
    };

    DemosController.prototype.getResponsiveDemoView = function(){
        if(!this.responsiveDemoView){
            this.responsiveDemoModel = new ResponsiveDemoModel();
            this.responsiveDemoView = new ResponsiveDemoView({model:this.responsiveDemoModel});
        }

        return this.responsiveDemoView;
    };






    return DemosController;
});