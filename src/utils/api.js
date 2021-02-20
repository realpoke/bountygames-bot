// Getting env variables
require('dotenv').config();

const axios = require('axios');
const logger = require('./logger.js');

const apiKey = process.env.BG_API_KEY;
const basePath = process.env.BG_BASE_PATH;

module.exports = {
	
	async request(endpoint = '', params = {}) {

		if (!apiKey || !basePath) {
			logger.error('API utility is missing an ENV variable!');

			logger.error('apiKey: ' + apiKey);
			logger.error('basePath: ' + basePath);
			return false;
		}

		let returning;

		const headers = {
			'Authorization': `Bearer ${apiKey}`,
			'Content-type': 'application/json'
		};

		const instance = axios.create({
			baseURL: basePath,
			params: params,
			headers
		});

		await instance.get(endpoint)
				.then(response => {
					logger.debug(response.status + ' ' + response.statusText);
					logger.debug(response.data);
					returning = response.data;
				})
				.catch(error => {
					logger.error(error);
				});

		return returning;

	},

	get(endpoint = '', params = {}) {
		logger.debug('Using get with endpoint: ' + endpoint);
		logger.debug('Using get with params: ' + JSON.stringify(params, null, 2));

		return this.request(endpoint, params);
	},

};