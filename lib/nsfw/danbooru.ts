import { Utility } from "../utility";
import path from "path";

/**
 * Represents a media asset from the Danbooru API.
 */
interface MediaAsset {
    id: number;
    created_at: string;
    updated_at: string;
    md5: string;
    file_ext: string;
    file_size: number;
    image_width: number;
    image_height: number;
    duration: null | number;
    status: "active" | "inactive";
    file_key: string;
    is_public: boolean;
    pixel_hash: string;
    variants: {
        type: "180x180" | "360x360" | "720x720" | "sample" | "original";
        url: string;
        width: number;
        height: number;
        file_ext: string;
    }[];
}

/**
 * Represents the JSON response from the Danbooru API for a post.
 */
interface DanbooruPostResponse {
    id: number;
    created_at: string;
    uploader_id: number;
    score: number;
    source: string;
    md5: string;
    last_comment_bumped_at: boolean;
    rating: string;
    image_width: number;
    image_height: number;
    tag_string: string;
    fav_count: number;
    file_ext: string;
    last_noted_at: boolean;
    parent_id: number;
    has_children: boolean;
    approver_id: number;
    tag_count_general: number;
    tag_count_artist: number;
    tag_count_character: number;
    tag_count_copyright: number;
    file_size: number;
    up_score: number;
    down_score: number;
    is_pending: boolean;
    is_flagged: boolean;
    is_deleted: boolean;
    tag_count: number;
    updated_at: string;
    is_banned: boolean;
    pixiv_id: number;
    last_commented_at: string;
    has_active_children: boolean;
    bit_flags: number;
    tag_count_meta: number;
    has_large: boolean;
    has_visible_children: boolean;
    tag_string_general: string;
    tag_string_character: string;
    tag_string_copyright: string;
    tag_string_artist: string;
    tag_string_meta: string;
    file_url: string;
    large_file_url: string;
    preview_file_url: string;
    media_asset: MediaAsset;
}

/**
 * Represents a Danbooru post.
 */
export class DanbooruPost {
    /**
     * The ID of the post.
     */
    id: number;

    /**
     * The date and time when the post was created.
     */
    created_at: string;

    /**
     * The ID of the uploader who uploaded the post.
     */
    uploader_id: number;

    /**
     * The score of the post.
     */
    score: number;

    /**
     * The source URL of the post.
     */
    source: string;

    /**
     * The MD5 hash of the post.
     */
    md5: string;

    /**
     * The date and time when the last comment was bumped at.
     */
    last_comment_bumped_at: boolean;

    /**
     * The rating of the post (e.g., 's', 'q', 'e', 'g').
     */
    rating: string;

    /**
     * The width of the image in pixels.
     */
    image_width: number;

    /**
     * The height of the image in pixels.
     */
    image_height: number;

    /**
     * The tag string associated with the post.
     */
    tag_string: string;

    /**
     * The number of times the post has been favorited.
     */
    fav_count: number;

    /**
     * The file extension of the post's image (e.g., 'jpg', 'png').
     */
    file_ext: string;

    /**
     * The date and time when the post was last noted at.
     */
    last_noted_at: boolean;

    /**
     * The ID of the parent post (if the post is a child post).
     */
    parent_id: number;

    /**
     * Whether the post has children.
     */
    has_children: boolean;

    /**
     * The ID of the post's approver.
     */
    approver_id: number;

    /**
     * The number of general tags associated with the post.
     */
    tag_count_general: number;

    /**
     * The number of artist tags associated with the post.
     */
    tag_count_artist: number;

    /**
     * The number of character tags associated with the post.
     */
    tag_count_character: number;

    /**
     * The number of copyright tags associated with the post.
     */
    tag_count_copyright: number;

    /**
     * The size of the post's image file in bytes.
     */
    file_size: number;

    /**
     * The up score of the post.
     */
    up_score: number;

    /**
     * The down score of the post.
     */
    down_score: number;

    /**
     * Whether the post is pending approval.
     */
    is_pending: boolean;

    /**
     * Whether the post is flagged.
     */
    is_flagged: boolean;

    /**
     * Whether the post is deleted.
     */
    is_deleted: boolean;

    /**
     * The total number of tags associated with the post.
     */
    tag_count: number;

