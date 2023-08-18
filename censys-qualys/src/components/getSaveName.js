// getSaveName.js

// saveAs and save may be undefined or boolean as they are expected to come from command line switches

module.exports = function (saveAs, save, defaultName = 'defaultName', delimiter = '-'){

	if ( saveAs == undefined && save == undefined ) return ''; // if both are undefined, then return empty string

	saveAs = saveAs ? saveAs : save;  // if saveAs is passed by cli, then use it otherwise use save
	
 	let saveName = (typeof saveAs != 'string') ? makeUnique(defaultName, delimiter)
 	: saveAs ? saveAs
 	: makeUnique(defaultName, delimiter)

 	return saveName;
}

function makeUnique(baseValue, delimiter){
	let uniqueString = `${baseValue}${delimiter}${Date.now()}`;
	return uniqueString;
}
