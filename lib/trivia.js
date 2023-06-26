const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {
	Transform
} = require('stream');
const {
	Console
} = require('console');
const {
	DataStorageType
} = require("./enums");
const {
	StarError
} = require('./index');

/**
 * Represents the default options for the StarTrivia interaction.
 */
const defaultTriviaOptions = {
	localPath: '',
	localFilename: 'starTrivia.json',
	storeAs: DataStorageType.JSON,
	duplicateQuestions: false,
};

/**
 * Represents the parameters for a trivia question.
 * @class
 */
class ParametersTrivia {
	/**
	 * Creates a new instance of ParametersTrivia.
	 * @param {object} options - The options for the trivia question.
	 * @param {string} options.question - The question text.
	 * @param {string} options.answer - The answer to the question.
	 * @param {string} options.category - The category of the question.
	 * @param {string} options.difficulty - The difficulty of the question.
	 * @param {any[]} options.answerOptions - The list of answer options for the question.
	 */
	constructor(options) {
		const opts = {
			...options
		};

		this.question = opts.question;
		this.answer = opts.answer;
		this.answerOptions = opts.answerOptions;
		this.category = opts.category;
		this.difficulty = opts.difficulty
	}
}

/**
 * Represents the options for a trivia module.
 * @class
 */
class TriviaOptions {
	/**
	 * Creates a new instance of TriviaOptions.
	 * @param {object} [options] - The options for the trivia module.
	 * @param {string} options.localPath - The local path for storing the trivia data.
	 * @param {string} options.localFilename - The filename for the trivia data.
	 * @param {string} [options.storeAs] - The storage format for the trivia data.
	 * @param {boolean} [options.duplicateQuestion] - Whether duplicate questions are allowed.
	 */
	constructor(options) {
		const opts = {
			...defaultTriviaOptions,
			...options
		};

		this.localPath = opts.localPath;
		this.localFilename = opts.localFilename;
		this.storeDataAs = opts.storeAs;
		this.duplicateQuestions = opts.duplicateQuestion;
	}
}

class StarTrivia {
	/**
	 * Creates an instance of the StarTrivia class
	 * @param {TriviaOptions} options - Options for the Starnime class.
	 */
	constructor(options) {
		this.options = new TriviaOptions(options);
	}

	/**
	 * Creates the directory specified in the local path option.
	 * @throws {Error} - If an error occurs during directory creation.
	 */
	createDirectory() {
		const localPath = this.options.localPath;

		fs.mkdir(localPath, {
			recursive: true
		}, (err) => {
			if (err) throw err;
		});
	}

	/**
	 * Writes the default JSON data to the file specified in the local path and filename options.
	 * @throws {Error} - If an error occurs during file write operation.
	 */
	writeFile() {
		const localPath = this.options.localPath;
		const localFilename = path.join(this.options.localPath, this.options.localFilename + '.json');
		const jsonDefaultData = {
			"questions": {}
		}

		if (!fs.existsSync(localPath)) {
			this.createDirectory();
		}

		fs.writeFile(localFilename, JSON.stringify(jsonDefaultData, null, 4), function(err) {
			if (err) throw err;
		})
	}

	/**
	 * Finds the smallest missing positive number in an array of numbers.
	 * @param {number[]} nums - The array of numbers.
	 * @returns {number} The smallest missing positive number.
	 */
	missingNumber(nums) {
		const sortedNums = nums.sort((a, b) => a - b);

		for (let i = 1; i <= sortedNums.length; i++) {
			if (sortedNums[i - 1] !== i) {
				return i;
			}
		}

		return sortedNums.length + 1;

	}