    /**
     * The date and time when the post was last updated.
     */
    updated_at: string;

    /**
     * Whether the post is banned.
     */
    is_banned: boolean;

    /**
     * The Pixiv ID of the post (if imported from Pixiv).
     */
    pixiv_id: number;

    /**
     * The date and time when the last comment was made on the post.
     */
    last_commented_at: string;

    /**
     * Whether the post has active children.
     */
    has_active_children: boolean;

    /**
     * The bit flags associated with the post.
     */
    bit_flags: number;

    /**
     * The number of meta tags associated with the post.
     */
    tag_count_meta: number;

    /**
     * Whether the post has a large version available.
     */
    has_large: boolean;

    /**
     * Whether the post has visible children.
     */
    has_visible_children: boolean;

    /**
     * The media asset information associated with the post.
     */
    media_asset: MediaAsset;

    /**
     * The general tag string associated with the post.
     */
    tag_string_general: string;

    /**
     * The character tag string associated with the post.
     */
    tag_string_character: string;

    /**
     * The copyright tag string associated with the post.
     */
    tag_string_copyright: string;

    /**
     * The artist tag string associated with the post.
     */
    tag_string_artist: string;

    /**
     * The meta tag string associated with the post.
     */
    tag_string_meta: string;

    /**
     * The URL of the post's image file.
     */
    file_url: string;

    /**
     * The URL of the post's large version image file.
     */
    large_file_url: string;

    /**
     * The URL of the post's preview image file.
     */
    preview_file_url: string;

    /**
     * Create a new DanbooruPost object.
     * @param {DanbooruPostResponse} response - The JSON response representing the Danbooru post.
     */
    constructor(response: DanbooruPostResponse) {
        this.id = response.id;
        this.created_at = response.created_at;
        this.uploader_id = response.uploader_id;
        this.score = response.score;
        this.source = response.source;
        this.md5 = response.md5;
        this.last_comment_bumped_at = response.last_comment_bumped_at;
        this.rating = response.rating;
        this.image_width = response.image_width;
        this.image_height = response.image_height;
        this.tag_string = response.tag_string;
        this.fav_count = response.fav_count;
        this.file_ext = response.file_ext;
        this.last_noted_at = response.last_noted_at;
        this.parent_id = response.parent_id;
        this.has_children = response.has_children;
        this.approver_id = response.approver_id;
        this.tag_count_general = response.tag_count_general;
        this.tag_count_artist = response.tag_count_artist;
        this.tag_count_character = response.tag_count_character;
        this.tag_count_copyright = response.tag_count_copyright;
        this.file_size = response.file_size;
        this.up_score = response.up_score;
        this.down_score = response.down_score;
        this.is_pending = response.is_pending;
        this.is_flagged = response.is_flagged;
        this.is_deleted = response.is_deleted;
        this.tag_count = response.tag_count;
        this.updated_at = response.updated_at;
        this.is_banned = response.is_banned;
        this.pixiv_id = response.pixiv_id;
        this.last_commented_at = response.last_commented_at;
        this.has_active_children = response.has_active_children;
        this.bit_flags = response.bit_flags;
        this.tag_count_meta = response.tag_count_meta;
        this.has_large = response.has_large;
        this.has_visible_children = response.has_visible_children;
        this.media_asset = response.media_asset;
        this.tag_string_general = response.tag_string_general;
        this.tag_string_character = response.tag_string_character;
        this.tag_string_copyright = response.tag_string_copyright;
        this.tag_string_artist = response.tag_string_artist;
        this.tag_string_meta = response.tag_string_meta;
        this.file_url = response.file_url;
        this.large_file_url = response.large_file_url;
        this.preview_file_url = response.preview_file_url;
    }
}

/**
 * Represents the JSON response from the Danbooru API for a pool.
 */
interface DanbooruPoolResponse {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
    post_ids: number[];
    category: string;
    post_count: number;
}

/**
 * Represents a Danbooru pool containing related posts.
 */
export class DanbooruPools {
    /**
     * The unique identifier of the pool.
     */
    id: number;

    /**
     * The name of the pool.
     */
    name: string;

    /**
     * The creation date of the pool.
     */
    created_at: string;

    /**
     * The last update date of the pool.
     */
    updated_at: string;

    /**
     * The description of the pool.
     */
    description: string;

