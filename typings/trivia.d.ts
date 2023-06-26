declare module "starnime/trivia" {
	enum DataStorageType {
		JSON = 'json'
	}

	class TriviaOptions {
		localPath?: string;
		localFilename?: string;
		storeDataAs?: string;
		duplicateQuestions?: boolean;
	}

	class ParametersTrivia {
		question?: string;
		answer?: string;
		answerOptions ?: string | object | Array <string>;
	}

	class StarTrivia {
		constructor(options ? : TriviaOptions);
		createDirectory(): void;
		writeFile(): void;
		missingNumber(nums: Array <number | string> ): number;
		checkDuplicate(questions: object, newQuestion: string): boolean;
		addQuestion(parametersTrivia: ParametersTrivia): object;
        runOnConsole(): void;
	}

	export {
		DataStorageType,
		TriviaOptions,
		ParametersTrivia,
		StarTrivia
	}
}
