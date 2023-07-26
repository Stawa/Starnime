import { OutputType, Version, SfwRoutes } from "./enums";
import * as request from "./request";
export * from "./enums";
export * from "./request";
export * from "./trivia";
export * from "./nsfw/r34";
export * from "./discord/webhook";

/**
 * Represents a specific error that may occur during API requests or function execution.
 * @class
 * @extends Error
 */
export class StarError extends Error {
  override name: string;
  code: number;

  /**
   * Create a new StarError instance.
   * @constructor
   * @param {string} name - The name of the error.
   * @param {string} message - The error message.
   * @param {number} code - The error code associated with the API response.
   */
  constructor(name: string, message: string, code: number) {
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
export class ApiResponse {
  url?: string;
  images?: Array<string>;
  code?: number;
  error?: {
    name?: string;
    message?: string;
    code?: number;
  };

  /**
   * Create a new ApiResponse instance.
   * @constructor
   * @param {object} response - The raw response object from the API.
   */
  constructor(response: {
    url?: string;
    images?: Array<string>;
    code?: number;
    error?: object;
    name?: string;
    message?: string;
  }) {
    /**
     * The response URL of the API request.
     * @type {string}
     */
    if (response.hasOwnProperty("url")) {
      this.url = response.url;
    }

    /**
     * The URLs of the generated images from the API response.
     * @type {Array<string>}
     */
    if (response.hasOwnProperty("images")) {
      this.images = response.images;
    }

    /**
     * The status code of the API response.
     * @type {number}
     */
    if (response.hasOwnProperty("code")) {
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
      code: response.code,
    };
  }
}

/**
 * Represents the default options for the Starnime API interaction.
 */
const defaultOptions: {
  skipMissingError: boolean;
  outputType: OutputType;
  defaultVersion: Version;
} = {
  skipMissingError: true,
  outputType: OutputType.RANDOM,
  defaultVersion: Version.V1,
};

/**
 * Represents the options to configure the API response.
 * @class
 */
export class ParametersOptions {
  outputType: OutputType;
  totalAmount: number;

  /**
   *
   * @param {object} [options] - The options to configure the API response. (Optional)
   */
  constructor(options?: { outputType?: OutputType; totalAmount?: number }) {
    const defaultParameters = {
      outputType: defaultOptions.outputType,
      totalAmount: 1,
    };

    const opts = {
      ...defaultParameters,
      ...options,
    };

    this.outputType = opts.outputType;
    this.totalAmount = opts.totalAmount;
  }
}

/**
 * Options class for configuring API interaction.
 */
export class Options {
  skipMissingError: boolean;
  outputType: OutputType;
  defaultVersion: Version;

  /**
   * Creates an instance of the Options class.
   * @param {object} [options] - The options object.
   */
  constructor(options?: {
    skipMissingError?: boolean;
    outputType?: OutputType;
    defaultVersion?: Version;
  }) {
    const opts = {
      ...defaultOptions,
      ...options,
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
export class Starnime {
  options: Options;

  /**
   * Creates an instance of the Starnime class
   * @param {Options} [options] - Optional options for the Starnime class.
   */
  constructor(options?: Options) {
    this.options = new Options();
    if (options) {
      this.options = options instanceof Options ? options : new Options(options);
    }
  }

  /**
   * Make an API request pre-built to fetch run gifs/images.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async run(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.RUN,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
  }

  /**
   * Make an API request pre-built to fetch smile gifs/image.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async smile(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.SMILE,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
  }

  /**
   * Make an API request pre-built to fetch run gifs/image.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async slap(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.SLAP,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
  }

  /**
   * Make an API request pre-built to fetch poke gifs/image.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async poke(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.POKE,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
  }

  /**
   * Make an API request pre-built to fetch neko gifs/image.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async neko(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.NEKO,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
  }

  /**
   * Make an API request pre-built to fetch bite gifs/image.
   * @param {ParametersOptions} [parametersOptions] - The options to configure the API response.
   * @returns {Promise<ApiResponse>} The response of the API.
   * @throws {StarError} If the API request fails or encounters an error.
   */
  async bite(parametersOptions?: ParametersOptions): Promise<ApiResponse> {
    return await this.image(
      this.options.defaultVersion,
      SfwRoutes.BITE,
      parametersOptions?.outputType || OutputType.RANDOM,
      parametersOptions?.totalAmount || 1
    );
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
  async image(
    version: string,
    endpoint: string,
    outputType: string,
    totalAmount: number
  ): Promise<ApiResponse> {
    interface FetchResponse extends ApiResponse {
      url?: string;
      images?: Array<string>;
      code?: number;
      error?: {
        name: string;
        message: string;
        code: number;
      };
    }

    const fetch = (await request.get(
      version,
      endpoint,
      outputType,
      totalAmount
    )) as FetchResponse;
    const response = new ApiResponse(fetch);

    if (fetch.error && !this.options.skipMissingError) {
      this.emitError(fetch.error);
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
  emitError(error: { name: string; message: string; code: number }): void {
    const { name, message, code } = error;
    throw new StarError(name, message, code);
  }
}
