// _loader.js

const fs = require('fs');

let files = fs.readdirSync(`${__dirname}/`);
files.forEach( fileName => {
	if ( fileName.match(/\.js$/) && !fileName.match(/^_/) ){
		let name = fileName.replace(/\.js$/, '');
		exports[name] = require(`./${fileName}`);
	}
});