/** @module position */
let positions = [];

/** get positions for x, y, z coordinates */
function getPositions (nPos) {

}

function uniquePosition () {

}

function getX () {
	return Math.floor(Math.random() * (7)) - 3;
}

function getY () {
	return Math.floor(Math.random() * (7)) - 3;
}

function getZ () {
	return Math.floor(Math.random() * (4));
}

module.exports.getPositions = getPositions;
