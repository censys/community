// cli.js


const app = require('./src/app.js');

const parser = _g.require['yargs-parser'];
const prompt = _g.require.prompt;

async function cli(){

	const appArgs = parser(process.argv);
	// set storage in home directory if not passed from command line
	if(process.argv.storage == undefined){
		appArgs.storage = `file:///${process.env.HOME}/censys`;
	}

	app.init(appArgs);

	do {
		const input = prompt(`${_g.app.name}-> `);

		if ( /^ *exit *$/.test(input) ) break;

		let argv = parser(input);

		try {
			await app.run(argv);

		} catch(error){
			console.log(error);
			
		}

	}
	while (true)
}


cli();




