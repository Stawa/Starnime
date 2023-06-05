declare module "starnime" {
    enum Version {
        V1 = "v1",
    }

    enum Category {
        IMAGE = "images",
    }

    enum Attachment {
        CLOCK = "clock",
        CROSS = "cross",
        EMPTY = "empty",
        FILL = "fill",
        FREQUENCY = "frequency",
        LOGIN = "login",
        LOGOUT = "logout",
        NEXT = "next",
        NOTES = "notes",
        PAUSE = "pause",
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

    function get(version: string, category: string, params: string): Promise<Object>;

	class ApiResponse {
		url: string;
		code: number;
		constructor(response: {
			url: string;code: number
		});
	}

	class Starnime {
		image(version: string, attachment: string): Promise < ApiResponse > ;
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
		Attachment,
		Category,
		Version,
	};
}
