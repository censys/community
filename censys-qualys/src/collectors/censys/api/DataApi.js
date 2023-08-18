// DataApi.js


const censysHttp = require('./http.js');

module.exports = class {
	
	constructor({
		api_id = '',
		api_secret = '',
		catchErrors = true,
		rootEndpoint = 'https://censys.io/api/v1',
		userAgent = 'censys-api-engine/0.0',
		rateLimit = {delay: 30000, maxAttempts: 10},
	})

	{
		const httpRequest = catchErrors ? censysHttp.tryRequest : censysHttp.request;

		let defaultHeaders = {
						'content-type': 'application/json',
						'authorization': '',
						'cache-control': 'no-cache',
						'user-agent': `${userAgent}`,
					}

		// compute Authorization header from id and secret
		const buf = Buffer.from(`${api_id}:${api_secret}`, 'ascii');
		defaultHeaders.authorization = `Basic ${buf.toString('base64')}`;

		this.userAgent = userAgent;

		this.search = (index, payload = '') =>
			httpRequest(`${rootEndpoint}/search/${index}`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.multiPageSearch = (index, payload, startPage, numPages) => {
			return catchErrors ? multiPageSearch(this, index, payload, startPage, numPages) : { error: 'catchErrors must be true to use multiPageSearch.'};
		};

		this.searchFieldByArray = (index, field, valuesArray, payload, chunk) => {
			return catchErrors ? searchFieldByArray(this, index, field, valuesArray, payload, chunk) : { error: 'catchErrors must be true to use searchFieldByArray.'};
		};

		this.bulk = (index, payload = '') => 
			httpRequest(`${rootEndpoint}/bulk/${index}`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		this.bulkCertificates = this.bulkCerts = async (certsArray, chunk) => multiBulkCerts(this, certsArray, chunk);

		this.view = (index, id) =>
			httpRequest(`${rootEndpoint}/view/${index}/${id}`, {
				method: 'GET',
				headers: {...defaultHeaders},
				payload: ''
			});
	
		this.report = (index, payload = '') =>
			httpRequest(`${rootEndpoint}/report/${index}`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});
	
		this.series = this.rawData = {};
			this.series.get = () =>
				httpRequest(`${rootEndpoint}/data`, {
					method: 'GET',
					headers: {...defaultHeaders},
					payload: ''
				});

			this.series.view = (series) =>
				httpRequest(`${rootEndpoint}/data/${series}`, {
					method: 'GET',
					headers: {...defaultHeaders},
					payload: ''
				});

			this.series.result = (series, result) =>
				httpRequest(`${rootEndpoint}/data/${series}/${result}`, {
					method: 'GET',
					headers: {...defaultHeaders},
					payload: ''
				});
	
		this.account = () =>
			httpRequest(`${rootEndpoint}/account`, {
				method: 'GET',
				headers: {...defaultHeaders},
				payload: ''
			});
	}
}

async function multiPageSearch(censysDataApi, index, payload, startPage = 1, numPages = 0) {

	let data = [];
	let pagedResults = [];
	try {
		payload.page = startPage;
		let results = await censysDataApi.search(index, payload);
		data = results.data;
		results.page = startPage;
		pagedResults.push(results);

		if (!results.success) throw 'error';
		
		let totalPages = results.response.body.metadata.pages;
		let endPage = (numPages == 0 ? totalPages : Math.min(startPage+numPages-1, totalPages));

		for (let i = startPage+1; i <= endPage; i++) {
			payload.page = i;
			let results = await censysDataApi.search(index, payload);

			data = [...data, ...results.data];
			results.page = i;
			pagedResults.push(results);

			if (!results.success) throw 'error';

		}
		return { success: true, data: data, totalPages: totalPages, pagedResults: pagedResults };


	}
	catch(error) {
		return { success: false, data: data, pagedResults: pagedResults };

	}
}


async function searchFieldByArray(censysDataApi, index, field, valuesArray, payload = {}, chunk = 20){

	let data = [];
	let queryValues = valuesArray.filter( n => n ); // eliminate null, undefined, and empty array elements
	queryValues = [...new Set(queryValues)]; // eliminate duplicates
	try {
		for ( let i = 0; i < valuesArray.length; i += chunk ){
			let searchArray = queryValues.slice(i, i+chunk);
			payload.query = `${field}: (` + searchArray.join(' or ') + ')';
			let results = await censysDataApi.multiPageSearch(index, payload);
			data = [...data, ...results.data];
		}
		return { success: true, data: data };

	}
	catch(error) {
		return { success: false, data: data };

	}	
}

async function multiBulkCerts(censysDataApi, certsArray, chunk=50){
	let certs = certsArray.filter( n => n ); // eliminate null, undefined, and empty array elements
		certs = [...new Set(certsArray)]; // eliminate duplicates
		let data = {};
		try{
			for ( let i = 0; i < certs.length; i += chunk ){
				let results = await censysDataApi.bulk('certificates', { fingerprints: certs.slice(i, i+chunk) } );
				data = {...data, ...results.data}
			}
			return { success: true, data: data };

		} catch(error) {
			return { success: false, data: data };
		}	
}

