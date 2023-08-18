// showHelp.js

const asTable = require('as-table');

module.exports = function showHelp(workflow, taskName){

	if(workflow.help[`${taskName}`]){
		console.log(helpToString(workflow.help[`${taskName}`]));
		return;
	}

	if(workflow.help['index']){
		console.log(helpToString(workflow.help['index']));
		return;
	}

	console.log();
	console.log('Help is not available for this workflow or task.');
	console.log();
	
}

function helpToString(helpObj){
	let string = arrayLinesToString(helpObj.Summary);
	string += `\n`+asTable(helpObj.Options)+`\n`;
	string += arrayLinesToString(helpObj.Footer);
	return string;

}

function arrayLinesToString(arrayLines){
	let string = `\n`;
	for(let i of arrayLines){
		string += `  ${i}\n`;
	}
	return string;
}
