const fetch = require('node-fetch');

module.exports = {
	/**
	 * Represents an API request.
	 * @param {string} version - The version of the API.
	 * @param {string} endpoint - The endpoint of the API. 
	 * @param {string} outputType - The output type of the image.
	 * @param {number} totalAmount - The total number of images to generate.
	 * @returns {Promise<object>} The response of the API.
	 */
	get: async function(version, endpoint, outputType, totalAmount) {
		const response = await fetch(`https://starnime.vercel.app/api/${version}/${endpoint}/?type=${outputType}&total=${totalAmount}`);
		const json = await response.json();
		return json;
	}
}
