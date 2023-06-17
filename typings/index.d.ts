declare module "starnime" {
	enum Version {
		V1 = "v1",
	}

	enum Category {
		ICONS = "icons",
		SFW = "sfw",
	}

	enum EndpointSfw {
		BITE = 'bite',
		NEKO ='neko'
	}

	enum Icons {
		BOOK = "book",
		CLOCK = "clock",
		CROSS = "cross",
		CORRECT = "correct",
		EMPTY = "empty",
		FILL = "fill",
		FREQUENCY = "frequency",
		FFMPEG = "ffmpeg",
		LOGIN = "login",
		LOGOUT = "logout",
		NEXT = "next",
		NOTES = "notes",
		PAUSE = "pause",
		PHOTOS = "photos",
		PLAY = "play",
		PLUS = "plus",
		PREVIOUS = "previous",
		REFRESH = "refresh",
		RIGHT = "right",
		SETTINGS = "settings",
		STAR = "star",
		UP = "up",
		VERIFIED = "verified",
	}

	enum OutputType {
		RANDOM = 'random',
		GIFONLY = 'gifOnly',
		PICTUREONLY = 'pictureOnly'
	}

	function get(
		version: string,
		category: string,
		endpoint: string,
		outputType: string
	): Promise <Object>;

	class Options {
		skipMissingError?: boolean;
		outputType?: string;
		defaultVersion?: string;
	}

	class ApiResponse {
		url: string;
		code: number;
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
		neko(outputType: string): Promise<ApiResponse>
		bite(outputType: string): Promise<ApiResponse>
		image(
			version: string,
			category: string,
			endpoint: string,
			outputType: string
		): Promise <ApiResponse>;
		emitError(error: object): Error<StarError>;
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
		OutputType,
		EndpointSfw,
		Icons,
		Category,
		Version
	};
}
