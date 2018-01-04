import getValidator from './input_validator';
import getScoreInfo from './score';

let validator = getValidator();
let scoreInfo = getScoreInfo();

let scenerio = {};
let imageFamily = null;

//
// Select where to pick letters
//
let selecteImgFamily = function() {
    if (imageFamily !== null) {
        return imageFamily;
    }

    imageFamily = Math.floor(Math.random() * (3)) + 1;
    return imageFamily;
};

//
// Insert letter from the view
//
scenerio.insertLetter = function(letter, position) {

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

    image.setAttribute('src', 'img/f' + selecteImgFamily() + '/' + letter + '.png');
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
scenerio.removeLetter = function(letter) {
    let QuesFound = document.getElementById('QuesFound').innerHTML;
    let QuesPending = document.getElementById('QuesPending').innerHTML;
    let letToBeFound = null;

    if (QuesPending != null) {
        letToBeFound = QuesPending[0];

        if (letToBeFound !== letter.toLowerCase()) {
            console.log("Could not detect the letter");
            return;
        } else {
            document.getElementById('QuesPending').innerHTML = QuesPending.slice(1);
            document.getElementById('QuesFound').innerHTML = QuesFound + letToBeFound;
            if ((document.getElementById('QuesPending').innerHTML === '') || (QuesPending.length === 0)) {
                letToBeFound = null;
                setTimeout(function() {
                    document.getElementById('level2').click();
                }, 1000)
            }
        }
    }

    console.log("Voice input : " + letter);

    let elem = document.getElementById(letter.toLowerCase());

    if (elem !== null) {
        document.getElementById('explosion').components.sound.playSound();
        elem.parentNode.removeChild(elem);

        if (letToBeFound === null) {
            scoreInfo.incScore(1);
        }
    } else {
        console.log("Could not detect the letter");
    }
};

//
// Remove number from the view
//
scenerio.removeNumber = function(number) {
    console.log("Voice input : " + number);

    if (number.length == 1) {
        number = validator.numToStr(number);
    }

    let elem = document.getElementById(number.toLowerCase());

    if (elem !== null) {
        document.getElementById('explosion').components.sound.playSound();
        elem.parentNode.removeChild(elem);
        scoreInfo.incScore(1);
    } else {
        console.log("Could not detect the number");
    }
};

export default function getScenerio() {
    return scenerio;
}