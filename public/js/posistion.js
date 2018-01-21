/** @module position */

/** get positions for x, y, z coordinates */
function getPositions (positions, index) {
	let isGen = true;
	index = index - 1;
	do {
		let x = getX();
		let y = getY();
		let z = getZ();
		let init = positions.length;
		if( init === 0) {
			return [x, y, z];
		}

		if(uniquePosition(positions, index, x, y, z)){
			isGen = false;
			return [x, y, z];
		}
	} while(isGen)
}

function uniquePosition (positions, index, x, y, z) {
	let len = positions.length;

	var hash = {};

	for (var i = 0; i < len; i++) {
		hash[positions[i]] = i;
	}

	return !hash.hasOwnProperty([x, y, z]);
}

function getX () {
	return Math.floor(Math.random() * (7)) - 2;
}

function getY () {
	return Math.floor(Math.random() * (4));
}

function getZ () {
	return Math.floor(Math.random() * (7)) - 2;
}

export default getPositions;
