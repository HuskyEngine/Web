if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    // Could we try:
    // return Array(count + 1).join(this);
    return rpt;
  }
}

var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var concat = Function.bind.call(Function.call, Array.prototype.concat);
var keys = Reflect.ownKeys;

if (!Object.values) {
      Object.values = function values(O) {
              return reduce(keys(O), function (v, k) {
                        return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []);
                            }, []);
                };
}

if (!Object.entries) {
      Object.entries = function entries(O) {
              return reduce(keys(O), function (e, k) {
                        return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
                            }, []);
                };
}

(function(e){var f=function(B,C){var D=B[0],E=B[1],F=B[2],G=B[3];D=h(D,E,F,G,C[0],7,-680876936),G=h(G,D,E,F,C[1],12,-389564586),F=h(F,G,D,E,C[2],17,606105819),E=h(E,F,G,D,C[3],22,-1044525330),D=h(D,E,F,G,C[4],7,-176418897),G=h(G,D,E,F,C[5],12,1200080426),F=h(F,G,D,E,C[6],17,-1473231341),E=h(E,F,G,D,C[7],22,-45705983),D=h(D,E,F,G,C[8],7,1770035416),G=h(G,D,E,F,C[9],12,-1958414417),F=h(F,G,D,E,C[10],17,-42063),E=h(E,F,G,D,C[11],22,-1990404162),D=h(D,E,F,G,C[12],7,1804603682),G=h(G,D,E,F,C[13],12,-40341101),F=h(F,G,D,E,C[14],17,-1502002290),E=h(E,F,G,D,C[15],22,1236535329),D=l(D,E,F,G,C[1],5,-165796510),G=l(G,D,E,F,C[6],9,-1069501632),F=l(F,G,D,E,C[11],14,643717713),E=l(E,F,G,D,C[0],20,-373897302),D=l(D,E,F,G,C[5],5,-701558691),G=l(G,D,E,F,C[10],9,38016083),F=l(F,G,D,E,C[15],14,-660478335),E=l(E,F,G,D,C[4],20,-405537848),D=l(D,E,F,G,C[9],5,568446438),G=l(G,D,E,F,C[14],9,-1019803690),F=l(F,G,D,E,C[3],14,-187363961),E=l(E,F,G,D,C[8],20,1163531501),D=l(D,E,F,G,C[13],5,-1444681467),G=l(G,D,E,F,C[2],9,-51403784),F=l(F,G,D,E,C[7],14,1735328473),E=l(E,F,G,D,C[12],20,-1926607734),D=m(D,E,F,G,C[5],4,-378558),G=m(G,D,E,F,C[8],11,-2022574463),F=m(F,G,D,E,C[11],16,1839030562),E=m(E,F,G,D,C[14],23,-35309556),D=m(D,E,F,G,C[1],4,-1530992060),G=m(G,D,E,F,C[4],11,1272893353),F=m(F,G,D,E,C[7],16,-155497632),E=m(E,F,G,D,C[10],23,-1094730640),D=m(D,E,F,G,C[13],4,681279174),G=m(G,D,E,F,C[0],11,-358537222),F=m(F,G,D,E,C[3],16,-722521979),E=m(E,F,G,D,C[6],23,76029189),D=m(D,E,F,G,C[9],4,-640364487),G=m(G,D,E,F,C[12],11,-421815835),F=m(F,G,D,E,C[15],16,530742520),E=m(E,F,G,D,C[2],23,-995338651),D=o(D,E,F,G,C[0],6,-198630844),G=o(G,D,E,F,C[7],10,1126891415),F=o(F,G,D,E,C[14],15,-1416354905),E=o(E,F,G,D,C[5],21,-57434055),D=o(D,E,F,G,C[12],6,1700485571),G=o(G,D,E,F,C[3],10,-1894986606),F=o(F,G,D,E,C[10],15,-1051523),E=o(E,F,G,D,C[1],21,-2054922799),D=o(D,E,F,G,C[8],6,1873313359),G=o(G,D,E,F,C[15],10,-30611744),F=o(F,G,D,E,C[6],15,-1560198380),E=o(E,F,G,D,C[13],21,1309151649),D=o(D,E,F,G,C[4],6,-145523070),G=o(G,D,E,F,C[11],10,-1120210379),F=o(F,G,D,E,C[2],15,718787259),E=o(E,F,G,D,C[9],21,-343485551),B[0]=A(D,B[0]),B[1]=A(E,B[1]),B[2]=A(F,B[2]),B[3]=A(G,B[3])},g=function(B,C,D,E,F,G){return C=A(A(C,B),A(E,G)),A(C<<F|C>>>32-F,D)},h=function(B,C,D,E,F,G,H){return g(C&D|~C&E,B,C,F,G,H)},l=function(B,C,D,E,F,G,H){return g(C&E|D&~E,B,C,F,G,H)},m=function(B,C,D,E,F,G,H){return g(C^D^E,B,C,F,G,H)},o=function(B,C,D,E,F,G,H){return g(D^(C|~E),B,C,F,G,H)},p=function(B){var F,D=B.length,E=[1732584193,-271733879,-1732584194,271733878];for(F=64;F<=B.length;F+=64)f(E,r(B.substring(F-64,F)));B=B.substring(F-64);var G=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(F=0;F<B.length;F++)G[F>>2]|=B.charCodeAt(F)<<(F%4<<3);if(G[F>>2]|=128<<(F%4<<3),55<F)for(f(E,G),F=0;16>F;F++)G[F]=0;return G[14]=8*D,f(E,G),E},r=function(B){var D,C=[];for(D=0;64>D;D+=4)C[D>>2]=B.charCodeAt(D)+(B.charCodeAt(D+1)<<8)+(B.charCodeAt(D+2)<<16)+(B.charCodeAt(D+3)<<24);return C},u='0123456789abcdef'.split(''),v=function(B){for(var C='',D=0;4>D;D++)C+=u[15&B>>8*D+4]+u[15&B>>8*D];return C},w=function(B){for(var C=0;C<B.length;C++)B[C]=v(B[C]);return B.join('')},z=e.md5=function(B){return w(p(B))},A=function(B,C){return 4294967295&B+C};if('5d41402abc4b2a76b9719d911017c592'!=z('hello'))var A=function(B,C){var D=(65535&B)+(65535&C);return(B>>16)+(C>>16)+(D>>16)<<16|65535&D}})(window);
var HighResolutionTimer=window.HighResolutionTimer=window.HighResolutionTimer||function(){return function(b){return this.timer=!1,this.total_ticks=0,this.start_time=void 0,this.current_time=void 0,this.duration=b.duration?b.duration:1e3,this.callback=b.callback?b.callback:function(){},this.run=function(){this.current_time=Date.now(),this.start_time||(this.start_time=this.current_time),this.callback(this);var c=this.duration-(this.current_time-(this.start_time+this.total_ticks*this.duration));return this.total_ticks++,function(d){d.timer=setTimeout(function(){d.run()},c)}(this),this},this.stop=function(){return clearTimeout(this.timer),this},this}}();
var vis = (function(){
  var stateKey, 
      eventKey, 
      keys = {
              hidden: "visibilitychange",
              webkitHidden: "webkitvisibilitychange",
              mozHidden: "mozvisibilitychange",
              msHidden: "msvisibilitychange"
  };
  for (stateKey in keys) {
      if (stateKey in document) {
          eventKey = keys[stateKey];
          break;
      }
  }
  return function(c) {
      if (c) document.addEventListener(eventKey, c);
      return !document[stateKey];
  }
})();