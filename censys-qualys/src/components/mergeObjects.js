// mergeObjects.js


module.exports = function mergeObjects(...objArray){
	
	let target = {};
	for(let i in objArray){
		target = merge2(target, objArray[i]);
	}
	return target;
}

function copyObject(obj){
	return mergeObjects(obj);
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
	return obj1
}



// module.exports.mergeObjects = mergeObjects;
// module.exports.copyObject = copyObject;
