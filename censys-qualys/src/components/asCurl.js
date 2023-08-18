// asCurl.js


module.exports = function asCurl(url, httpOptions){

	let curl = `curl -X ${httpOptions.method}`;
	curl += ` \\\n${url}`
	for ( let i in httpOptions.headers ){
		curl += ` \\\n-H '${i}: ${httpOptions.headers[i]}'`
	}
	curl += ( httpOptions.rawPayload == '' ) ? '' : ` \\\n-d ${httpOptions.rawPayload}`;

	return curl;
}

