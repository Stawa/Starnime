declare module "starnime" {
	enum Version {
		V1 = "v1",
	}

	enum Category {
		ICONS = "icons",
		SFW = "sfw",
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

	function get(
		version: string,
		category: string,
		params: string
	): Promise <Object>;

	class Options {
		skipMissingError: boolean;
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
		image(
			version: string,
			category: string,
			endpoint: string
		): Promise <ApiResponse>;
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
		Icons,
		Category,
		Version
	};
}
