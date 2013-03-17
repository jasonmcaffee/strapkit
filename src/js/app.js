define([
    'core/core',
    'jquery',
    'backbone',
    'lib/controllers/DemosController',
    'lib/controllers/StrapkitController',
    'lib/widgets/NavigationBar'
], function(core, $, Backbone, DemosController, StrapkitController, NavigationBar){

    function App(){
        core.log('app constructor called.');

        //load plugins, etc
        core.init();

        var self = this;
        //make everything easier to manage by waiting until dom ready to create controllers
        $(function(){
            core.log('app : document ready. creating controllers and establishing routes.');
            //create controllers
            self.demosController = new DemosController();
            self.strapkitController = new StrapkitController();

            //setup routes
            self.setupRoutes();

            //create global widgets
            self.navigationBar = new NavigationBar();

            //if there is no relative route, send them to the home page.
            core.log('current route is : ' + Backbone.history.fragment);
            if(Backbone.history.fragment == ""){
                //load the home page
                self.router.navigate('home', {trigger:true});
            }
        });



    }



    App.prototype.setupRoutes = function(){
        core.log('App.setupRoutes called.');
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
              core.log('router: home called');
                self.strapkitController._action();
            },
            buttonsDemo : function(){
                core.log('router: buttonsDemo called.');
                self.demosController.showButtonsDemoPage();
            },
            responsiveDemo : function(){
                core.log('router: responsiveDemo called.');
                self.demosController.showResponsiveDemoPage();
            },
            responsiveFlexBoxDemo : function(){
                core.log('router: responsiveFlexBoxDemo called.');
                self.demosController.showResponsiveFlexBoxDemoPage();
            },
            demosHome : function(){
                core.log('router: demosHome called.');
                self.demosController.showDemosHomePage();
            }
        });

        this.router = new AppRouter();
        Backbone.history.start();
    };

    $(function(){
       core.log('document ready.');
    });

    return new App();
});