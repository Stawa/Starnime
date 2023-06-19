declare module "starnime" {
	enum Version {
		V1 = "v1",
	}

	enum SfwRoutes {
		BITE = 'sfw/bite',
		NEKO = 'sfw/neko',
		POKE = 'sfw/poke',
		RUN = 'sfw/run',
		SLAP = 'sfw/slap'
	}

	enum IconsRoutes {
		BOOK = "icons/book",
		CLOCK = "icons/clock",
		CROSS = "icons/cross",
		CORRECT = "icons/correct",
		EMPTY = "icons/empty",
		FFMPEG = "icons/ffmpeg",
		FILL = "icons/fill",
		FREQUENCY = "icons/frequency",
		LOGIN = "icons/login",
		LOGOUT = "icons/logout",
		NEXT = "icons/next",
		NOTES = "icons/notes",
		PAUSE = "icons/pause",
		PHOTOS = "icons/photos",
		PLAY = "icons/play",
		PLUS = "icons/plus",
		PREVIOUS = "icons/previous",
		REFRESH = "icons/refresh",
		RIGHT = "icons/right",
		SETTINGS = "icons/settings",
		STAR = "icons/star",
		UP = "icons/up",
		VERIFIED = "icons/verified"
	}

	enum OutputType {
		RANDOM = 'random',
		GIFONLY = 'gifOnly',
		PICTUREONLY = 'pictureOnly'
	}

	function get(
		version: string,
		endpoint: string,
		outputType: string,
		totalAmount: number
	): Promise <object>;

	class Options {
		skipMissingError?: boolean;
		outputType?: string;
		defaultVersion?: string;
	}

	class ParametersOptions {
		outputType?: string;
		totalAmount?: number;
	}

	class ApiResponse {
		url: string;
		code: number;
		images: Array<string>
		error: {
			name: string;
			message: string;
			code: string;
		};
		constructor(response: {
			url: string,
			code: number,
			error: object
		});
	}

	class Starnime {
		constructor(options?: Options);
		run(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		smile(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		slap(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		poke(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		neko(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		bite(parametersOptions?: ParametersOptions): Promise<ApiResponse>
		image(
			version: string,
			endpoint: string,
			outputType: string,
			totalAmount: number,
		): Promise <ApiResponse>;
		emitError(error: object): StarError;
	}

	class StarError extends Error {
		constructor(name: string, message: string, code: number);
		code: number;
	}

	export {
		get,
		ApiResponse,
		Starnime,
		StarError,
		Options,
		ParametersOptions,
		OutputType,
		SfwRoutes,
		IconsRoutes,
		Version
	};
}
