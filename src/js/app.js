define([
    'core/util/log',
    'jquery',
    'backbone',
    'lib/controllers/DemosController',
    'lib/controllers/StrapkitController',
    'lib/widgets/NavigationBar'
], function(log, $, Backbone, DemosController, StrapkitController, NavigationBar){

    function App(){
        log('app constructor called.');
        this.demosController = new DemosController();
        this.strapkitController = new StrapkitController();
        this.setupRoutes();

        this.navigationBar = new NavigationBar();

        //load the home page
        this.router.navigate('home', {trigger:true});
    }



    App.prototype.setupRoutes = function(){
        log('App.setupRoutes called.');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
                "demos/buttonsDemo" : "buttonsDemo",
                "demos/responsiveDemo" : "responsiveDemo",
                "home" : "home"
            },
            home: function(){
              log('router: home called');
                self.strapkitController.showHomePage();
            },
            buttonsDemo : function(){
                log('router: buttonsDemo called.');
                self.demosController.showButtonsDemoPage();
            },
            responsiveDemo : function(){
                log('router: responsiveDemo called.');
                self.demosController.showResponsiveDemoPage();
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