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
	let isUnique = !(positions[index][0] === x && positions[index][1] === y && positions[index][2] === z);
	console.log(isUnique);
	return isUnique;
}

function getX () {
	return Math.floor(Math.random() * (7)) - 2;
}

function getY () {
	return Math.floor(Math.random() * (7)) - 2;
}

function getZ () {
	return Math.floor(Math.random() * (4));
}

export default getPositions;
