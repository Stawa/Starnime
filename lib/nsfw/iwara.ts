import { Utility } from "../utility";

/**
 * Represents the JSON response of an IwaraVideo.
 */
interface IwaraVideoResponse {
    id: string;
    slug: string;
    title: string;
    body: string;
    status: string;
    rating: string;
    private: boolean;
    unlisted: boolean;
    thumbnail: number;
    embedUrl: string | null;
    liked: boolean;
    numLikes: number;
    numViews: number;
    numComments: number;
    file: IwaraFileResponse;
    customThumbnail: object | null;
    user: IwaraUserResponse;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    fileUrl: string;
}

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
    file: IwaraFile;

    /**
     * Custom thumbnail information.
     */
    customThumbnail: object | null;

    /**
     * Information about the user who posted the video.
     */
    user: IwaraUser;

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
     * @param {IwaraVideoResponse} response - The JSON response representing the Iwara.tv video post.
     */
    constructor(response: IwaraVideoResponse) {
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
        this.file = new IwaraFile(response.file);
        this.customThumbnail = response.customThumbnail;
        this.user = new IwaraUser(response.user);
        this.tags = response.tags;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
        this.fileUrl = response.fileUrl;
    }
}

/**
 * Represents a video post from Iwara.tv platform.
 */
interface IwaraVideosResponse {
    count: number;
    limit: number;
    page: number;
    results: IwaraVideo[];
}

/**
 * Represents a curated collection of video posts from Iwara.tv platform.
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
     * @param {IwaraVideosResponse} response - The JSON response representing the collection of Iwara.tv video posts.
     */
    constructor(response: IwaraVideosResponse) {
        this.count = response.count;
        this.limit = response.limit;
        this.page = response.page;
        this.results = response.results.map((result) => new IwaraVideo(result));
    }
}

/**
 * Represents the JSON response of an Iwara.tv post file.
 */
interface IwaraFileResponse {
    id: string;
    type: string;
    path: string;
    name: string;
    mime: string;
    size: number;
    width: number | null;
    height: number | null;
    duration: number | null;
    numThumbnails: number | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents a collection of Iwara.tv post files.
 */
export class IwaraFile {
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

    constructor(response: IwaraFileResponse) {
        this.id = response.id;
        this.type = response.type;
        this.path = response.path;
        this.name = response.name;
        this.mime = response.mime;
        this.size = response.size;
        this.width = response.width;
        this.height = response.height;
        this.duration = response.duration;
        this.numThumbnails = response.numThumbnails;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }
}

/**
 * Represents the avatar information of an IwaraUser.
 */
interface IwaraAvatar {
    id: string;
    type: string;
    path: string;
    name: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents the JSON response of an IwaraUser.
 */
interface IwaraUserResponse {
    id: string;
    name: string;
    username: string;
    status: string;
    role: string;
    followedBy: boolean;
    following: boolean;
    friend: boolean;
    premium: boolean;
    locale: string | null;
    seenAt: string;
    avatar: IwaraAvatar;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents a collection of user content from Iwara.tv.
 */
export class IwaraUser {
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

    /**
     * Create a new IwaraUser object.
     * @param {IwaraUserResponse} response - The JSON response representing the collection of Iwara.tv video posts.
     */
    constructor(response: IwaraUserResponse) {
        this.id = response.id;
        this.name = response.name;
        this.username = response.username;
        this.status = response.status;
        this.role = response.role;
        this.followedBy = response.followedBy;
        this.following = response.following;
        this.friend = response.friend;
        this.premium = response.premium;
        this.locale = response.locale;
        this.seenAt = response.seenAt;
        this.avatar = {
            id: response.avatar?.id,
            type: response.avatar?.type,
            path: response.avatar?.path,
            name: response.avatar?.name,
            mime: response.avatar?.mime,
            size: response.avatar?.size,
            width: response.avatar?.width,
            height: response.avatar?.height,
            createdAt: response.avatar?.createdAt,
            updatedAt: response.avatar?.updatedAt,
        };
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }
}

/**
 * Represents the thumbnail information of an IwaraImage.
 */
interface IwaraThumbnail {
    id: string;
    type: string;
    path: string;
    name: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    duration: number | null;
    numThumbnails: number | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Represents the JSON response of an IwaraImage.
 */
interface IwaraImageResponse {
    id: string;
    slug: string | null;
    title: string;
    body: string | null;
    thumbnail: IwaraThumbnail;
    rating: string;
    liked: boolean;
    numImages: number;
    numLikes: number;
    numViews: number;
    numComments: number;
    createdAt: string;
    updatedAt: string;
    files: IwaraFile[];
    tags: string[];
    user: IwaraUser;
}

/**
 * Represents a collection of single images from Iwara.tv
 */
export class IwaraImage {
    /**
     * The ID of the image.
     */
    id: string;

