let validator = {};

validator.numToStr = function (num) {
    let returnValue;

    switch (num) {
        case '0':
            returnValue = 'zero';
            break;
        case '1':
            returnValue = 'one';
            break;
        case '2':
            returnValue = 'two';
            break;
        case '3':
            returnValue = 'three';
            break;
        case '4':
            returnValue = 'four';
            break;
        case '5':
            returnValue = 'five';
            break;
        case '6':
            returnValue = 'six';
            break;
        case '7':
            returnValue = 'seven';
            break;
        case '8':
            returnValue = 'eight';
            break;
        case '9':
            returnValue = 'nine';
            break;
    }

    return returnValue;
};

export default function getValidator() {
    return validator;
}