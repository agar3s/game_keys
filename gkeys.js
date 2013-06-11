(function(window, document, undefined){

  var gKeys = function(){
    var keys = {
                UP: {d:false, u:false, p:0},
                DOWN: {d:false, u:false, p:0},
                LEFT: {d:false, u:false, p:0},
                RIGHT: {d:false, u:false, p:0}
               },
        mapKeys = {
                  37: 'LEFT',
                  38: 'UP',
                  39: 'RIGHT',
                  40: 'DOWN'
                },
        canvas,
        kdCallback = function( keys ){},
        kuCallback = function( keys ){};
    var custom_thread = false;


    var mapping = function( key, down ){
      if(key in mapKeys){
        keys[mapKeys[key]].d = down;
        keys[mapKeys[key]].u = !down;
      }
    };

    var keyDowns = function( e ){
      var key = e.keyCode ? e.keyCode : e.which;
      mapping(key, true);
      e.preventDefault();
    };

    var keyUps = function( e ){
      var key = e.keyCode ? e.keyCode : e.which;
      mapping(key, false);
      e.preventDefault();
    };

    var scanKeys = function(){
      if(!custom_thread && arguments.callee.caller.name !== 'gScanning'){
        custom_thread = true;
      }
      var callUp = false,
          callDown = false;
      for(key in keys){
        if (!keys.hasOwnProperty(key)) continue;
        keys[key].p = keys[key].d ? keys[key].p+1 : 0;
        callDown = callDown || keys[key].d;
        callUp = callUp || keys[key].u;
      }
      if(callDown){
        kdCallback(keys);
      }
      if(callUp){
        kuCallback(keys);
      }
    };

    (function init(){
      canvas = document.getElementsByTagName('canvas')[0];
      canvas.setAttribute('tabIndex', 1);
      canvas.addEventListener('keydown',  keyDowns);
      canvas.addEventListener('keyup',  keyUps);
      canvas.focus();
    })();
    
    (function gScanning(){
      if(!custom_thread){
        scanKeys();
        window.setTimeout(gScanning, 1000 / 60);
      }
    })();

    return {
      'keyDown': function( callback ){
        kdCallback = callback;
      },
      'keyUp': function( callback ){
        kuCallback = callback;
      },
      'scanKeys': scanKeys,
    };

  }();
  window.gKeys = gKeys;

})(window, document);