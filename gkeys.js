var gKeys = function(){
  var keys = {
              'UP': true,
              'DOWN': true,
              'LEFT': true,
              'RIGHT':true
             };

  var kdCallback, kuCallback;

  var keyDown = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    keys['UP'] = key == 38;
    keys['DOWN'] = key == 40;
    keys['LEFT'] = key == 37;
    keys['RIGHT'] = key == 39;
    
    kdCallback(keys);
  }

  var keyUp = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    kuCallback(keys);
  }


  return {
    'keyDown': function(callback){
      kdCallback = callback;
      document.addEventListener('keydown',  keyDown);
    },
    'keyUp': function(callback){
      kuCallback = callback;
      document.addEventListener('keyup',  keyUp);
    }
  };

}();
