define([
    'core/util/log',
    'jquery'
], function(log, $){

    function NavigationBar(options){
        log('NavigationBar constructor called.');
        this.options = {
            navigationBarId : 'navigationBar'
        };

        $.extend(this.options, options);

        var self = this;
        //init
        $(function(){
            self.$navigationBar = $('#'+self.options.navigationBarId);
            self.registerTouchHandlers();
        });

    }

    /**
     * Should only be called after document ready
     */
    NavigationBar.prototype.registerTouchHandlers = function(){
        var originalUrl;
        this.$navigationBar.on('touchstart', 'li > a > img', function(){
            var $this = $(this);
            log('touchstart fired for : {0}', $this.attr('alt'));

            originalUrl = $this.attr('src');
            $this.attr('src', 'images/menu-button-pressed.png');

        });
        this.$navigationBar.on('touchend', 'li > a > img', function(){
            var $this = $(this);
            log('touchsend fired for : {0}', $this.attr('alt'));

            $this.attr('src', originalUrl);
        });

    };

    return NavigationBar;
});