    /**
     * The slug of the image.
     */
    slug: string | null;

    /**
     * The title of the image.
     */
    title: string;

    /**
     * The body of the image.
     */
    body: string | null;

    /**
     * The thumbnail information of the image.
     */
    thumbnail: {
        id: string;
        type: string;
        path: string;
        name: string;
        mime: string;
        size: number;
        width: number;
        height: number;
        duration: number | null;
        numThumbnails: number | null;
        createdAt: string;
        updatedAt: string;
    };

    /**
     * The rating of the image, e.g., "ecchi".
     */
    rating: string;

    /**
     * Whether the image is liked by the user.
     */
    liked: boolean;

    /**
     * The number of images in the series (if applicable).
     */
    numImages: number;

    /**
     * The number of likes the image has received.
     */
    numLikes: number;

    /**
     * The number of views the image has received.
     */
    numViews: number;

    /**
     * The number of comments the image has received.
     */
    numComments: number;

    /**
     * The date and time when the image was created.
     */
    createdAt: string;

    /**
     * The date and time when the image was last updated.
     */
    updatedAt: string;

    /**
     * The additional files associated with the image.
     * Note: The type should be updated based on the actual data structure for "files".
     */
    files: IwaraFile[];

    /**
     * The tags associated with the image.
     * Note: The type should be updated based on the actual data structure for "tags".
     */
    tags: string[];

    /**
     * The user who uploaded the image.
     */
    user: IwaraUser;

    /**
     * Create an IwaraImage instance from the provided JSON response.
     * @param response The JSON response representing the image data.
     */
    constructor(response: IwaraImageResponse) {
        this.id = response.id;
        this.slug = response.slug;
        this.title = response.title;
        this.body = response.body;
        this.thumbnail = {
            id: response.thumbnail.id,
            type: response.thumbnail.type,
            path: response.thumbnail.path,
            name: response.thumbnail.name,
            mime: response.thumbnail.mime,
            size: response.thumbnail.size,
            width: response.thumbnail.width,
            height: response.thumbnail.height,
            duration: response.thumbnail.duration,
            numThumbnails: response.thumbnail.numThumbnails,
            createdAt: response.thumbnail.createdAt,
            updatedAt: response.thumbnail.updatedAt,
        };
        this.rating = response.rating;
        this.liked = response.liked;
        this.numImages = response.numImages;
        this.numLikes = response.numLikes;
        this.numViews = response.numViews;
        this.numComments = response.numComments;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
        this.files = Array.from(
            response.files,
            (element) => new IwaraFile(element),
        );
        this.tags = response.tags;
        this.user = new IwaraUser(response.user);
    }
}

/**
 * Represents the JSON response of a collection of Iwara.tv images.
 */
interface IwaraImagesResponse {
    count: number;
    limit: number;
    page: number;
    results: IwaraImage[];
}

/**
 * Represents a collection of Iwara.tv images
 */
export class IwaraImages {
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
    results: IwaraImage[];

    /**
     * Create an IwaraImages instance from the provided JSON response.
     * @param response The JSON response representing the image data.
     */
    constructor(response: IwaraImagesResponse) {
        this.count = response.count;
        this.limit = response.limit;
        this.page = response.page;
        this.results = response.results.map((result) => new IwaraImage(result));
    }
}

/**
 * Represents the IwaraTV API client for accessing video data.
 */
export class IwaraTv extends Utility {
    private API_URL: string;
    private IMAGE_URL: string;

    /**
     * Creates an instance of the IwaraTv class.
     * @constructor
     */
    constructor() {
        super();
        this.API_URL = "https://api.iwara.tv";
        this.IMAGE_URL = "https://i.iwara.tv";
    }

    /**
     * Fetches a list of videos from IwaraTV based on specified filters and options.
     * @param {string} [sort] - The sorting order of the videos (date, trending, popularity, views, likes).
     * @param {string} [rating] - The rating category of the videos (all, general, ecchi).
     * @param {number} [page] - The page number to retrieve.
     * @param {number} [limit] - The maximum number of videos per page.
     * @returns {Promise<IwaraVideos>} A promise that resolves with an array of IwaraVideos representing the fetched videos.
     */
    async get_videos(
        sort?: string,
        rating?: string,
        page?: number,
        limit?: number,
    ): Promise<IwaraVideos> {
        const parameters = {
            sort: sort ?? "trending",
            rating: rating ?? "all",
            page: page?.toString() ?? "0",
            limit: limit?.toString() ?? "32",
        };
        const fetch = await this.__fetch("videos", parameters);
        return new IwaraVideos(await fetch.json());
    }