	/**
	 * Checks if a duplicate question already exists in the trivia data.
	 * @param {object} questions - The existing questions in the trivia data.
	 * @param {string} newQuestion - The new question to be checked for duplicates.
	 * @returns {boolean} `true` if a duplicate question exists, `false` otherwise.
	 */
	checkDuplicate(questions, newQuestion) {
		for (const key in questions) {
			if (questions.hasOwnProperty(key)) {
				const questionData = questions[key];
				if (questionData.question === newQuestion) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Adds a new question to the trivia data.
	 * @param {ParametersTrivia} parametersTrivia - The parameters for the new question.
	 * @returns {object} Return the updated trivia data object.
	 * @throws {StarError} If a duplicate question is detected.
	 */
	addQuestion(parametersTrivia) {
		const localFilename = path.join(this.options.localPath, this.options.localFilename + '.json');
		if (!fs.existsSync(localFilename)) this.writeFile();

		fs.readFile(localFilename, {
			encoding: 'utf8'
		}, (err, data) => {
			if (err) this.writeFile();

			const userData = JSON.parse(data);
			const questionKeys = Object.keys(userData.questions);
			const questionNums = questionKeys.map(Number);
			const num = this.missingNumber(questionNums);

			if (userData.questions) {
				if (this.checkDuplicate(userData.questions, parametersTrivia.question)) {
					throw new StarError('DUPLICATE_QUESTION_TRIVIA', 'The new question and the previous question are duplicates. You can turn this off with `duplicateQuestions` set to `false."', 0)
				}
			}

			const questions = {
				questions: {
					...userData.questions,
					[num]: {
						"question": parametersTrivia.question,
						"answer": parametersTrivia.answer,
						"answerOptions": parametersTrivia.answerOptions,
						"category": parametersTrivia.category,
						"difficulty": parametersTrivia.difficulty
					}
				}
			}

			fs.writeFile(localFilename, JSON.stringify(questions, null, 4), 'utf-8', (err) => {
				if (err) throw err;
				return questions
			})
		});
	}

	runOnConsole() {
		const localFilename = path.join(this.options.localPath, this.options.localFilename + '.json');
		if (!fs.existsSync(localFilename)) {
			throw new Error('MISSING_TRIVIA_FILE: There is no trivia file in the specified directory.');
		}

		fs.readFile(localFilename, {
			encoding: 'utf8'
		}, (err, data) => {
			if (err) throw err;

			const triviaData = JSON.parse(data);
			const totalQuestions = Object.keys(triviaData.questions).length;
			let score = 0;
			let options = [];

			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});

			function askQuestion(num) {
				const question = triviaData.questions[num];
				const questionText = question.question;
				const answer = question.answer;
				const answerOptions = question.answerOptions;
				const difficulty = question.difficulty;
				const category = question.category;

				options = answerOptions.map((option, index) => `${String.fromCharCode(97 + index)}. ${option}`);

				const input = [{
					Number: num,
					Question: questionText,
					Options: options.join(', '),
					Difficulty: difficulty,
					Category: category
				}]

				const ts = new Transform({
					transform(chunk, _enc, cb) {
						cb(null, chunk)
					}
				})

				const logger = new Console({
					stdout: ts
				})

				logger.table(input)
				const table = (ts.read() || '').toString()
				let result = '';

				for (let row of table.split(/[\r\n]+/)) {
					let r = row.replace(/[^┬]*┬/, '┌');
					r = r.replace(/^├─*┼/, '├');
					r = r.replace(/│[^│]*/, '');
					r = r.replace(/^└─*┴/, '└');
					r = r.replace(/'/g, ' ');
					result += `${r}\n`;
				}

				console.log(result);

				rl.question('Answer: ', userAnswer => {
					const userAnswerLower = userAnswer.toLowerCase();

					if (userAnswerLower === answer.toLowerCase()) {
						score++;
						console.log("That's correct!");
					} else {
						console.log("That's incorrect!");
					}

					options = [];
					if (num < totalQuestions) {
						askQuestion(num + 1);
					} else {
						console.log(`Game over! No more questions! Score: ${Math.round((score / totalQuestions) * 100)}%`);
						rl.close();
					}
				});
			}

			askQuestion(1);
		});
	}
}

module.exports = {
	TriviaOptions,
	StarTrivia
}
