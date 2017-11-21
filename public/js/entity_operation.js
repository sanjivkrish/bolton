let scenerio = {};

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
scenerio.removeLetter = function(letter) {
    console.log("Voice input : " + letter);

    let elem = document.getElementById(letter.toLowerCase());

    if (elem !== null) {
        elem.parentNode.removeChild(elem);
    } else {
        console.log("Could not detect the letter");
    }
};

export default function getScenerio() {
    return scenerio;
}