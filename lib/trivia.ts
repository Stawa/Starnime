import fs from "fs";
import path from "path";
import readline from "readline";
import { Transform } from "stream";
import { Console } from "console";
import { DataStorageType } from "./enums";
import { StarError } from "./index";

/**
 * Represents the default options for the StarTrivia interaction.
 */
const defaultTriviaOptions = {
  localPath: "",
  localFilename: "starTrivia.json",
  storeAs: DataStorageType.JSON,
  duplicateQuestions: false,
};

/**
 * Represents the parameters for a trivia question.
 */
export class ParametersTrivia {
  /**
   * The question text.
   */
  question: string;

  /**
   * The answer to the question.
   */
  answer: string;

  /**
   * The category of the question.
   */
  category?: string;

  /**
   * The difficulty of the question.
   */
  difficulty?: string;

  /**
   * The list of answer options for the question.
   */
  answerOptions: any[];

  /**
   * Creates a new instance of ParametersTrivia.
   * @param {object} options - The options for the trivia question.
   * @param {string} options.question - The question text.
   * @param {string} options.answer - The answer to the question.
   * @param {string} [options.category] - The category of the question.
   * @param {string} [options.difficulty] - The difficulty of the question.
   * @param {any[]} options.answerOptions - The list of answer options for the question.
   */
  constructor(options: {
    question: string;
    answer: string;
    category?: string;
    difficulty?: string;
    answerOptions: any[];
  }) {
    const opts = {
      ...options,
    };

    this.question = opts.question;
    this.answer = opts.answer;
    this.answerOptions = opts.answerOptions;
    this.category = opts.category;
    this.difficulty = opts.difficulty;
  }
}

/**
 * Represents the options for a trivia module.
 */
export class TriviaOptions {
  /**
   * The local path for storing the trivia data.
   */
  localPath: string;

  /**
   * The filename for the trivia data.
   */
  localFilename: string;

  /**
   * The storage format for the trivia data.
   */
  storeDataAs?: string;

  /**
   * Whether duplicate questions are allowed.
   */
  duplicateQuestions?: boolean;

  /**
   * Creates a new instance of TriviaOptions.
   * @param {object} [options] - The options for the trivia module.
   * @param {string} options.localPath - The local path for storing the trivia data.
   * @param {string} options.localFilename - The filename for the trivia data.
   * @param {string} [options.storeAs] - The storage format for the trivia data.
   * @param {boolean} [options.duplicateQuestion] - Whether duplicate questions are allowed.
   */
  constructor(options?: {
    localPath: string;
    localFilename: string;
    storeAs?: string;
    duplicateQuestion?: boolean;
  }) {
    const opts = {
      ...defaultTriviaOptions,
      ...options,
    };

    this.localPath = opts.localPath;
    this.localFilename = opts.localFilename;
    this.storeDataAs = opts.storeAs;
    this.duplicateQuestions = opts.duplicateQuestion;
  }
}

export class StarTrivia {
  options: TriviaOptions;

  constructor(options: TriviaOptions) {
    this.options = new TriviaOptions(options);
  }

  createDirectory(): void {
    const localPath = this.options.localPath;

    fs.mkdir(
      localPath,
      {
        recursive: true,
      },
      (err) => {
        if (err) throw err;
      }
    );
  }

  writeFile(): void {
    const localPath = this.options.localPath;
    const localFilename = path.join(
      this.options.localPath,
      this.options.localFilename + ".json"
    );
    const jsonDefaultData = {
      questions: {},
    };

    if (!fs.existsSync(localPath)) {
      this.createDirectory();
    }

    fs.writeFile(
      localFilename,
      JSON.stringify(jsonDefaultData, null, 4),
      (err) => {
        if (err) throw err;
      }
    );
  }

  missingNumber(nums: number[]): number {
    const sortedNums = nums.sort((a, b) => a - b);

    for (let i = 1; i <= sortedNums.length; i++) {
      if (sortedNums[i - 1] !== i) {
        return i;
      }
    }

    return sortedNums.length + 1;
  }