    /**
     * Indicates whether the pool is active or not.
     */
    is_active: boolean;

    /**
     * Indicates whether the pool is deleted or not.
     */
    is_deleted: boolean;

    /**
     * An array of post IDs that are part of the pool.
     */
    post_ids: number[];

    /**
     * The category of the pool.
     */
    category: string;

    /**
     * The total number of posts in the pool.
     */
    post_count: number;

    /**
     * Creates a new DanbooruPools instance.
     * @param {DanbooruPoolResponse} response - The response object from the Danbooru API.
     */
    constructor(response: DanbooruPoolResponse) {
        this.id = response.id;
        this.name = response.name;
        this.created_at = response.created_at;
        this.updated_at = response.updated_at;
        this.description = response.description;
        this.is_active = response.is_active;
        this.is_deleted = response.is_deleted;
        this.post_ids = response.post_ids;
        this.category = response.category;
        this.post_count = response.post_count;
    }
}

/**
 * Represents the tag object returned from the Danbooru API.
 */
interface DanbooruTagObject {
    id: number;
    name: string;
    post_count: number;
}

/**
 * Represents the JSON response from the Danbooru API for related tags.
 */
interface DanbooruRelatedTagsResponse {
    query: string;
    post_count: number;
    tag: DanbooruTagObject;
    related_tags: DanbooruTagObject[];
}

/**
 * Represents a set of related tags returned from the Danbooru API.
 */
export class DanbooruRelatedTags {
    /**
     * The tag used to find related tags.
     */
    query: string;

    /**
     * The total number of posts associated with the query tag.
     */
    post_count: number;

    /**
     * The primary tag object.
     */
    tag: object;

    /**
     * An array of related tags.
     */
    related_tags: object[];

    /**
     * Create a new DanbooruRelatedTags instance.
     * @param {DanbooruRelatedTagsResponse} response - The response object from the Danbooru API.
     */
    constructor(response: DanbooruRelatedTagsResponse) {
        this.query = response.query;
        this.post_count = response.post_count;
        this.tag = response.tag;
        this.related_tags = response.related_tags;
    }
}

/**
 * Options class for configuring API interaction with Danbooru.
 */
export class DanbooruOptions {
    /**
     * The username used for authenticating API requests.
     */
    username: string | undefined;

    /**
     * The API key used for authentication.
     */
    apiKey: string | undefined;

    /**
     * Create a new instance of DanbooruOptions.
     * @param {Object} options - The options object for configuring the API interaction.
     * @param {string} options.username - The username for authenticating the API requests.
     * @param {string} options.apiKey - The API key used for authentication.
     */
    constructor(options: { username?: string; apiKey?: string }) {
        this.username = options?.username;
        this.apiKey = options?.apiKey;
    }
}

/**
 * Options class for configuring API interaction with Danbooru Post.
 */
export class PostOptions {
    /**
     * The maximum number of posts to retrieve per API request.
     */
    limit: number | undefined;

    /**
     * The page number of results to retrieve.
     */
    page: number | undefined;

    /**
     * The tags used to filter the posts by.
     */
    tags: string | undefined;

    /**
     * The MD5 hash of the post to retrieve.
     */
    md5: string | undefined;

    /**
     * Determines whether to get raw API response or parsed data.
     */
    raw: boolean | undefined;

    /**
     * Create a new instance of PostOptions.
     * @param {Object} options - The options object for configuring the API interaction.
     * @param {number} options.limit - The maximum number of posts to retrieve per API request.
     * @param {number} options.page - The page number of results to retrieve.
     * @param {string} options.tags - The tags used to filter the posts by.
     * @param {string} options.md5 - The MD5 hash of the post to retrieve.
     * @param {boolean} options.raw - Determines whether to get raw API response or parsed data.
     */
    constructor(options: {
        limit?: number;
        page?: number;
        tags?: string;
        md5?: string;
        raw?: boolean;
    }) {
        this.limit = options?.limit;
        this.page = options?.page;
        this.tags = options?.tags;
        this.md5 = options?.md5;
        this.raw = options?.raw;
    }
}

/**
 * Represents a user from the Danbooru API.
 */
