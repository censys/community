// index.js


const CensysDataApi = require('./api/DataApi.js');
const CensysSaasApi = require('./api/SaasApi_v1.js');
const CensysBigqueryApi = require('./api/BigqueryApi.js');


module.exports = class {
	constructor({
		api_id = '',
		api_secret = '',
		asm_api_key = '',
		catchErrors = true,
		userAgent = '',
		saas = {rootEndpoint: 'https://app.censys.io/api/v1', cookies: []},
		data = {rootEndpoint: 'https://censys.io/api/v1', cookies: []},
	})
	{
		this.api = {
			data: new CensysDataApi({
										api_id: `${api_id}`,
										api_secret: `${api_secret}`,
										catchErrors: catchErrors,
										userAgent: `${userAgent}`,
										rootEndpoint: `${data.rootEndpoint}`,
										cookies: data.cookies,
									}),

			saas: new CensysSaasApi({
										asm_api_key: `${asm_api_key}`,
										catchErrors: catchErrors,
										userAgent: `${userAgent}`,
										rootEndpoint: `${saas.rootEndpoint}`,
										cookies: saas.cookies,
									})
		};
	}
}