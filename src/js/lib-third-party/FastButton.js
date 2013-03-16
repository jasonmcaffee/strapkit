define([
    'jquery'
], function($){
    //this works really well, but is inconvenient to initialize.
//    $.fn.fastClick = function(handler) {
//        return $(this).each(function(){
//            $.FastButton($(this)[0], handler);
//        });
//    };
//    //https://github.com/dave1010/jquery-fast-click/blob/master/jQuery.fastClick.js
//    $.FastButton = function(element, handler) {
//        var startX, startY;
//
//        var reset = function() {
//            $(element).unbind('touchend');
//            $("body").unbind('touchmove.fastClick');
//        };
//
//        var onClick = function(event) {
//            console.log('fastbutton onClick called');
//            event.stopPropagation();
//            reset();
//            handler.call(this, event);
//
//            if (event.type === 'touchend') {
//                $.clickbuster.preventGhostClick(startX, startY);
//            }
//        };
//
//        var onTouchMove = function(event) {
//            if (Math.abs(event.originalEvent.touches[0].clientX - startX) > 10 ||
//                Math.abs(event.originalEvent.touches[0].clientY - startY) > 10) {
//                reset();
//            }
//        };
//
//        var onTouchStart = function(event) {
//            event.stopPropagation();
//
//            $(element).bind('touchend', onClick);
//            $("body").bind('touchmove.fastClick', onTouchMove);
//
//            startX = event.originalEvent.touches[0].clientX;
//            startY = event.originalEvent.touches[0].clientY;
//        };
//
//        $(element).bind({
//            touchstart: onTouchStart,
//            click: onClick
//        });
//    };
//
//    $.clickbuster = {
//        coordinates: [],
//
//        preventGhostClick: function(x, y) {
//            $.clickbuster.coordinates.push(x, y);
//            window.setTimeout($.clickbuster.pop, 2500);
//        },
//
//        pop: function() {
//            $.clickbuster.coordinates.splice(0, 2);
//        },
//
//        onClick: function(event) {
//            var x, y, i;
//            for (i = 0; i < $.clickbuster.coordinates.length; i += 2) {
//                x = $.clickbuster.coordinates[i];
//                y = $.clickbuster.coordinates[i + 1];
//                if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
//                    event.stopPropagation();
//                    event.preventDefault();
//                }
//            }
//        }
//    };
//
//    $(function(){
//        if (document.addEventListener){
//            document.addEventListener('click', $.clickbuster.onClick, true);
//        } else if (document.attachEvent){
//            // for IE 7/8
//            document.attachEvent('onclick', $.clickbuster.onClick);
//        }
//    });














//    $(function(){
//        document.getElementById('fastButtons').addEventListener('click', $.clickbuster.onClick, true);
//    });
        /**
         * From: http://code.this.com/mobile/articles/fast_buttons.html
         * Also see: http://stackoverflow.com/questions/6300136/trying-to-implement-googles-fast-button
         */

//        /** For IE8 and earlier compatibility: https://developer.mozilla.org/en/DOM/element.addEventListener */
//        function addListener(el, type, listener, useCapture) {
//            if (el.addEventListener) {
//                el.addEventListener(type, listener, useCapture);
//                return {
//                    destroy: function() { el.removeEventListener(type, listener, useCapture); }
//                };
//            } else {
//                // see: http://stackoverflow.com/questions/5198845/javascript-this-losing-context-in-ie
//                var handler = function(e) { listener.handleEvent(window.event, listener); }
//                el.attachEvent('on' + type, handler);
//
//                return {
//                    destroy: function() { el.detachEvent('on' + type, handler); }
//                };
//            }
//        }
//
//        var isTouch = "ontouchstart" in window;
//
//        /* Construct the FastButton with a reference to the element and click handler. */
//        function FastButton(element, handler, useCapture) {
//            // collect functions to call to cleanup events
//            this.events = [];
//            this.touchEvents = [];
//            this.element = element;
//            this.handler = handler;
//            this.useCapture = useCapture;
//            if (isTouch)
//                this.events.push(addListener(element, 'touchstart', this, this.useCapture));
//            this.events.push(addListener(element, 'click', this, this.useCapture));
//        }
//
//        /* Remove event handling when no longer needed for this button */
//       FastButton.prototype.destroy = function() {
//            for (i = this.events.length - 1; i >= 0; i -= 1)
//                this.events[i].destroy();
//            this.events = this.touchEvents = this.element = this.handler = this.fastButton = null;
//        };
//
//        /* acts as an event dispatcher */
//        FastButton.prototype.handleEvent = function(event) {
//            switch (event.type) {
//                case 'touchstart': this.onTouchStart(event); break;
//                case 'touchmove': this.onTouchMove(event); break;
//                case 'touchend': this.onClick(event); break;
//                case 'click': this.onClick(event); break;
//            }
//        };
//
//        /* Save a reference to the touchstart coordinate and start listening to touchmove and
//         touchend events. Calling stopPropagation guarantees that other behaviors don’t get a
//         chance to handle the same click event. This is executed at the beginning of touch. */
//        FastButton.prototype.onTouchStart = function(event) {
//            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
//            this.touchEvents.push(addListener(this.element, 'touchend', this, this.useCapture));
//            this.touchEvents.push(addListener(document.body, 'touchmove', this, this.useCapture));
//            this.startX = event.touches[0].clientX;
//            this.startY = event.touches[0].clientY;
//        };
//
//        /* When /if touchmove event is invoked, check if the user has dragged past the threshold of 10px. */
//        FastButton.prototype.onTouchMove = function(event) {
//            if (Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
//                this.reset(); //if he did, then cancel the touch event
//            }
//        };
//
//        /* Invoke the actual click handler and prevent ghost clicks if this was a touchend event. */
//        FastButton.prototype.onClick = function(event) {
//            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
//            this.reset();
//            // Use .call to call the method so that we have the correct "this": https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
//            var result = this.handler.call(this.element, event);
//            if (event.type == 'touchend')
//                clickbuster.preventGhostClick(this.startX, this.startY);
//            return result;
//        };
//
//        FastButton.prototype.reset = function() {
//            for (i = this.touchEvents.length - 1; i >= 0; i -= 1)
//                this.touchEvents[i].destroy();
//            this.touchEvents = [];
//        };
//
//        var clickbuster = function() {};
//
//        /* Call preventGhostClick to bust all click events that happen within 25px of
//         the provided x, y coordinates in the next 2.5s. */
//        clickbuster.preventGhostClick = function(x, y) {
//            clickbuster.coordinates.push(x, y);
//            window.setTimeout(clickbuster.pop, 2500);
//        };
//
//        clickbuster.pop = function() {
//            log('clickbuster.pop called.');
//            clickbuster.coordinates.splice(0, 2);
//        };
//
//        /* If we catch a click event inside the given radius and time threshold then we call
//         stopPropagation and preventDefault. Calling preventDefault will stop links
//         from being activated. */
//        clickbuster.onClick = function(event) {
//            log('clickbuster.onClick called');
//            for (var i = 0; i < clickbuster.coordinates.length; i += 2) {
//                var x = clickbuster.coordinates[i];
//                var y = clickbuster.coordinates[i + 1];
//                if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
//                    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
//                    event.preventDefault ? event.preventDefault() : (event.returnValue=false);
//                }
//            }
//        };
//
//        if (isTouch) {
//            // Don't need to use our custom addListener function since we only bust clicks on touch devices
//            $(function(){
//                document.getElementById('fastButtons').addEventListener('click', clickbuster.onClick, true);//hack. keep fastbutton isolated.
//            });
//            clickbuster.coordinates = [];
//        }


   // return FastButton;
    //return $.FastButton;
});