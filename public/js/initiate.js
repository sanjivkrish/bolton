
//
// List of alphabets
//
var lettersList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

window.onload =  function() {
  //
  // Insert letter from the view
  //
  var insertLetter = function (letter, position) {
    //
    // Create <a-entity> element
    //
    var entity = document.createElement("a-entity");
    entity.setAttribute('id', letter);
    entity.setAttribute('random-spherical-position', 0);
    entity.setAttribute('random-position', 0);
    entity.setAttribute('random-color', 0);
    entity.setAttribute('annyang-voice-recognition');

    //
    // Create <a-animation> element
    //
    var animation = document.createElement("a-animation");
    animation.setAttribute('attribute', 'rotation');
    animation.setAttribute('from', '0 -30 -3');
    animation.setAttribute('to', '0 330 0');
    animation.setAttribute('dur', '15000');
    animation.setAttribute('easing', 'linear');
    animation.setAttribute('repeat', 'indefinite');

    //
    // Create <a-image> element
    //
    var image_box = document.createElement("a-box");
    image_box.setAttribute('src', 'img/' + letter + '.png');
    image_box.setAttribute('scale', '1.5 1.5 1.5');
    // image_box.setAttribute('position', position);


    var scene = document.getElementById('scene');

    entity.appendChild(animation);
    entity.appendChild(image_box);

    //
    // Insert element into DOM
    //
    scene.insertBefore(entity, scene.childNodes[0]);
  };

  //
  // Remove letter from the view
  //
  var removeLetter = function (letter) {
    console.log("Voice input : " + letter);

    var elem = document.getElementById(letter.toLowerCase());

    if (elem !== null) {
      elem.parentNode.removeChild(elem);
    } else {
      console.log("Could not detect the letter");
    }
  };

  //
  // Populate letters in the arena
  //
  var populateLetters = function () {
    let numberOfLetters = lettersList.length;
    let numberOfIterations = numberOfLetters * 50;
    let increment = 0;
    let positions = new Set();

    do {
      positions.add(generateRandomPosition())
      increment ++;
    } while(increment <= numberOfIterations);

    function generateRandomPosition(){
      let maxPositioning = numberOfLetters * 3;
      let minPositioning = 20;
      return Math.floor(Math.random()* maxPositioning)-minPositioning;
    }

    let uniquePositions = Array.from(positions);
    let coords = [];
    while(uniquePositions.length) coords.push(uniquePositions.splice(0,3));

    coords.forEach((axis, index) => {
      let position = axis[0] + ' ' + axis[1] + ' ' + axis[2];
      insertLetter(lettersList[index], position);
    });
  };

  //
  // Begin game
  //
  var startGame = function () {
    document.getElementById('container').outerHTML = '';
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
    populateLetters();
  };

  // Temperory function
  var startBtn = document.getElementById('start');
  startBtn.onclick = startGame;

  //
  // Receive voice input
  //
  if (annyang) {
    var commands = {
      'letter *let': removeLetter,
      'start the game': startGame
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
};
