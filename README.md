#Game Keys

A set of utilities that helps you to control keys for your HTML5 based CANVAS games,
not only for desktop browsers but mobile browsers too.

The utilities are:

* Mapping keys without worring about how the browser manage the keyCodes.
* Virtual keyboard for mobile browsers with only the keys your game uses.
* Allows keys log to manage the history of the keys that the player press.
* Allows register "special moves" or sequence of keys.


## How to use

You need an html page with a canvas element, add the **gkeys.js** file at the bottom 
of your page.

```html
<script src='gkeys.js'></script>
```

This creates a new object in your window object called **gKeys** that only interacts
with your canvas element.



## Mapping keys

Right now the library supports the arrows keys (**LEFT, UP, RIGHT, DOWN**) to manage 
movement and the spacebar (**SPACE**) as the action button.

You can manage two different key events: **keyDown** and **keyUp**. (optional)

A key is an object with the information about the state of the key:

```javascript
    var Key = function(){
        this.down = false;
        this.startTime = 0;
        this.finalTime = 0;
    };
```

The **key.down** is a boolean with the down state of the key, while the key is pressed 
the **key.down** will be true otherwise its value will be false.

The **key.startTime** is a timestamp value, that marks the time when the key has
been pressed.

The **key.finalTime** is a timestamp value, that marks the time when the key has
been released, its value returns to 0 when the key is pressed.

You can find the amoung of time in miliseconds a key were pressed subtracting the
**key.finalTime** - **key.startTime**.


### Key Down events

A keyDown event is triggered when a mapping key is pressed. To manage a keyDown event 
you need to pass a callback function that recieves the state of the keys as a json object:

```javascript
gKeys.keyDown(function(keys){
    console.log("key LEFT down: " + keys.LEFT.down);
    console.log("key LEFT startTime: " + keys.LEFT.startTime);
});
```

Right now you can access the following keys: 
* keys.LEFT
* keys.UP
* keys.RIGHT
* keys.DOWN
* keys.SPACE


### Key Up events

A keyup event is triggered when a mapping key is released. and works like the keyDown event:

```javascript
gKeys.keyUp(function(keys){
    console.log("key LEFT up: " + !keys.LEFT.down);
    console.log("key LEFT final Time: " + keys.LEFT.finalTime);
    console.log("key LEFT total pressed time: " + (keys.LEFT.finalTime - keys.LEFT.startTime));
});
```

## Virtual Keyboard

For mobile browsers the **gKeys** library provides a fallback function that draws a 
virtual keyboard that works with touch events without any additional configuration.

If you want to display a simple virtual keyboard you need to add the **gkeys.css**
stylesheet, but you are free to create your own style for the virtual keyboard.

```html
<link rel='stylesheet' href='gkeys.css'>
```

## Keys Log History

In some games is pretty useful to get a log history with the keys that are pressed to allow 
special moves or easter eggs. **gKeys** has an attribute that has the record of a 
certain number of keys that are released by the user.

A key is stored in **gKeys.history** (the log history) when the user releases the key (or the keys). 
Every register in the log is an object whose attributes are the names of the released 
keys, and its ordered by the most recent.

for example:

```javascript
[{SPACE:100}, {LEFT:90}, {DOWN:70}, {LEFT:60, UP:60}]
```

The log history has a maximun of 10 keys allowed in the history array and every keys allowed
lives in the log history for a 1000 miliseconds.

for example: if you pressed the DOWN key the DOWN key will be stored in the log history, 
1000 miliseconds later this log will be destroyed.


### Configuration

If you need to manage more elements in the history modify the **maxHistory** property
in the library (I have pending a configuration params)

Likewise if you want to allow your history for more time, modify the **maxTime** 
property in the library.

Finally if you don't want to use the history capabilities you can disable it, modifying 
the **allowsHistory** property to false in the library.


## Special moves

Finally this library allows you to manage special move events, register a
move (keys sequence) and a callback function to manage the event, you can add so many
moves as you like.

```javascript
gKeys.registerMove(['DOWN', 'RIGHT', 'SPACE'], function(){
    console.log("HADOUKEN!!!!");
});
```

### Configuration

**allowsHistory** must be **true**


## Example

I have an example of how it works in the index.html file of this project and a live
demo in [agar3s.github.io/game_keys](http://agar3s.github.io/game_keys/ "demo")

It shows: the keys mapping, the keys history and three especial moves:
* Hadouken: ↓ → ♥
* Shoryuken: → ↓ → ♥
* the konami code


