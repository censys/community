// rowsToString.js

const asTable = require('./asTable.js');
const csv = require('./csv.js');
const obj = require('./obj');

module.exports = async function rowsToString(rows, format = 'json'){

    let flat, stringOfRows;
 	switch (format) {
 		case 'json':
 			stringOfRows = JSON.stringify(rows, null, 2); 
            break;
             
 		case 'csv':
			flat = obj.flattenRows(rows);
 			stringOfRows = await csv.rowsToString(flat.rows, {...flat.headers});
            break;
             
 		case 'tsv':
			flat = obj.flattenRows(rows);
 			stringOfRows = await csv.rowsToString(flat.rows, {...flat.headers, delimiter: '\t'});
        	break;
         
 		default: // table
			flat = obj.flattenRows(rows);
			stringOfRows = asTable(flat.rows, {...flat.headers});
     }
     return stringOfRows;
        
}