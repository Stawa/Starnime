const request = require('./request');
const {
	Category,
	Icons,
	Version
} = require('./enums')

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

		/**
		 * The error object representing any error returned by the API, if applicable.
		 * @type {Object}
		 */
		this.error = {
			/**
			 * The name of the error returned by the API, if any.
			 * @type {string}
			 */
			name: response.name,

			/**
			 * The error message returned by the API, if any.
			 * @type {string}
			 */
			message: response.message,

			/**
			 * The error code returned by the API, if any.
			 * @type {number}
			 */
			code: response.code
		}
	}
}

const defaultOptions = {
	skipMissingError: true
};

class Options {
	constructor(options) {
		const opts = {
			...defaultOptions,
			...options
		};
		this.skipMissingError = opts.skipMissingError;
	}
}

/**
 * The main class for interacting with the Heavenly Star API.
 * @class
 * @classdesc Provides methods to make API requests and interact with the Heavenly Star API.
 */
class Starnime {
	/**
	 * 
	 * @param {Options} [options] - Optional options for the Starnime class.
	 */
	constructor(options) {
		this.options = options ? new Options(options) : new Options();
	}

	/**
	 * Make an API request manually to fetch an image.
	 * @param {string} version - The version of the API.
	 * @param {string} category - The category of the image.
	 * @param {string} endpoint - The endpoint of the image.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async image(version, category, endpoint) {
		const fetch = await request.get(version, category, endpoint);
		const response = new ApiResponse(fetch);
		delete response.error;

		if (fetch.error && !this.options.skipMissingError) {
			const { name, message, code } = fetch.error;
			throw new StarError(name, message, code)
		}

		return response;
	}
}

module.exports = {
	ApiResponse,
	Starnime,
	StarError,
	defaultOptions,
	Options,
	Icons,
	Version,
	Category
};
