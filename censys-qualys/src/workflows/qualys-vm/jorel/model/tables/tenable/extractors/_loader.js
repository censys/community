// _loader.js

const fs = require('fs');

let files = fs.readdirSync(`${__dirname}/`);
files.forEach( fileName => {
	if ( fileName.match(/\.js$/) && !fileName.match(/^_/) ){
		let name = fileName.replace(/\.js$/, '');
		delete require.cache[require.resolve(`./${fileName}`)];
		exports[name] = require(`./${fileName}`);
	}
});