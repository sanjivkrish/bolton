//
// Return posistion array
//
export default function getPosition(number) {
    let positionList = [];

    for (var i = 0; i < number; i++) {
        positionList[i] = [];

        positionList[i][0] = Math.floor(Math.random() * (7)) - 3;
        positionList[i][1] = Math.floor(Math.random() * (4));
        positionList[i][2] = Math.floor(Math.random() * (7)) - 3;
    }

    return positionList;
}