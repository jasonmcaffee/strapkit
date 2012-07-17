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

        //create controllers
        this.demosController = new DemosController();
        this.strapkitController = new StrapkitController();

        //setup routes
        this.setupRoutes();

        //create global widgets
        this.navigationBar = new NavigationBar();

        //if there is no relative route, send them to the home page.
        log('current route is : ' + Backbone.history.fragment);
        if(Backbone.history.fragment == ""){
            //load the home page
            this.router.navigate('home', {trigger:true});
        }

    }



    App.prototype.setupRoutes = function(){
        log('App.setupRoutes called.');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
                "demos/buttonsDemo" : "buttonsDemo",
                "demos/responsiveDemo" : "responsiveDemo",
                "home" : "home",
                "demos/home" : "demosHome"
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
            },
            demosHome : function(){
                log('router: demosHome called.');
                self.demosController.showDemosHomePage();
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