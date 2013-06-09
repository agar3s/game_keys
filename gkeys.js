var gKeys = function(){
  var keys = {
              UP: {down:false, up:false, pressed:false},
              DOWN: {down:false, up:false, pressed:false},
              LEFT: {down:false, up:false, pressed:false},
              RIGHT: {down:false, up:false, pressed:false}
             };

  var kdCallback, kuCallback;
  var canvas;

  var mapping = function(key, state){
    keys.UP[state] = key == 38;
    keys.DOWN[state] = key == 40;
    keys.LEFT[state] = key == 37;
    keys.RIGHT[state] = key == 39;
  };

  var keyDown = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    mapping(key, 'down');
    kdCallback(keys);
    e.preventDefault();
  };

  var keyUp = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    mapping(key, 'up');
    kuCallback(keys);
    e.preventDefault();
  };

  var init = function(){
    canvas = document.getElementsByTagName('canvas')[0];
    canvas.setAttribute('tabIndex', 1);
    canvas.focus();
  };

  (function(){
    init();
  })();

  return {
    'keyDown': function(callback){
      kdCallback = callback;
      canvas.addEventListener('keydown',  keyDown);
    },
    'keyUp': function(callback){
      kuCallback = callback;
      canvas.addEventListener('keyup',  keyUp);
    }
  };

}();