interface DanbooruUserResponse {
    id: number;
    name: string;
    level: number;
    inviter_id: number | null;
    created_at: string;
    post_update_count: number;
    note_update_count: number;
    post_upload_count: number;
    is_deleted: boolean;
    level_string: string;
    is_banned: boolean;
    wiki_page_version_count: number;
    artist_version_count: number;
    artist_commentary_version_count: number;
    pool_version_count: number;
    forum_post_count: number;
    comment_count: number;
    favorite_group_count: number;
    appeal_count: number;
    flag_count: number;
    positive_feedback_count: number;
    neutral_feedback_count: number;
    negative_feedback_count: number;
}

/**
 * Represents a user from the Danbooru API with various properties.
 */
class DanbooruUser {
    /**
     * The ID of the user.
     */
    id: number;

    /**
     * The name of the user.
     */
    name: string;

    /**
     * The level of the user.
     */
    level: number;

    /**
     * The ID of the inviter (if any) who invited the user.
     */
    inviter_id: number | null;

    /**
     * The date and time when the user was created.
     */
    created_at: string;

    /**
     * The number of post updates made by the user.
     */
    post_update_count: number;

    /**
     * The number of note updates made by the user.
     */
    note_update_count: number;

    /**
     * The number of post uploads made by the user.
     */
    post_upload_count: number;

    /**
     * Indicates whether the user is deleted.
     */
    is_deleted: boolean;

    /**
     * The level string of the user.
     */
    level_string: string;

    /**
     * Indicates whether the user is banned.
     */
    is_banned: boolean;

    /**
     * The number of wiki page versions created by the user.
     */
    wiki_page_version_count: number;

    /**
     * The number of artist versions created by the user.
     */
    artist_version_count: number;

    /**
     * The number of artist commentary versions created by the user.
     */
    artist_commentary_version_count: number;

    /**
     * The number of pool versions created by the user.
     */
    pool_version_count: number;

    /**
     * The number of forum posts made by the user.
     */
    forum_post_count: number;

    /**
     * The number of comments made by the user.
     */
    comment_count: number;

    /**
     * The number of favorite groups created by the user.
     */
    favorite_group_count: number;

    /**
     * The number of appeals made by the user.
     */
    appeal_count: number;

    /**
     * The number of flags raised by the user.
     */
    flag_count: number;

    /**
     * The number of positive feedback received by the user.
     */
    positive_feedback_count: number;

    /**
     * The number of neutral feedback received by the user.
     */
    neutral_feedback_count: number;

    /**
     * The number of negative feedback received by the user.
     */
    negative_feedback_count: number;

    /**
     * Creates a new instance of the DanbooruUser class.
     * @param {DanbooruUserResponse} response - The raw response object from the API.
     */
    constructor(response: DanbooruUserResponse) {
        this.id = response.id;
        this.name = response.name;
        this.level = response.level;
        this.inviter_id = response.inviter_id;
        this.created_at = response.created_at;
        this.post_update_count = response.post_update_count;
        this.note_update_count = response.note_update_count;
        this.post_upload_count = response.post_upload_count;
        this.is_deleted = response.is_deleted;
        this.level_string = response.level_string;
        this.is_banned = response.is_banned;
        this.wiki_page_version_count = response.wiki_page_version_count;
        this.artist_version_count = response.artist_version_count;
        this.artist_commentary_version_count =
            response.artist_commentary_version_count;
        this.pool_version_count = response.pool_version_count;
        this.forum_post_count = response.forum_post_count;
        this.comment_count = response.comment_count;
        this.favorite_group_count = response.favorite_group_count;
        this.appeal_count = response.appeal_count;
        this.flag_count = response.flag_count;
        this.positive_feedback_count = response.positive_feedback_count;
        this.neutral_feedback_count = response.neutral_feedback_count;
        this.negative_feedback_count = response.negative_feedback_count;
    }
}

/**
 * Danbooru API Wrapper.
 * @class
 * @classdesc A class for interacting with the Danbooru API.
 */
export class Danbooru extends Utility {
    private API_URL: string = "https://danbooru.donmai.us";
    private headers: Record<string, string>;
    private options: DanbooruOptions;

