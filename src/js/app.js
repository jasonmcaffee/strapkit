define([
    'core/util/log',
    'core/core',
    'jquery',
    'backbone',
    'lib/controllers/DemosController',
    'lib/controllers/StrapkitController',
    'lib/widgets/NavigationBar'
], function(log, core, $, Backbone, DemosController, StrapkitController, NavigationBar){

    function App(){
        log('app constructor called.');

        //load plugins, etc
        core.initPlugins();

        var self = this;
        //make everything easier to manage by waiting until dom ready to create controllers
        $(function(){
            log('app : document ready. creating controllers and establishing routes.');
            //create controllers
            self.demosController = new DemosController();
            self.strapkitController = new StrapkitController();

            //setup routes
            self.setupRoutes();

            //create global widgets
            self.navigationBar = new NavigationBar();

            //if there is no relative route, send them to the home page.
            log('current route is : ' + Backbone.history.fragment);
            if(Backbone.history.fragment == ""){
                //load the home page
                self.router.navigate('home', {trigger:true});
            }
        });



    }



    App.prototype.setupRoutes = function(){
        log('App.setupRoutes called.');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
                "demos/buttonsDemo" : "buttonsDemo",
                "demos/responsiveDemo" : "responsiveDemo",
                "demos/responsiveFlexBoxDemo" : "responsiveFlexBoxDemo",
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
            responsiveFlexBoxDemo : function(){
                log('router: responsiveFlexBoxDemo called.');
                self.demosController.showResponsiveFlexBoxDemoPage();
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