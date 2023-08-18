// loader.js

const fs = require('fs');

function load(collection, ...items){
	return loader(true, collection, ...items);
}

function reload(collection, ...items){
	return loader(false, collection, ...items);

}

function loader(useCache, collection, ...items){

	try {
		let collectionDir = collection.match(/^\//) ? collection : `${__dirname}/${collection}`; // use full path if given, otherwise it's relative to app directory

		if ( fs.statSync(`${collectionDir}`).isFile() ){
			delete require.cache[require.resolve(`${collectionDir}`)];
			return require(collectionDir);
		}
	
		let dirList = (items.length == 0) ? fs.readdirSync(`${collectionDir}`) : items; // use items passed or obtain from the directory listing
		loadList = dirList.filter( dirItem => !(/^_|^\./.test(dirItem)) ); // filter out file objects that begin with "." or "_"
	
		let loadObj = {};
		let name = '';
		for(let i in loadList){
			let loadPath = `${collectionDir}/${loadList[i]}`;
			if (fs.statSync(`${loadPath}`).isDirectory()){
				loadPath += '/index.js';
				name = loadList[i];
	
			} else {
				name = loadList[i].replace(/\.jso?n?$/, '');
			}
			loadObj[name] = loadPath;
		}
		let collectionObj = {};
		for (let name in loadObj){
			if (!useCache){
				// console.log(`no cache: ${loadObj[name]}`)
				delete require.cache[require.resolve(`${loadObj[name]}`)];
			}
			collectionObj[name] = require(loadObj[name]);
		}
		return collectionObj;

	}
	catch(error) {
		// should log missing collections here
		// if(_g.app.interactive) { 'loader error: ', console.log(err) };
		// if (_g.app.devMode && error.code != 'ENOENT') console.log('loader error', error);
		if (error.code != 'ENOENT') console.log('loader error', error);
		return {};
	}
}

module.exports.load = load;
module.exports.reload = reload;