    /**
     * Create a new instance of Danbooru.
     * @param {Object} options - Options for configuring API interaction.
     * @param {string} options.username - The username for API authentication.
     * @param {string} options.apiKey - The API key for authentication.
     */
    constructor(options: { username: string; apiKey: string }) {
        super();
        this.options =
            options instanceof DanbooruOptions
                ? options
                : new DanbooruOptions(options);
        this.headers = {
            Authorization: `Basic ${Buffer.from(
                `${options?.username}:${options?.apiKey}`,
            ).toString("base64")}`,
            "Content-Type": "application/json",
        };
    }

    async user_show(user_id: number) {
        const fetch = await this.__fetch(`users/${user_id}.json`);
        return new DanbooruUser(await fetch.json());
    }

    /**
     * Fetch a random post from Danbooru.
     * @returns {Promise<DanbooruPost>} A random Danbooru post.
     */
    async post_random(): Promise<DanbooruPost> {
        const fetch = await this.__fetch(`posts/random.json`);
        return new DanbooruPost(await fetch.json());
    }

    /**
     * Query posts from Danbooru with optional parameters.
     * @param {Object} query - Query parameters to filter posts.
     * @returns {Promise<DanbooruPost[]>} An array of Danbooru posts that match the query.
     */
    async post_index(query: Record<string, string>): Promise<DanbooruPost[]> {
        const fetch = await this.__fetch(`posts.json`, query);
        const posts = await fetch.json();
        return posts.map(
            (post: DanbooruPostResponse) => new DanbooruPost(post),
        );
    }

    /**
     * Get a specific post by its ID from Danbooru.
     * @param {number} post_id - The ID of the post to retrieve.
     * @returns {Promise<DanbooruPost>} The Danbooru post with the specified ID.
     */
    async post_show(post_id: number): Promise<DanbooruPost> {
        const fetch = await this.__fetch(`posts/${post_id}.json`);
        return new DanbooruPost(await fetch.json());
    }

    /**
     * Get a specific pools by its ID from Danbooru.
     * @param {number} pools_id - The ID of the post to retrieve.
     * @returns {Promise<DanbooruPools>} The Danbooru pools with the specified ID.
     */
    async pools_show(pools_id: number): Promise<DanbooruPools> {
        const fetch = await this.__fetch(`pools/${pools_id}.json`);
        return new DanbooruPools(await fetch.json());
    }

    /**
     * Get related tags based on the given query.
     * @param {string} query - REQUIRED: The tag to find the related tags for.
     * @param {string} [category] - If specified, show only tags of a specific category. Can be: general, artist, copyright, character, meta
     * @param {string} [order] - If specified, the order of the results. Can be: desc, Cosine, Jaccard, Overlap, Frequency
     * @returns {Promise<DanbooruRelatedTags>} An array of related tags.
     */
    async related_tag(
        query: string,
        category?: string,
        order?: string,
    ): Promise<DanbooruRelatedTags> {
        const fetch = await this.__fetch(`related_tag.json`, {
            query,
            category: category || "",
            order: order || "",
        });
        return new DanbooruRelatedTags(await fetch.json());
    }

    /**
     * Downloads an image or video using the Post ID.
     * @param {number} post_id - The Post ID to download the file for.
     * @param {string} [filename] - (Optional) The custom filename for the downloaded file. If not provided, the default filename will be used based on the Post ID and file extension.
     * @returns {Promise<void>} A Promise that resolves when the video is downloaded successfully or rejects on error.
     */
    async download_post(post_id: number, filename?: string): Promise<void> {
        try {
            const fetchPost = await this.post_show(post_id);
            const fetchUploader = await this.user_show(fetchPost.uploader_id);
            process.stdout.write(
                `[INFO] Post retrieved by ${fetchUploader.name}.\n`,
            );

            const response = await fetch(fetchPost.file_url);
            const contentLength = parseInt(
                response.headers.get("content-length") ?? "0",
                10,
            );
            process.stdout.write(
                `[INFO] Download URL retrieved: '${response.url}'\n`,
            );

            const fileExtention = path
                .extname(path.basename(response.url))
                .slice(1);
            const _filename = `${filename ?? fetchPost.id}.${fileExtention}`;
            this.save(response, contentLength, _filename);
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
     * @param {string} method - The HTTP method for the request (default is 'GET').
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
            headers:
                this.options.username && this.options.apiKey
                    ? this.headers
                    : {},
            body: JSON.stringify(parameters),
        };

        return await fetch(url, options);
    }
}
