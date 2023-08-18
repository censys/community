// http.js

const http = require('fetch');
const zlib = require('zlib');

async function tryRequest(url, httpOptions, rateLimit) {
	let results;
	for (let attempt = 0; attempt < rateLimit.maxAttempts; attempt++){
		try {
			results = await httpRequest(url, httpOptions);
	
			if (results.response.status >= 200 && results.response.status < 300){
				results.success = true;
				results.request.curl = asCurl(url, httpOptions);
				results.data = results.response.body.results ? results.response.body.results : results.response.body;

			} else {
				results.success = false;
				results.request.curl = asCurl(url, httpOptions);
				// special case for 404 since censys.io/api/v1 returns HTML instead of error object, otherwise return error object from response body
				results.data = results.response.status == 404 ? {error_code: '404', error:'not found'} : results.response.body;
	
			}
			if (results.response.status == 429){ // exceeded rate limit, so sleep and try again
				console.log('we hit the rate limit')
				await sleep(rateLimit.delay)
	
			} else {
				break;
			}
		
		}
		catch(results) {
			results.success = undefined;
			results.data = results.error;
			console.log('error results:', results);
			// return results;
		}
	}
	return results;
	
}


function httpRequest(url, httpOptions) {

	httpOptions.payload = httpOptions.payload ? httpOptions.payload : '';
	httpOptions.payload = (typeof httpOptions.payload == 'object') ? JSON.stringify(httpOptions.payload) : httpOptions.payload.toString();
	httpOptions.rawPayload = httpOptions.payload;
	if (httpOptions.headers['content-encoding'] == 'gzip' && httpOptions.payload){
		httpOptions.payload = zlib.gzipSync(httpOptions.payload);
		httpOptions.payloadSize = Buffer.byteLength(httpOptions.payload);
	}

	let promise = new Promise ( (resolve, reject) => {
		http.fetchUrl(url, httpOptions, (error, meta, body) => {
			let results = {request: {url: url, meta: httpOptions}, response: (meta ? meta : {}) };
			if (error) {
				results.error = error;
				reject(results);
	
			} else {
				try {
					results.response.rawBody = body;
					// results.response.body = (body.length > 10*1024*1024) ? { warning: 'object size is excessive'} : JSON.parse(body.toString());
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


function asCurl(url, httpOptions){

	let curl = `curl -X ${httpOptions.method}`;
	curl += ` \\\n'${url}'`
	for ( let i in httpOptions.headers ){
		curl += (i != 'content-encoding') ? ` \\\n-H '${i}: ${httpOptions.headers[i]}'`: '';
	}
	curl += ( httpOptions.rawPayload == '' ) ? '' : ` \\\n-d ${httpOptions.rawPayload}`;
	return curl;
}

function sleep(ms) {
	return new Promise( resolve => {
		setTimeout(resolve, ms);
	})
}

module.exports.tryRequest = tryRequest;
module.exports.request = httpRequest;
