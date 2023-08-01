import fs from "fs";
import * as readline from "readline";
import * as stream from "stream";
import { promisify } from "util";
const pipeline = promisify(stream.pipeline);

/**
 * Represents an Iwara.tv video post.
 */
export class IwaraVideo {
    /**
     * The ID of the post.
     */
    id: string;

    /**
     * The slug of the post.
     */
    slug: string;

    /**
     * The title of the post.
     */
    title: string;

    /**
     * The body of the post.
     */
    body: string;

    /**
     * The status of the post.
     */
    status: string;

    /**
     * The rating of the post.
     */
    rating: string;

    /**
     * Indicates whether the post is private.
     */
    private: boolean;

    /**
     * Indicates whether the post is unlisted.
     */
    unlisted: boolean;

    /**
     * The ID of the thumbnail image.
     */
    thumbnail: number;

    /**
     * The embed URL of the post.
     */
    embedUrl: string | null;

    /**
     * Indicates whether the user has liked the post.
     */
    liked: boolean;

    /**
     * The number of likes on the post.
     */
    numLikes: number;

    /**
     * The number of views on the post.
     */
    numViews: number;

    /**
     * The number of comments on the post.
     */
    numComments: number;

    /**
     * Information about the video file.
     */
    file: {
        /**
         * The ID of the video file.
         */
        id: string;
        /**
         * The type of the video file.
         */
        type: string;
        /**
         * The path of the video file.
         */
        path: string;
        /**
         * The name of the video file.
         */
        name: string;
        /**
         * The MIME type of the video file.
         */
        mime: string;
        /**
         * The size of the video file.
         */
        size: number;
        /**
         * The width of the video file (if applicable).
         */
        width: number | null;
        /**
         * The height of the video file (if applicable).
         */
        height: number | null;
        /**
         * The duration of the video file (if applicable).
         */
        duration: number | null;
        /**
         * The number of thumbnails of the video file (if applicable).
         */
        numThumbnails: number | null;
        /**
         * The creation date of the video file.
         */
        createdAt: string;
        /**
         * The last update date of the video file.
         */
        updatedAt: string;
    };

    /**
     * Custom thumbnail information.
     */
    customThumbnail: object | null;

    /**
     * Information about the user who posted the video.
     */
    user: {
        /**
         * The ID of the user.
         */
        id: string;
        /**
         * The name of the user.
         */
        name: string;
        /**
         * The username of the user.
         */
        username: string;
        /**
         * The status of the user.
         */
        status: string;
        /**
         * The role of the user.
         */
        role: string;
        /**
         * Indicates whether the user is followed by someone.
         */
        followedBy: boolean;
        /**
         * Indicates whether the user is following someone.
         */
        following: boolean;
        /**
         * Indicates whether the user is a friend of someone.
         */
        friend: boolean;
        /**
         * Indicates whether the user has a premium status.
         */
        premium: boolean;
        /**
         * The locale of the user.
         */
        locale: string | null;
        /**
         * The last seen date of the user.
         */
        seenAt: string;
        /**
         * Information about the avatar of the user.
         */
        avatar: {
            /**
             * The ID of the avatar image.
             */
            id: string;
            /**
             * The type of the avatar image.
             */
            type: string;
            /**
             * The path of the avatar image.
             */
            path: string;
            /**
             * The name of the avatar image.
             */
            name: string;
            /**
             * The MIME type of the avatar image.
             */
            mime: string;
            /**
             * The size of the avatar image.
             */
            size: number;
            /**
             * The width of the avatar image.
             */
            width: number;
            /**
             * The height of the avatar image.
             */
            height: number;
            /**
             * The creation date of the avatar image.
             */
            createdAt: string;
            /**
             * The last update date of the avatar image.
             */
            updatedAt: string;
        };
        /**
         * The creation date of the user.
         */
        createdAt: string;
        /**
         * The last update date of the user.
         */
        updatedAt: string;
    };

    /**
     * Tags associated with the video.
     */
    tags: string[];

    /**
     * The creation date of the video post.
     */
    createdAt: string;

    /**
     * The last update date of the video post.
     */
    updatedAt: string;

    /**
     * The URL of the video file.
     */
    fileUrl: string;

