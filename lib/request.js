const fetch = require('node-fetch');

module.exports = {
	/**
	 * Represents an API request.
	 * @param {string} version - The version of the API.
     * @param {string} category - The category of the API.
     * @param {string} params - The parameters of the API. 
     * @returns {Promise<object>} The response of the API.
	 */
	get: async function(version, category, params) {
		const response = await fetch(`https://starnime.vercel.app/api/${version}/${category}/${params}`);
		const json = await response.json();
		return json;
	}
}
