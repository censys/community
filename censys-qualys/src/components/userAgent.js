// userAgent.js


module.exports = function userAgent(integrationName){

	return `${_g.app.name}/${_g.app.version} (workflow: ${integrationName})`;

}