    /**
     * Create a new IwaraVideo object.
     * @param {Object} response - The JSON response representing the Iwara.tv video post.
     */
    constructor(response: any) {
        this.id = response.id;
        this.slug = response.slug;
        this.title = response.title;
        this.body = response.body;
        this.status = response.status;
        this.rating = response.rating;
        this.private = response.private;
        this.unlisted = response.unlisted;
        this.thumbnail = response.thumbnail;
        this.embedUrl = response.embedUrl;
        this.liked = response.liked;
        this.numLikes = response.numLikes;
        this.numViews = response.numViews;
        this.numComments = response.numComments;

        this.file = {
            id: response.file.id,
            type: response.file.type,
            path: response.file.path,
            name: response.file.name,
            mime: response.file.mime,
            size: response.file.size,
            width: response.file.width,
            height: response.file.height,
            duration: response.file.duration,
            numThumbnails: response.file.numThumbnails,
            createdAt: response.file.createdAt,
            updatedAt: response.file.updatedAt,
        };

        this.customThumbnail = response.customThumbnail;

        this.user = {
            id: response.user.id,
            name: response.user.name,
            username: response.user.username,
            status: response.user.status,
            role: response.user.role,
            followedBy: response.user.followedBy,
            following: response.user.following,
            friend: response.user.friend,
            premium: response.user.premium,
            locale: response.user.locale,
            seenAt: response.user.seenAt,
            avatar: {
                id: response.user.avatar?.id,
                type: response.user.avatar?.type,
                path: response.user.avatar?.path,
                name: response.user.avatar?.name,
                mime: response.user.avatar?.mime,
                size: response.user.avatar?.size,
                width: response.user.avatar?.width,
                height: response.user.avatar?.height,
                createdAt: response.user.avatar?.createdAt,
                updatedAt: response.user.avatar?.updatedAt,
            },
            createdAt: response.user.createdAt,
            updatedAt: response.user.updatedAt,
        };

        this.tags = response.tags;

        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;

        this.fileUrl = response.fileUrl;
    }
}

/**
 * Represents a collection of Iwara.tv video posts.
 */
export class IwaraVideos {
    /**
     * The total count of video posts in the collection.
     */
    count: number;

    /**
     * The maximum number of video posts allowed per page.
     */
    limit: number;

    /**
     * The current page number of the collection.
     */
    page: number;

    /**
     * An array of IwaraVideo objects representing the video posts in the collection.
     */
    results: IwaraVideo[];

    /**
     * Create a new IwaraVideos object.
     * @param {Object} response - The JSON response representing the collection of Iwara.tv video posts.
     */
    constructor(response: any) {
        this.count = response.count;
        this.limit = response.limit;
        this.page = response.page;
        this.results = response.results.map(
            (result: any) => new IwaraVideo(result),
        );
    }
}

/**
 * Represents the IwaraTV API client for accessing video data.
 */
export class IwaraTv {
    private API_URL: string;
    private IMAGE_URL: string;

    /**
     * Creates an instance of the IwaraTv class.
     * @constructor
     */
    constructor() {
        this.API_URL = "https://api.iwara.tv";
        this.IMAGE_URL = "https://i.iwara.tv";
    }

    /**
     * Fetches a list of videos from IwaraTV based on specified filters and options.
     * @param {string} [sort] - The sorting order of the videos (date, trending, popularity, views, likes).
     * @param {string} [rating] - The rating category of the videos (all, general, ecchi).
     * @param {number} [page] - The page number to retrieve.
     * @param {number} [limit] - The maximum number of videos per page.
     * @param {boolean} [subscribed] - If set to true, only videos from subscribed channels will be fetched.
     * @returns {Promise<IwaraVideos>} A promise that resolves with an array of IwaraVideos representing the fetched videos.
     */
    async get_videos(
        sort?: string,
        rating?: string,
        page?: number,
        limit?: number,
        subscribed?: boolean,
    ): Promise<IwaraVideos> {
        const parameters = {
            sort: sort,
            rating: rating,
            page: page,
            limit: limit,
            subscribed: subscribed,
        };
        const fetch = await this.__fetch("videos", parameters);
        return new IwaraVideos(await fetch.json());
    }

    /**
     * Fetches a specific video from IwaraTV based on the provided video ID.
     * @param {string} video_id - The video ID of the video to retrieve.
     * @returns {Promise<IwaraVideo>} A promise that resolves with an IwaraVideo object representing the fetched video.
     */
    async get_video(video_id: string): Promise<IwaraVideo> {
        const fetch = await this.__fetch(`video/${video_id}`);
        return new IwaraVideo(await fetch.json());
    }

