const request = require('./request');
const {
	IconsRoutes,
	OutputType,
	Version,
	SfwRoutes
} = require('./enums')

/**
 * Represents a specific error that may occur during API requests or function execution.
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
	 * @param {object} response - The raw response object from the API.
	 */
	constructor(response) {
		/**
		 * The response URL of the API request.
		 * @type {string}
		 */
		if (response.url) {
			this.url = response.url;
		}

		/**
		 * The URLs of the generated images from the API response.
		 * @type {Array<string>}
		 */
		if (response.images) {
			this.images = response.images;
		}

		/**
		 * The status code of the API response.
		 * @type {number}
		 */
		if (response.code) {
			this.code = response.code;
		}

		/**
		 * The error object representing any error returned by the API, if applicable.
		 * @type {object}
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

/**
 * Represents the default options for the Starnime API interaction.
 */
const defaultOptions = {
	skipMissingError: true,
	outputType: OutputType.RANDOM,
	defaultVersion: Version.V1
};

/**
 * Represents the options to configure the API response.
 * @class
 */
class ParametersOptions {
	/**
	 * 
	 * @param {object} [options] - The options to configure the API response. (Optional)
	 */
	constructor(options) {
		const defaultParameters = {
			outputType: defaultOptions.outputType,
			totalAmount: 1
		}

		const opts = {
			...defaultParameters,
			...options
		};

		this.outputType = opts.outputType;
		this.totalAmount = opts.totalAmount;
	}
}

/**
 * Options class for configuring API interaction.
 */
class Options {
	/**
	 * Creates an instance of the Options class.
	 * @param {object} [options] - The options object.
	 */
	constructor(options) {
		const opts = {
			...defaultOptions,
			...options
		};

		this.skipMissingError = opts.skipMissingError;
		this.outputType = opts.outputType;
		this.defaultVersion = opts.defaultVersion;
	}
}

/**
 * The main class for interacting with the Starnime API.
 * @class
 * @classdesc Provides methods to make API requests and interact with the Starnime API.
 */
class Starnime {
	/**
	 * Creates an instance of the Starnime class
	 * @param {Options} [options] - Optional options for the Starnime class.
	 */
	constructor(options) {
		this.options = options ? new Options(options) : new Options();
	}

	/**
	 * Make an API request pre-built to fetch run gifs/images.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async run(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.RUN, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request pre-built to fetch smile gifs/image.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async smile(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.SMILE, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request pre-built to fetch run gifs/image.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async slap(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.SLAP, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request pre-built to fetch poke gifs/image.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async poke(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.POKE, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request pre-built to fetch neko gifs/image.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async neko(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.NEKO, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request pre-built to fetch bite gifs/image.
	 * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async bite(parametersOptions) {
		return await this.image(this.options.defaultVersion, SfwRoutes.BITE, parametersOptions?.outputType, parametersOptions?.totalAmount)
	}

	/**
	 * Make an API request manually to fetch an image.
	 * @param {string} version - The version of the API.
	 * @param {string} endpoint - The endpoint of the image.
	 * @param {string} outputType - The output type of the image.
	 * @param {number} totalAmount - The total number of images to generate.
	 * @returns {Promise<ApiResponse>} The response of the API.
	 * @throws {StarError} If the API request fails or encounters an error.
	 */
	async image(version, endpoint, outputType, totalAmount) {
		const fetch = await request.get(version, endpoint, outputType, totalAmount);
		const response = new ApiResponse(fetch);

		if (fetch.error && !this.options.skipMissingError) {
			this.emitError(fetch.error)
		}

		if (!fetch.error) {
			delete response.error;
		}

		return response;
	}

	/**
	 * Emits an error with the specified details.
	 * @param {object} error - The error object containing details like name, message, and code.
	 * @throws {StarError} Throws a StarError instance with the provided error details.
	 */
	emitError(error) {
		const {
			name,
			message,
			code
		} = error;
		throw new StarError(name, message, code)
	}
}

module.exports = {
	ApiResponse,
	Starnime,
	StarError,
	OutputType,
	SfwRoutes,
	defaultOptions,
	Options,
	IconsRoutes,
	Version
};
