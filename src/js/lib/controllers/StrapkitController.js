define([
    'core/util/log',
    'lib/views/HomeView'
], function(log, HomeView){

    function StrapkitController(){
        log('StrapkitController constructor called.');
        this.homeView = new HomeView();
    }

    StrapkitController.prototype.showHomePage = function(){
        log('StrapkitController.showHomePage');
        this.homeView.render();
    };

    return StrapkitController;
});