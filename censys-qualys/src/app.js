// app.js


const load = require('./loader.js').load;
const reload = require('./loader.js').reload;


// create global application object _g and object (_g.require) to hold required modules and js files
global._g = {};

// All modules loaded via require go here
_g.require = {};

// array of module names, modify as needed
// ALWAYS load modules FIRST so subsequent code can use _g.require()
const modules = [
	'fs',
	'yargs-parser',
	'as-table',
	'chalk',
	'fast-csv',
	'yaml',
	'form-data',
	'fast-xml-parser',
];

// require modules and store in global object _g
for(let i in modules){
	_g.require[modules[i]] = require(modules[i]);
}

// special case: prompt-sync called separately to pass history module
_g.require.prompt = require('prompt-sync')({
	history: require('prompt-sync-history')(),
});

async function run(argv){

		const workflowName = argv._[0];
		let workflow = _g.workflows[workflowName];
		try {
			if ( !(workflow) || _g.app.devMode) {
				const workflowObject = _g.load('workflows', workflowName);
				workflow = new workflowObject[workflowName](workflowName);
				_g.workflows[workflowName] = workflow;
				await workflow.initialize();
			}
	
		} catch(error){
			return error;

		}
		await workflow.taskDispatch(argv);
}


function init(appArgs) {

	_g.configuration = load('resources/configuration');

	_g.templates = load('resources/templates');

	_g.help = load('resources/help');
	
	_g.components = load('components');

	_g.workflows = {};

	_g.app = {
		name: _g.configuration.app.name,
		version: _g.configuration.app.version,
		env: process.env,
		argv: process.argv,
		dir: `${__dirname}`,
		storage: {
			type: 'file',
			path: `${__dirname}/../storage`
		},
		devMode: (appArgs.devMode || appArgs.dev) ? true : false,
		interactive: (appArgs.run) ? false : true,
		runCommand: (appArgs.run) ? appArgs.run : '',
		settings: {},

	}

	if (appArgs.storage){
		let uri = appArgs.storage.split('://');
		_g.app.storage.type = uri[0];
		_g.app.storage.path = uri[1];
	}
	_g.app.storage.service = _g.components.storageService;
	
	_g.load = _g.app.devMode ? reload : load; // always reload when in dev mode

	_g.app.settings = getAppSettings(`${__dirname}/../settings.yaml`);

}

function getAppSettings(path){

	const fs = require('fs');
	const yaml = require('yaml');

	let settings = {};
 	try {
 	 	settings = yaml.parse(fs.readFileSync(path).toString());

 	} catch(error){
 		settings = {};

 	}
 	return settings;

}

module.exports.init = init;
module.exports.run = run;

