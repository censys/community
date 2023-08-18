// SaasApi.js


const censysHttp = require('./http.js');

module.exports = class {
	constructor({
		asm_api_key,
		catchErrors = true,
		rootEndpoint = 'https://app.censys.io/api/v1',
		cookies = [],
		userAgent = 'censys-api-engine/0.0',
		rateLimit = {delay: 10000, maxAttempts: 7},
	})

	{
		const httpRequest = catchErrors ? censysHttp.tryRequest : censysHttp.request;

		let defaultHeaders = {
						'content-type': 'application/json',
						'content-encoding': 'gzip',
						'censys-api-key': `${asm_api_key}`,
						'cache-control': 'no-cache',
						'user-agent': `${userAgent}`,
		};


		this.userAgent = `${userAgent}`;

		this.getAssetsHosts = () => 
			httpRequest(`${rootEndpoint}/assets/hosts`, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies,
				},
				rateLimit
			);

		this.setAssetsHostsTag = (ip, tag, color='FFFFFF') => 
			httpRequest(`${rootEndpoint}/assets/hosts/${ip}/tags`, {
				method: 'POST',
				headers: {...defaultHeaders},
				cookies: cookies,
				// payload: {name: `${tag}`, color: `${color}`},
				payload: {name: `${tag}`},
				},
				rateLimit
			);

		this.getLogbookCursor = (payload = {filter:{}, idFrom: 0}) => 
			httpRequest(`${rootEndpoint}/logbook-cursor`, {
				method: 'POST',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: payload
				},
				rateLimit
			);

		this.getLogbookData = (cursorObj = {cursor: ''}) =>
			getLogbookData(httpRequest, `${rootEndpoint}/logbook`, cursorObj, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies
				},
				rateLimit
			);
			
		this.postSeeds = (payload = { seeds: [], ignoreErrorCodes: [] }) => 
			httpRequest (`${rootEndpoint}/seeds`, {
				method: 'POST',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: payload
				},
				rateLimit
			);

		this.putSeeds = (payload = { seeds: [] }, queryObj = {}) => {
			const query = queryParamsOf(queryObj);
			return httpRequest (`${rootEndpoint}/seeds${query}`, {
				method: 'PUT',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: payload
				},
				rateLimit
			);
		}


		this.getSeeds = (queryObj = '') => {
			let query;
			if ( typeof queryObj == 'object' ){
				query = queryParamsOf(queryObj);
			} else {
				query = (queryObj) ? `/${queryObj}` : '';
			}	
			return httpRequest (`${rootEndpoint}/seeds${query}`, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);
		}
			
		this.deleteSeedsLabel = (label = {}) => {

			let query = ( typeof label == 'object' ) ? queryParamsOf(label) : queryParamsOf({label: label});

			// let query = queryParamsOf( {label: label} );
			return httpRequest (`${rootEndpoint}/seeds${query}`, {
				method: 'DELETE',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);
		}

		this.getSeedId = (id = '') => 
			httpRequest (`${rootEndpoint}/seeds/${id}`, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);

		this.deleteSeedId = (id) => {
			return httpRequest (`${rootEndpoint}/seeds/${id}`, {
				method: 'DELETE',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);
		}

		this.getAssetIp = (ip = '') => 
			httpRequest (`${rootEndpoint}/assets/hosts/${ip}`, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);

		this.getAssetCertificate = (sha256 = '') => 
			httpRequest (`${rootEndpoint}/assets/certificates/${sha256}`, {
				method: 'GET',
				headers: {...defaultHeaders},
				cookies: cookies,
				payload: ''
				},
				rateLimit
			);
	}
}

function queryParamsOf(paramsObj = {}){

	let tmp = [];
	for (let key in paramsObj){
		if (paramsObj[key]){
			tmp.push(`${key}=${paramsObj[key]}`);
		}
	}
	let queryString = tmp.length > 0 ? `?${tmp.join('&')}` : '';
	return queryString;

}

async function getLogbookData(httpRequest, url, cursorObj, httpOptions, rateLimit) {

	let results = {};
	let cursor = queryParamsOf(cursorObj);
	let data = [];
	try {
		do {
			results = await httpRequest(`${url}${cursor}`, httpOptions, rateLimit);

			if (!results.success) throw 'error';

			data = [...data, ...results.data.events];

			cursor = queryParamsOf({cursor: results.response.body.nextCursor});

		} while (results.response.body.endOfEvents == false);

		results.data = data;
		return results;
	}
	catch(error) {
		return results;

	}
}





















