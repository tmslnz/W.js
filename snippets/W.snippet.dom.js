////
/// W.snippet.dom
// @author Ross Cairns
(function () {
    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }
    W.snippet = W.snippet || {};

    W.snippet.dom = W.dom || {};
    W.snippet.dom.version = "2.0.0";

    W.snippet.dom.ZIndexStack = W.Object.extend({
        constructor : function (options) {
            if (!options) { options = {}; }
            this.startZIndex = (typeof options.startZIndex === "undefined") ? 100 : options.startZIndex; 
            this.topZIndex = this.startZIndex;
            this.elList = new W.List();
        },
        addToTop : function (el) {
            $(el).css('z-index', ++this.topZIndex);
            this.elList.append(el);
        },
        sendToFront : function (el) {
            var zindexNeedle = this.topZIndex;
            this.elList.sendToBack(el);
            this.elList.each(function (el, i) {
                $(el).css('z-index', this.startZIndex + i);
            },this);
        }
    });

    W.snippet.dom.viewportSize = function () {
		var e = window, 
			a = 'inner';
		if ( !( 'innerWidth' in window ) ){
			a = 'client';
			e = document.documentElement || document.body;
		}
		return {width:e[a+'Width'],height:e[ a+'Height']};
	}; 

    // @note webkit only
    // @requires W.snippets.math
    // W.cssGradientString().add(0, "#FF0000").add(0, "#00FF00").add(0, "#0000FF").get();
    W.snippet.dom.cssGradientString = function(stops) {
        var values = [];
        var _direction = "left"; // "top", "right", "bottom", "left", "-45.0deg"
        var promise = {
            direction : function (direction) {
                _direction = direction;
                return promise;
            },
            add : function (precentage, value) {
                values.push([precentage, value]);
                return promise;
            },
            get : function () {
                var str = "-webkit-linear-gradient(" + _direction + ", ";
                for (var i = 0; i<values.length; i++) {
                    str += values[i][1] + " " + values[i][0] + "%";
                    if (i<values.length-1) { str += ","; }
                }
                str += ")";
                return str;
            }
        };
        return promise;
    };


    var privateNamespace = {};
    (function(namespace){
            /*
             * Modified from 
             * Canvas Context2D Wrapper <http://github.com/millermedeiros/CanvasContext2DWrapper>
             * Released under WTFPL <http://sam.zoy.org/wtfpl/>.
             * @author Miller Medeiros <http://millermedeiros.com>
             * @version 1.0 (2010/08/08)
             */
        var _context2DMethods = 'arc arcTo beginPath bezierCurveTo clearRect clip closePath createImageData createLinearGradient createRadialGradient createPattern drawFocusRing drawImage fill fillRect fillText getImageData isPointInPath lineTo measureText moveTo putImageData quadraticCurveTo rect restore rotate save scale setTransform stroke strokeRect strokeText transform translate'.split(' '),
            _context2DProperties = 'canvas fillStyle font globalAlpha globalCompositeOperation lineCap lineJoin lineWidth miterLimit shadowOffsetX shadowOffsetY shadowBlur shadowColor strokeStyle textAlign textBaseline'.split(' ');
        function chainMethod(fn, scope, chainReturn){
            return function(){
                return fn.apply(scope, arguments) || chainReturn;
            };
        }
        function chainProperty(propName, scope, chainReturn){
            return function(value){
                if(typeof value === 'undefined'){
                    return scope[propName];
                }else{
                    scope[propName] = value;
                    return chainReturn;
                }
            };
        }
        namespace.Context2DWrapper = function(target){
            var n = _context2DMethods.length, curProp;
            this.context = target;
            while(n--){
                curProp = _context2DMethods[n];
                this[curProp] = chainMethod(target[curProp], target, this);
            }
            n = _context2DProperties.length;
            while(n--){
                curProp = _context2DProperties[n];
                this[curProp] = chainProperty(curProp, target, this);
            }
        };
    }(privateNamespace));

    W.snippet.dom.wrappedContext = function (context) {
        return new privateNamespace.Context2DWrapper(context);
    };

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    W.snippet.dom.polyfillRequestAnimationFrame = function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
              window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    };

}());