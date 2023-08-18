// _default.js

// default extractor for use when an extractor isn't defined
//   all keys are extracted except for those starting with _ (underscore)

module.exports = function (table, extractArray){

	let db = table._db;
	let column = table._tableSchema.column;

	let rowObj = {};
	for(let i in column){
		/^_/.test(column[i]) ? {} : rowObj[column[i]] = table.row[column[i]];
	
	}
	extractArray.push(rowObj);
	
}
