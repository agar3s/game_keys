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

    var isMobile = function(){
      var regexp1 = new RegExp("/(android|bb\d+|meego).+mobile|avantgo|bada\/"+
                "|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)"+
                "|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?"+
                "|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\."+
                "(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i");
      var regexp2 = new RegExp("/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|"+
                "a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)"+
                "|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)"+
                "|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-"+
                "|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi"+
                "|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8"+
                "|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo"+
                "|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)"+
                "|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)"+
                "|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a"+
                "|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)"+
                "|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)"+
                "|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do"+
                "|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)"+
                "|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph"+
                "|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))"+
                "|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a"+
                "|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)"+
                "|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|"+
                "47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)"+
                "|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)"+
                "|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9"+
                "|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40"+
                "|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|"+
                "wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i");
      return regexp1.test(navigator.userAgent||navigator.vendor||window.opera)||
      regexp2.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4));
    };

    (function init(){
      canvas = document.getElementsByTagName('canvas')[0];
      canvas.setAttribute('tabIndex', 1);
      canvas.addEventListener('keydown',  keyDowns);
      canvas.addEventListener('keyup',  keyUps);
      canvas.focus();

      if(isMobile()){
        //load virtual keyboard
        var virtualKeyboard = document.createElement('div');
        virtualKeyboard.id="virtualKeys";
        virtualKeyboard.innerHTML = '<button id="vk_space">SPACE</button>'+
                               '<button id="vk_up">UP</button>'+
                               '<button id="vk_down">DOWN</button>'+
                               '<button id="vk_left">LEFT</button>'+
                               '<button id="vk_right">RIGHT</button>';
        document.body.appendChild(virtualKeyboard);

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