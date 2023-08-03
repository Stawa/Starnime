import fs from "fs";
import * as readline from "readline";
import { promisify } from "util";
import * as stream from "stream";

/**
 * Utility class with various helper methods for handling image downloads and URL manipulation.
 */
export class Utility {
    /**
     * Helper function to save the image data to a file on disk.
     * @param {Response} response - The response object containing the image data.
     * @param {number} contentLength - The total size of the image data to be saved.
     * @param {string} filename - The filename to be used when saving the image.
     * @returns {Promise<void>} A Promise that resolves when the image is saved successfully or rejects on error.
     * @private
     */
    async save(
        response: Response,
        contentLength: number,
        filename: string,
    ): Promise<void> {
        let downloadedBytes = 0;
        const progressBarWidth = 20;
        const pipeline = promisify(stream.pipeline);

        const progressStream = new stream.Transform({
            transform(chunk, _encoding, callback) {
                downloadedBytes += chunk.length;
                const percent = Math.round(
                    (downloadedBytes / contentLength) * 100,
                );

                const units = ["B", "KB", "MB", "GB", "TB"];
                let downloadedSize = downloadedBytes;
                let downloadedSizeStr = "";
                let unitIndex = 0;

                while (downloadedSize >= 1024 && unitIndex < units.length - 1) {
                    downloadedSize /= 1024;
                    unitIndex++;
                }

                downloadedSizeStr =
                    downloadedSize.toFixed(2) + " " + units[unitIndex];

                let fileSize = contentLength;
                let fileSizeStr = "";
                unitIndex = 0;

                while (fileSize >= 1024 && unitIndex < units.length - 1) {
                    fileSize /= 1024;
                    unitIndex++;
                }

                fileSizeStr = fileSize.toFixed(2) + " " + units[unitIndex];

                const progress =
                    "[" +
                    "="
                        .repeat(Math.round((percent / 100) * progressBarWidth))
                        .padEnd(progressBarWidth) +
                    "]";

                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(
                    `[INFO] Download Progress: ${downloadedSizeStr}/${fileSizeStr} ${progress} ${percent}%\r`,
                );

                callback(null, chunk);
            },
        });

        await pipeline(
            response.body as unknown as stream.Readable,
            progressStream,
            fs.createWriteStream(filename),
        )
            .catch((reason) => {
                process.stderr.write(
                    `[ERROR] The file could not be saved due to: "${reason}".`,
                );
            })
            .finally(() => {
                process.stdout.write(
                    `\n[INFO] The file has been successfully downloaded and saved as "${filename}".\n`,
                );
            });
    }

    /**
     * Extract the ID from a Rule34 post URL.
     * @param {string} url - The post URL.
     * @returns {string | null} The extracted ID or null if not found.
     * @private
     */
    extractIdFromURL(url: string): string | null {
        const regex = /id=(\d+)/;
        const match = url.match(regex);
        return match !== null && match[1] !== undefined ? match[1] : null;
    }

    /**
     * Private method to add query parameters to a URL.
     * @param {string} url - The URL to add query parameters to.
     * @param {Record<string, string>} [parameters] - The query parameters to add.
     * @returns {string} The modified URL with query parameters.
     * @private
     */
    addParameters(url: string, parameters?: Record<string, string>): string {
        const urlObj = new URL(url);
        const searchParams = new URLSearchParams(parameters);
        urlObj.search = searchParams.toString();
        return urlObj.toString();
    }
}
