// http.js


const http = require('fetch');
const zlib = require('zlib');

async function tryRequest(url, httpOptions) {
	let results = {};
	try {
		results = await httpRequest(url, httpOptions);
		if (results.response.status >= 200 && results.response.status < 300){
			results.success = true;
			return results;

		} else {
			results.success = false;
			return results;
		}
			
	}
	catch(error) {
		// console.log(results)
		results.success = undefined;
		results.data = error;
		return results;
	}
}


function httpRequest(url, httpOptions) {

	httpOptions.payload = httpOptions.payload ? httpOptions.payload : '';
	httpOptions.rawPayload = httpOptions.payload;	
	if (httpOptions.headers['content-encoding'] == 'gzip'){
		httpOptions.payload = ( typeof httpOptions.payload == 'object' ) ? zlib.gzipSync(JSON.stringify(httpOptions.payload)) : zlib.gzipSync(httpOptions.payload.toString());
		httpOptions.payloadSize = Buffer.byteLength(httpOptions.payload);

	} else {
		httpOptions.payload = ( typeof httpOptions.payload == 'object' ) ? JSON.stringify(httpOptions.payload) : httpOptions.payload.toString();
	}

	let promise = new Promise ( (resolve, reject) => {
		http.fetchUrl(url, httpOptions, (error, meta, body) => {

			let results = {request: {url: url, meta: httpOptions}, response: (meta ? meta : {}) };
			if (error) {
				results.error = error;
				reject(results);
	
			} else {
				try {
					results.response.body = JSON.parse(body.toString());
				}
				catch(error) {
					results.response.body = {bodyAsString: body.toString()};
				}
				resolve(results);
			};
		});		
	});
	return promise;
}


module.exports.tryRequest = tryRequest;
module.exports.request = httpRequest;
