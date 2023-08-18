// index.js

const {http} = _g.components;
const FormData = _g.require['form-data'];

module.exports = class {

	constructor({
		qualys_username = '',
		qualys_password = '',
		catchErrors = true,
		qualys_api_url = ''
	})
	{
		const httpRequest = catchErrors ? http.tryRequest : http.request;

		let defaultHeaders = {
						'cache-control': 'no-cache',
						'user-agent': 'censys-qualys/1.0',
						'X-Requested-With': 'censys-qualys/1.0',
						'authorization': '',
					};

		// compute Authorization header from username and password
		const buf = Buffer.from(`${qualys_username}:${qualys_password}`, 'ascii');
		defaultHeaders.authorization = `Basic ${buf.toString('base64')}`;

		this.addIps = (ips = []) => {
			const form = new FormData();
 			form.append('action', 'add');
 			form.append('enable_vm', '1');
 			form.append('ips', ips.join());
			
			const payload = form.getBuffer().toString();
			const boundary = form.getBoundary();
			defaultHeaders['content-type'] = `multipart/form-data; boundary=${boundary}`;

			return httpRequest(`${qualys_api_url}/api/2.0/fo/asset/ip/`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});
		}

		this.excludeIps = (ips = [], comment = 'censys_asm') => {
			const form = new FormData();
 			form.append('action', 'add');
 			form.append('comment', comment);
 			form.append('ips', ips.join());
			
			const payload = form.getBuffer().toString();
			const boundary = form.getBoundary();
			defaultHeaders['content-type'] = `multipart/form-data; boundary=${boundary}`;

			return httpRequest(`${qualys_api_url}/api/2.0/fo/asset/excluded_ip/`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		}

		this.listIps = () => {
			const form = new FormData();
 			form.append('action', 'list');
			
			const payload = form.getBuffer().toString();
			const boundary = form.getBoundary();
			defaultHeaders['content-type'] = `multipart/form-data; boundary=${boundary}`;

			return httpRequest(`${qualys_api_url}/api/2.0/fo/asset/ip/`, {
				method: 'POST',
				headers: {...defaultHeaders},
				payload: payload
			});

		}
	}
}

