//
// List of alphabets
//
let lettersList = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let numbersList = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];

//
// Insert letter from the view
//
let insertLetter = function(letter, position) {
    //
    // Create <a-entity> element
    //
    let entity = document.createElement("a-entity");
    let scene = document.getElementById('scene');

    //
    // Create <a-animation> element
    //
    let animation = document.createElement("a-animation");

    //
    // Create <a-image> element
    //
    let image = document.createElement("a-image");

    entity.setAttribute('id', letter);
    entity.setAttribute('position', position);

    animation.setAttribute('attribute', 'rotation');
    animation.setAttribute('from', '0 -30 -3');
    animation.setAttribute('to', '0 330 0');
    animation.setAttribute('dur', '15000');
    animation.setAttribute('easing', 'linear');
    animation.setAttribute('repeat', 'indefinite');

    image.setAttribute('src', 'img/f1/' + letter + '.png');
    image.setAttribute('scale', '0.25 0.25 0.25');


    entity.appendChild(animation);
    entity.appendChild(image);

    //
    // Insert element into DOM
    //
    scene.insertBefore(entity, scene.childNodes[0]);
};

//
// Remove letter from the view
//
let removeLetter = function(letter) {
    console.log("Voice input : " + letter);

    let elem = document.getElementById(letter.toLowerCase());

    if (elem !== null) {
        elem.parentNode.removeChild(elem);
    } else {
        console.log("Could not detect the letter");
    }
};

let generateRandomPosition = function(number) {
    let entriesPerSide = number / 4;
    let positionList = [];

    for (var i = 0; i < number; i++) {
        positionList[i] = [];

        positionList[i][0] = Math.floor(Math.random() * (7)) - 3;
        positionList[i][1] = Math.floor(Math.random() * (7)) - 3;
        positionList[i][2] = Math.floor(Math.random() * (7)) - 3;
    }

    return positionList;
};

//
// Populate letters in the arena
//
let populateLetters = function() {
    let entityList = lettersList.concat(numbersList);
    let positionList = generateRandomPosition(entityList.length);

    entityList.forEach(function(entity, index) {
        insertLetter(entity, positionList[index].join(' '));
    });

};

//
// Begin game
//
let startGame = function() {
    document.getElementById('container').outerHTML = '';
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
    populateLetters();
};

window.onload = function() {
    // Temperory function
    let startBtn = document.getElementById('start');
    startBtn.onclick = startGame;

    //
    // Receive voice input
    //
    if (annyang) {
        let commands = {
            'letter *let': removeLetter,
            'startGame': startGame
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
    }
};