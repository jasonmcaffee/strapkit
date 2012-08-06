define([
    'core/util/log',
    'core/plugins/handlebars/eachWithIndex'
], function(log, eachWithIndexPlugin){
    log('core module loaded');

    var core = {
        initPlugins : function(){
            log('core.initPlugins called');
            eachWithIndexPlugin.init();
        }
    };

    return core;
});