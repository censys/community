// asTable.js

const asTable = require('as-table');

module.exports = function (arrayOfObjects, arrayOfColumns) {

	if ( arrayOfObjects.length == 0 ) return '';

	if ( !(arrayOfColumns) ) return asTable(arrayOfObjects);

	let resArrayOfObjects = [];
	for(let i in arrayOfObjects){
		let resObject = {};
		for(let j in arrayOfColumns){
			column = arrayOfColumns[j];
			resObject[column] = arrayOfObjects[i][column];
		}
		resArrayOfObjects.push(resObject);
	}
	return asTable(resArrayOfObjects);
}
