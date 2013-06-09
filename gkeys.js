var gKeys = function(){
  var keys = {
              UP: {d:false, u:false, p:0},
              DOWN: {d:false, u:false, p:0},
              LEFT: {d:false, u:false, p:0},
              RIGHT: {d:false, u:false, p:0}
             };
  var mapKeys = {
                37: 'LEFT',
                38: 'UP',
                39: 'RIGHT',
                40: 'DOWN'
              };
  var kdCallback, kuCallback = function(keys){};
  var canvas;

  var mapping = function(key, down){
    if(key in mapKeys){
      keys[mapKeys[key]].d = down;
      keys[mapKeys[key]].u = !down;
    }
    for(key in keys){
      if (!keys.hasOwnProperty(key)) continue;
      keys[key].p = keys[key].d ? keys[key].p+1 : 0;
    }
  };

  var keyDown = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    mapping(key, true);
    kdCallback(keys);
    e.preventDefault();
  };

  var keyUp = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    mapping(key, false);
    kuCallback(keys);
    e.preventDefault();
  };

  (function(){
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.setAttribute('tabIndex', 1);
    canvas.addEventListener('keydown',  keyDown);
    canvas.addEventListener('keyup',  keyUp);
    canvas.focus();
  })();

  return {
    'keyDown': function(callback){
      kdCallback = callback;
    },
    'keyUp': function(callback){
      kuCallback = callback;
    }
  };

}();