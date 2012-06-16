define([
    'core/util/log',
    'jquery',
    'backbone',
    'lib/controllers/DemosController'
], function(log, $, Backbone, DemosController){

    function App(){
        log('app constructor called.');
        this.demosController = new DemosController();
        this.setupRoutes();
    }

    App.prototype.setupRoutes = function(){
        log('App.setupRoutes called.');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
                "demos/buttonsDemo" : "buttonsDemo"
            },
            buttonsDemo : function(){
                log('router: buttonsDemo called.');
                self.demosController.showButtonsDemoPage();
            }
        });

        this.router = new AppRouter();
        Backbone.history.start();
    };

    $(function(){
       log('document ready.');
    });

    return new App();
});