(function(window, document, undefined){

  var gKeys = function(){
    var Key = function(){
      this.d = false;
      this.u = false;
      this.p = 0;
    };
    var keys = {
                UP: new Key(),
                DOWN: new Key(),
                LEFT: new Key(),
                RIGHT: new Key(),
                SPACE: new Key()
               },
        mapKeys = {
                  37: 'LEFT',
                  38: 'UP',
                  39: 'RIGHT',
                  40: 'DOWN',
                  32: 'SPACE',
                  //virtual keys
                  'vk_left': 'LEFT',
                  'vk_up': 'UP',
                  'vk_right': 'RIGHT',
                  'vk_down': 'DOWN',
                  'vk_space': 'SPACE',
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
      var callUp = false,
          callDown = false;

      if(!custom_thread && arguments.callee.caller.name !== 'gScanning'){
        custom_thread = true;
      }
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

      //if virtualkeys
      var collection = document.getElementById('virtualKeys').children;
      for(var i = 0; i<collection.length; i++){
        var link = collection[i];
        link.onclick = function(event){
          return false;
        };
        link.onmousedown = function(event){
          mapping(this.id, true);

          return false;
        };
        link.onmouseup = function(event){
          mapping(this.id, false);
          canvas.focus();
          return false;
        };
        link.addEventListener("touchstart", function(e){
            mapping(this.id, true);
            e.preventDefault();
        }, false);
        link.addEventListener("touchend", function(e){
          mapping(this.id, false);
          e.preventDefault();
        }, false);

      }
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