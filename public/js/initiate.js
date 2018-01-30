import getScenerio from './entity_operation';
import getPosition from './posistion';

let scenerio = getScenerio();

//
// List of alphabets
//
let lettersList = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let numbersList = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'
];

// Custome made endpoint to fetch question from GSHEET
let queEndpoint = 'https://bolton-wort.herokuapp.com/words/';

//
// Populate letters in the arena
//
let populateLetters = function() {
    let entityList = lettersList.concat(numbersList);
    let positionList = [];
    entityList.forEach((item, index) => {
        let elem = document.getElementById(item);

        // Clear all UI elements
        if (elem !== null) {
            elem.parentNode.removeChild(elem);
        }

        positionList[index] = getPosition(positionList, index);
    });

    let scene = document.getElementById('scene');

    entityList.forEach(function(entity, index) {
        scenerio.insertLetter(entity, positionList[index].join(' '));
    });

};

// Make Async HTTp req
let  httpGetAsync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);

    xmlHttp.send(null);
};

//
// Populate Question in the arena
//
let insertQuestion = function() {
    // Set question
    // document.getElementById('QuesFound').innerHTML = '';
    // document.getElementById('QuesPending').innerHTML = 'sample';

    // Make HTTP request to REST api
    httpGetAsync(queEndpoint, function (res) {
        let quesArray = JSON.parse(res);
        let selectedQuestionPos = Math.floor(Math.random() * (quesArray.length));
        let selectedQuestion = quesArray[selectedQuestionPos];

        // Set question
        document.getElementById('QuesFound').innerHTML = '';
        document.getElementById('QuesPending').innerHTML = selectedQuestion.toLowerCase();

        // Start generating letters in the UI
        // startGame();
    });
};

//
// Begin game
//
let startGame = function() {
    document.getElementById('container').style.zIndex = -1;
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
    populateLetters();
};

//
// Go to level 2
//
let startlevel2 = function() {
    document.getElementById('question').style.zIndex = 'auto';
    insertQuestion(queEndpoint);
    startGame();
};

//
// Choose random background image
//
let chooseBgImg = function() {
    let scene = document.getElementById('scene');
    let sky = document.createElement("a-sky");

    sky.setAttribute('src', 'img/bg/' + (Math.floor(Math.random() * (3)) + 1) + '.jpg');
    sky.setAttribute('rotation', '0 -130 0');

    scene.appendChild(sky);
};

window.onload = function() {
    // Choose random Background image
    chooseBgImg();

    // Temperory function
    let startBtn = document.getElementById('start');
    startBtn.onclick = startGame;

    // Level1
    let level1Btn = document.getElementById('level1');
    level1Btn.onclick = startGame;

    // Level2
    let level2Btn = document.getElementById('level2');
    level2Btn.onclick = startlevel2;

    //
    // Receive voice input
    //
    if (annyang) {
        let commands = {
            'letter *let': scenerio.removeLetter,
            'number *num': scenerio.removeNumber,
            'Level one': startGame,
            'Level two': startlevel2,
            'start game': startGame
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        annyang.setLanguage('en-IN');

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start({ autoRestart: true, continuous: false });
    }
};