  checkDuplicate(questions: Record<string, any>, newQuestion: string): boolean {
    return Object.values(questions).some(
      (questionData: any) => questionData.question === newQuestion
    );
  }

  async readFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async addQuestion(
    parametersTrivia: ParametersTrivia
  ): Promise<Record<string, any>> {
    const localFilename = path.join(
      this.options.localPath,
      this.options.localFilename + ".json"
    );
    if (!fs.existsSync(localFilename)) this.writeFile();

    const readFile = await this.readFile(localFilename);
    const userData = JSON.parse(readFile);
    const questionKeys = Object.keys(userData.questions);
    const questionNums = questionKeys.map(Number);
    const num = this.missingNumber(questionNums);

    if (
      userData.questions &&
      this.checkDuplicate(userData.questions, parametersTrivia.question)
    ) {
      throw new StarError(
        "DUPLICATE_QUESTION_TRIVIA",
        'The new question and the previous question are duplicates. You can turn this off with `duplicateQuestions` set to `false."',
        0
      );
    }

    const updatedQuestions = {
      questions: {
        ...userData.questions,
        [num]: {
          question: parametersTrivia.question,
          answer: parametersTrivia.answer,
          answerOptions: parametersTrivia.answerOptions,
          category: parametersTrivia.category,
          difficulty: parametersTrivia.difficulty,
        },
      },
    };

    return new Promise((resolve, reject) => {
      fs.writeFile(
        localFilename,
        JSON.stringify(updatedQuestions, null, 4),
        "utf-8",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(updatedQuestions);
          }
        }
      );
    });
  }

  async runOnConsole(): Promise<void> {
    const localFilename = path.join(
      this.options.localPath,
      this.options.localFilename + ".json"
    );
    if (!fs.existsSync(localFilename)) {
      throw new Error(
        "MISSING_TRIVIA_FILE: There is no trivia file in the specified directory."
      );
    }

    const readFile = await this.readFile(localFilename);
    const userData = JSON.parse(readFile);
    const totalQuestions = Object.keys(userData.questions).length;
    let score = 0;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    async function askQuestion(num: number): Promise<void> {
      const question = userData.questions[num];
      const { questionText, answer, answerOptions, difficulty, category } =
        question;

      const options = answerOptions.map(
        (option: string, index: number) =>
          `${String.fromCharCode(97 + index)}. ${option}`
      );

      const input = [
        {
          Number: num,
          Question: questionText,
          Options: options.join(", "),
          Difficulty: difficulty,
          Category: category,
        },
      ];

      displayQuestionTable(input);

      const userAnswer = await new Promise<string>((resolve) => {
        rl.question("Answer: ", (userAnswer) => {
          resolve(userAnswer);
        });
      });
      const userAnswerLower = userAnswer.toLowerCase();

      if (userAnswerLower === answer.toLowerCase()) {
        score++;
        console.log("That's correct!");
      } else {
        console.log("That's incorrect!");
      }

      options.length = 0;

      if (num < totalQuestions) {
        await askQuestion(num + 1);
      } else {
        console.log(
          `Game over! No more questions! Score: ${Math.round(
            (score / totalQuestions) * 100
          )}%`
        );
        rl.close();
      }
    }

    function displayQuestionTable(input: Record<string, any>[]): void {
      const ts = new Transform({
        transform(chunk, _enc, cb) {
          cb(null, chunk);
        },
      });

      const logger = new Console({
        stdout: ts,
      });
      logger.table(input);

      const table = (ts.read() || "").toString();
      let result = "";

      for (let row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, "┌");
        r = r.replace(/^├─*┼/, "├");
        r = r.replace(/│[^│]*/, "");
        r = r.replace(/^└─*┴/, "└");
        r = r.replace(/'/g, " ");
        result += `${r}\n`;
      }

      console.log(result);
    }

    askQuestion(1);
  }
}
