const request = require('./request');
const { Category, Attachment, Version } = require('./enums')

/**
 * Represents a specific error that can occur during API requests.
 * @class
 * @extends Error
 */
class StarError extends Error {
	/**
	 * Create a new StarError instance.
	 * @constructor
	 * @param {string} name - The name of the error.
	 * @param {string} message - The error message.
	 * @param {number} code - The error code associated with the API response.
	 */
	constructor(name, message, code) {
		super(message);
		this.name = name;
		this.code = code;
	}
}

/**
 * Represents the response from an API request.
 * @class
 * @classdesc Encapsulates the response data received from an API request.
 */
class ApiResponse {
	/**
	 * Create a new ApiResponse instance.
	 * @constructor
	 * @param {Object} response - The raw response object from the API.
	 */
	constructor(response) {
		/**
		 * The response URL of the API request.
		 * @type {string}
		 */
		this.url = response.url;

		/**
		 * The status code of the API response.
		 * @type {number}
		 */
		this.code = response.code;
	}
}

/**
 * The main class for interacting with the Heavenly Star API.
 * @class
 * @classdesc Provides methods to make API requests and interact with the Heavenly Star API.
 */
class Starnime {
	/**
	 * Make an API request to fetch an image.
	 * @param {string} version - The version of the API.
	 * @param {string} attachment - The attachment of the image.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async image(version, attachment) {
		const fetch = await request.get(version, Category.IMAGE, attachment);
		return new ApiResponse(fetch);
	}
}

module.exports = { ApiResponse, Starnime, StarError, Attachment, Version, Category };