    /**
     * Fetches a list of images from the Iwara website based on optional filters.
     * @param {string} [sort] - (Optional) The sorting option for the fetched images (e.g., "trending", "latest", "popular").
     * @param {string} [rating] - (Optional) The rating option for the fetched images (e.g., "all", "explicit", "questionable", "safe").
     * @param {number} [page] - (Optional) The page number of the image list to fetch.
     * @param {number} [limit] - (Optional) The number of images to fetch per page.
     * @returns {Promise<IwaraImages>} A Promise that resolves with the fetched images or rejects on error.
     */
    async get_images(
        sort?: string,
        rating?: string,
        page?: number,
        limit?: number,
    ): Promise<IwaraImages> {
        const parameters = {
            sort: sort ?? "trending",
            rating: rating ?? "all",
            page: page?.toString() ?? "0",
            limit: limit?.toString() ?? "32",
        };
        const fetch = await this.__fetch("images", parameters);
        return new IwaraImages(await fetch.json());
    }

    /**
     * Fetches detailed information about a specific image from the Iwara website using its ID.
     * @param {string} image_id - The ID of the image to fetch.
     * @returns {Promise<IwaraImage>} A Promise that resolves with the fetched image's details or rejects on error.
     */
    async get_image(image_id: string) {
        const fetch = await this.__fetch(`image/${image_id}`);
        return new IwaraImage(await fetch.json());
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
            const fetchPost = await this.get_video(video_id);
            process.stdout.write(
                `[INFO] Retrieved video: '${fetchPost.title}' by ${fetchPost.user.name} (@${fetchPost.user.username}).\n`,
            );

            const fetchFileUrl = await fetch(fetchPost.fileUrl);
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

            const sanitizedTitle = fetchPost.title.replace(/[\\/:"*?<>|]/g, "");
            const filename = `${sanitizedTitle}.${
                fetchPost.file.mime.split("/")[1]
            }`;

            await this.save(response, contentLength, filename);
        } catch (err) {
            process.stderr.write(
                `[ERROR] An error occurred during download: ${
                    (err as Error).message
                }`,
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
            const fetchPost = await this.get_video(video_id);
            process.stdout.write(
                `[INFO] Video retrieved: '${fetchPost.title}' by ${fetchPost.user.name} (@${fetchPost.user.username}).\n`,
            );

            const response = await fetch(
                `${this.IMAGE_URL}/image/original/${
                    fetchPost.file.id
                }/thumbnail-${String(fetchPost.thumbnail).padStart(
                    2,
                    "0",
                )}.jpg`,
            );
            const contentLength = parseInt(
                response.headers.get("content-length") ?? "0",
                10,
            );
            process.stdout.write(
                `[INFO] Download URL retrieved: '${response.url}'\n`,
            );

            const sanitizedTitle = fetchPost.title.replace(/[\\/:"*?<>|]/g, "");
            const filename = `${sanitizedTitle}.jpg`;

            this.save(response, contentLength, filename);
        } catch (err) {
            process.stderr.write(
                `[ERROR] An error occurred during download: ${
                    (err as Error).message
                }`,
            );
        }
    }

    /**
     * Downloads an image using its ID.
     * @param {string} image_id - The image ID of the post to retrieve.
     * @returns {Promise<void>} A Promise that resolves when the image is downloaded successfully or rejects on error.
     */
    async download_image(image_id: string): Promise<void> {
        try {
            const fetchPost = await this.get_image(image_id);
            process.stdout.write(
                `[INFO] Retrieved image: '${fetchPost.title}' by ${fetchPost.user.name} (@${fetchPost.user.username}).\n`,
            );

            const files = fetchPost.files[0];
            const response = await fetch(
                `${this.IMAGE_URL}/image/large/${files?.id}/${files?.name}`,
            );
            const contentLength = parseInt(
                response.headers.get("content-length") ?? "0",
                10,
            );

            process.stdout.write(
                `[INFO] Retrieved download URL: '${response.url}'\n`,
            );

            const sanitizedTitle = fetchPost.title.replace(/[\\/:"*?<>|]/g, "");
            const filename = `${sanitizedTitle}.jpg`;

            this.save(response, contentLength, filename);
        } catch (err) {
            process.stderr.write(
                `[ERROR] An error occurred during download: ${
                    (err as Error).message
                }`,
            );
        }
    }

    /**
     * Private method for making API requests using fetch.
     * @param {string} endpoints - The API endpoint to request.
     * @param {Record<string, string>} [query] - Query parameters for the request.
     * @param {Record<string, string>} [parameters] - Additional request parameters.
     * @param {string} [method] - The HTTP method for the request (default is 'GET').
     * @returns {Promise<Response>} The response from the API request.
     * @private
     */
    private async __fetch(
        endpoints: string,
        query?: Record<string, string>,
        parameters?: Record<string, string>,
        method: string = "GET",
    ): Promise<Response> {
        const url = this.addParameters(`${this.API_URL}/${endpoints}`, query);

        const options: RequestInit = {
            method: method,
            body: JSON.stringify(parameters),
        };

        return await fetch(url, options);
    }
}