    /**
     * Downloads a video file using video ID.
     * @param {string} video_id - The unique ID of the video to retrieve.
     * @returns {Promise<void>} A Promise that resolves when the video is downloaded successfully or rejects on error.
     */
    async download_video(video_id: string): Promise<void> {
        try {
            const fetchVideo = await this.get_video(video_id);
            process.stdout.write(
                `[INFO] Retrieved video: '${fetchVideo.title}' by ${fetchVideo.user.name} (@${fetchVideo.user.username}).\n`,
            );

            const fetchFileUrl = await fetch(fetchVideo.fileUrl);
            const parseJson = await fetchFileUrl.json();
            const downloadUrl = `https:${parseJson[0].src.download}`;
            process.stdout.write(
                `[INFO] Retrieved download URL: '${downloadUrl}'\n`,
            );

            const response = await fetch(downloadUrl);

            const contentLength = parseInt(
                response.headers.get("content-length") ?? "0",
                10,
            );

            const sanitizedTitle = fetchVideo.title.replace(
                /[\\/:"*?<>|]/g,
                "",
            );
            const filename = `${sanitizedTitle}.${
                fetchVideo.file.mime.split("/")[1]
            }`;

            await this.__save(response, contentLength, filename);
        } catch (err: any) {
            process.stderr.write(
                `[ERROR] An error occurred during download: ${err.message}`,
            );
        }
    }

    /**
     * Downloads a video thumbnail using video ID.
     * @param {string} video_id - The video ID of the video to retrieve.
     * @returns {Promise<void>} A Promise that resolves when the video is downloaded successfully or rejects on error.
     */
    async download_thumbnail(video_id: string): Promise<void> {
        try {
            const fetchVideo = await this.get_video(video_id);
            process.stdout.write(
                `[INFO] Retrieved video: '${fetchVideo.title}' by ${fetchVideo.user.name} (@${fetchVideo.user.username}).\n`,
            );

            const response = await fetch(
                `${this.IMAGE_URL}/image/original/${
                    fetchVideo.file.id
                }/thumbnail-${String(fetchVideo.thumbnail).padStart(
                    2,
                    "0",
                )}.jpg`,
            );
            const contentLength = parseInt(
                response.headers.get("content-length") ?? "0",
                10,
            );
            process.stdout.write(
                `[INFO] Retrieved download URL: '${response.url}'\n`,
            );

            const sanitizedTitle = fetchVideo.title.replace(
                /[\\/:"*?<>|]/g,
                "",
            );
            const filename = `${sanitizedTitle}.jpg`;

            this.__save(response, contentLength, filename);
        } catch (err: any) {
            process.stderr.write(
                `[ERROR] An error occurred during download: ${err.message}`,
            );
        }
    }

    async __save(response: Response, contentLength: number, filename: string) {
        let downloadedBytes = 0;
        const progressBarWidth = 50;

        const progressStream = new stream.Transform({
            transform(chunk, _encoding, callback) {
                downloadedBytes += chunk.length;
                const percent = Math.round(
                    (downloadedBytes / contentLength) * 100,
                );

                const progress =
                    "[" +
                    "="
                        .repeat(Math.round((percent / 100) * progressBarWidth))
                        .padEnd(progressBarWidth) +
                    "]";

                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(
                    `[INFO] Downloading ${progress} ${percent}%\r`,
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
                    `[ERROR] Failed to save the file: ${reason}`,
                );
            })
            .finally(() => {
                process.stdout.write(
                    "\n[INFO] File downloaded successfully.\n",
                );
            });
    }

    /**
     * Private method for making API requests using fetch.
     * @param {string} endpoints - The API endpoint to request.
     * @param {Object} [query] - Query parameters for the request.
     * @param {Object} [parameters] - Additional request parameters.
     * @param {string} [method] - The HTTP method for the request (default is 'GET').
     * @returns {Promise<Response>} The response from the API request.
     * @private
     */
    private async __fetch(
        endpoints: string,
        query?: any,
        parameters?: any,
        method: string = "GET",
    ): Promise<Response> {
        const url = this.__addParameters(`${this.API_URL}/${endpoints}`, query);

        const options: RequestInit = {
            method: method,
            body: JSON.stringify(parameters),
        };

        return await fetch(url, options);
    }

    /**
     * Private method to add query parameters to a URL.
     * @param {string} url - The URL to add query parameters to.
     * @param {Object} [parameters] - The query parameters to add.
     * @returns {string} The modified URL with query parameters.
     * @private
     */
    private __addParameters(url: string, parameters?: any): string {
        const urlObj = new URL(url);
        const searchParams = new URLSearchParams(parameters);
        urlObj.search = searchParams.toString();
        return urlObj.toString();
    }
}
