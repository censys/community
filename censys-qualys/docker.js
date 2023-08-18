// index.js

const app = require('./src/app.js');
const parser = _g.require['yargs-parser'];


async function main(){

	let appArgs = {
			devMode: ( process.env['CENSYS_RUN_ONCE'] == 1 ),
			interactive: false,
		}

	// await sleep(3000); // de-jitter time if other services need time to come up

	app.init(appArgs);

	const run = _g.app.settings.censys.run;

	for (let i in run){
		const command = _g.configuration.commands[run[i].command];
		if (command){
			let argv = {
				_: command.split(' '),
				...run[i].options
			}
	
			if (run[i].startup || _g.app.devMode){
				await app.run(argv);
			}

			if (run[i].interval && !(_g.app.devMode)){ // need a random variation in time to avoid running commands at the same time
				setInterval(app.run, run[i].interval*60*1000, argv);
			}
			
		}
	}
}


function sleep(ms) {
	return new Promise( resolve => {
		setTimeout(resolve, ms);
	})
}


main();
