// mergeObjects.js


function merge(...objArray){
	
	let target = {};
	for(let i in objArray){
		target = merge2(target, objArray[i]);
	}
	return target;
}

function merge2(obj1, obj2){
	for(let key in obj2){
		if(typeof obj2[key] == 'object'){
			obj1[key] = obj1[key] ? obj1[key] : {};
			obj1[key] = Array.isArray(obj2[key]) ? [...obj2[key]] : merge2(obj1[key], obj2[key]);
		
		} else {
			obj1[key] = obj2[key];
		}	
	}
	return obj1;
}

function flatten(obj, prevKey='', newObj={}){

	for(let key in obj){
		
		let newKey = prevKey ? `${prevKey}.${key}` : `${key}`;
		if(typeof obj[key] == 'object'){
			newobj = {...newObj, ...flatten(obj[key], newKey, newObj) };
			
		} else {
			newObj[newKey] = obj[key];
			
		}
	}
	
	return newObj;
}

function flattenRows(rows){
	let newRows = [];
	let headers = [];
	for(let i in rows){
		let flatRow = flatten(rows[i]);

		let keys = Object.keys(flatRow);
		headers = [...new Set([...headers, ...keys])];
		
		newRows.push(flatRow);
	}
	return {rows: newRows, headers: headers};
}

function copy(obj){
	return mergeObjects(obj);
}



module.exports.merge = merge;
module.exports.flatten = flatten;
module.exports.flattenRows = flattenRows;
module.exports.copy = copy;

