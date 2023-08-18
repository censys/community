// httpStatusCategory.js


module.exports = function (httpStatusCode) {
	
	let category = 'Unknown Error';
	let subcategory = '';
	
	if (httpStatusCode >= 100 && httpStatusCode < 200){
		category = 'Informational';
	};


	if (httpStatusCode >= 200 && httpStatusCode < 300) {
		category = 'Success';
		switch (httpStatusCode){
			case 200: subcategory = 'OK'; break;
			case 201: subcategory = 'Created'; break;
			case 204: subcategory = 'No Content'; break;
		}
	}

	if (httpStatusCode >= 300 && httpStatusCode < 400) {
		category = 'Redirection';
	}


	if (httpStatusCode >= 400 && httpStatusCode < 500) {
		category = 'Client Error';
		switch (httpStatusCode){
			case 400: subcategory = 'Bad Request'; break;
			case 401: subcategory = 'Unauthorized'; break;
			case 403: subcategory = 'Forbidden'; break;
			case 404: subcategory = 'Not Found'; break;
			case 409: subcategory = 'Too Many Requests'; break;
		}
	}


	if (httpStatusCode >= 500 && httpStatusCode < 600) {
		category = 'Server Error';
		switch (httpStatusCode){
			case 500: subcategory = 'Internal Server Error'; break;

		}
	}

	return {statusCategory: category, statusSubcategory: subcategory};
}

