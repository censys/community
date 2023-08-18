// csv.js

const csv = require('fast-csv');
const fs = require('fs');

function toRows(csvFile){
	let csvArray = [];
	let csvPromise = new Promise( (resolve, reject) => {
		csv.parseFile(csvFile, {headers: true, trim: true })
			.on('error', error => console.error(error))
			.on('data', row => { csvArray.push(row) })
			.on('data-invalid', (row, rowNumber, reason) => { console.log(`${rowNumber}`)})
			.on('end', rowCount => { resolve(csvArray) })
	});
	return csvPromise;
}

function rowsToString(csvArray, options = {}){
	options.headers = (options.headers == undefined) ? true : options.headers;
	return csv.writeToString(csvArray, options);
}

function rowsToFile(csvArray, csvFile){
	fs.existsSync(csvFile) ? fs.unlinkSync(csvFile) : false;
	let csvPromise = new Promise( (resolve, reject) => {
		csv.writeToPath(csvFile, csvArray, { headers: true })
			.on('error', error => console.error(error))
			.on('finish', () => { resolve() })
	});
	return csvPromise;
}


module.exports.toRows = toRows;
module.exports.rowsToString = rowsToString;
module.exports.rowsToFile = rowsToFile;
