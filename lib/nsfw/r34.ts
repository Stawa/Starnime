import xml2js from "xml2js";
import cheerio from "cheerio";
import { StarError } from "../api";
import path from "path";
import { getCustomURL } from "../request";
import { Utility } from "../utility";

/**
 * Represents the JSON response of a post from the Rule34 API.
 */
interface PostR34Response {
    preview_url: string;
    sample_url: string;
    file_url: string;
    directory: number;
    hash: string;
    width: number;
    height: number;
    id: number;
    image: string;
    change: number;
    owner: string;
    parent_id: number;
    rating: string;
    sample: boolean;
    sample_height: number;
    sample_width: number;
    score: number;
    tags: string;
    source: string;
    status: string;
    has_notes: boolean;
    comment_count: number;
}

/**
 * Represents a post from the Rule34 API.
 * @class
 * @classdesc This class represents a post with various properties.
 */
export class PostR34 {
    /**
     * The URL of the post's preview image.
     */
    preview_url: string;

    /**
     * The URL of the post's sample image.
     */
    sample_url: string;

    /**
     * The URL of the post's full image or video.
     */
    file_url: string;

    /**
     * The directory ID of the post.
     */
    directory: number;

    /**
     * The hash of the post.
     */
    hash: string;

    /**
     * The width of the post's image or video.
     */
    width: number;

    /**
     * The height of the post's image or video.
     */
    height: number;

    /**
     * The ID of the post.
     */
    id: number;

    /**
     * The filename of the post's image or video.
     */
    image: string;

    /**
     * The timestamp of when the post was last changed.
     */
    change: number;

    /**
     * The owner of the post.
     */
    owner: string;

    /**
     * The parent ID of the post.
     */
    parent_id: number;

    /**
     * The rating of the post.
     */
    rating: string;

    /**
     * Indicates if the post is a sample.
     */
    sample: boolean;

    /**
     * The height of the post's sample image.
     */
    sample_height: number;

    /**
     * The width of the post's sample image.
     */
    sample_width: number;

    /**
     * The score of the post.
     */
    score: number;

    /**
     * The tags associated with the post.
     */
    tags: string[];

    /**
     * The source of the post.
     */
    source: string;

    /**
     * The status of the post.
     */
    status: string;

    /**
     * Indicates if the post has notes.
     */
    has_notes: boolean;

    /**
     * The number of comments on the post.
     */
    comment_count: number;

    /**
     * Create a new PostR34 instance.
     * @param {PostR34Response} response - The raw response object from the API.
     */
    constructor(response: PostR34Response) {
        this.preview_url = response.preview_url;
        this.sample_url = response.sample_url;
        this.file_url = response.file_url;
        this.directory = response.directory;
        this.hash = response.hash;
        this.width = response.width;
        this.height = response.height;
        this.id = response.id;
        this.image = response.image;
        this.change = response.change;
        this.owner = response.owner;
        this.parent_id = response.parent_id;
        this.rating = response.rating;
        this.sample = response.sample;
        this.sample_height = response.sample_height;
        this.sample_width = response.sample_width;
        this.score = response.score;
        this.tags = response.tags.split(" ");
        this.source = response.source;
        this.status = response.status;
        this.has_notes = response.has_notes;
        this.comment_count = response.comment_count;
    }
}

/**
 * Represents the JSON response of a comment on a post from the Rule34 API.
 */
interface PostCommentR34Response {
    created_at: string;
    post_id: number;
    body: string;
    creator: string;
    id: number;
    creator_id: number;
}

/**
 * Represents a comment on a post from the Rule34 API.
 * @class
 * @classdesc This class encapsulates the properties of a post comment.
 */
export class PostCommentsR34 {
    /**
     * The creation timestamp of the comment.
     */
    created_at: string;

    /**
     * The ID of the post the comment belongs to.
     */
    post_id: number;

    /**
     * The body or content of the comment.
     */
    body: string;

    /**
     * The creator or author of the comment.
     */
    creator: string;

    /**
     * The ID of the comment.
     */
    id: number;

    /**
     * The ID of the creator or author of the comment.
     */
    creator_id: number;

    /**
     * Creates a new instance of the PostCommentsR34 class.
     * @param {PostCommentR34Response} response - The raw response object from the API.
     */
    constructor(response: PostCommentR34Response) {
        this.created_at = response.created_at;
        this.post_id = response.post_id;
        this.body = response.body;
        this.creator = response.creator;
        this.id = response.id;
        this.creator_id = response.creator_id;
    }
}

/**
 * Represents the JSON response of top tags from the Rule34 API.
 */
interface R34TopTagsResponse {
    rank: number;
    name: string;
    percentage: string;
}

/**
 * Represents top tags from the Rule34 API.
 * @class
 * @classdesc This class encapsulates the properties of top tags.
 */
export class R34TopTags {
    /**
     * The rank of the tag.
     */
    rank: number;

    /**
     * The name of the tag.
     */
    name: string;

    /**
     * The percentage representation of the tag's popularity.
     */
    percentage: string;

    /**
     * Creates a new instance of the R34TopTags class.
     * @param {R34TopTagsResponse} response - The raw response object from the API.
     */
    constructor(response: R34TopTagsResponse) {
        this.rank = response.rank;
        this.name = response.name;
        this.percentage = response.percentage;
    }
}

/**
 * The R34 class provides methods for interacting with the Rule34 API.
 * @class
 * @classdesc This class encapsulates functionality related to Rule34 API.
 */
export class R34 extends Utility {
    BASE_URL: string;
    API_URL: string;
    POST_URL: string;
    COMMENTS_URL: string;
    RANDOM_URL: string;
    TOP_TAGS: string;
    POOL_URL: string;

    /**
     * Creates a new instance of the R34 class.
     */
    constructor() {
        super();
        this.BASE_URL = "https://rule34.xxx";
        this.API_URL = "https://api.rule34.xxx";
        this.POST_URL = `${this.API_URL}/index.php?page=dapi&s=post&q=index&json=1`;
        this.COMMENTS_URL = `${this.API_URL}/index.php?page=dapi&s=comment&q=index`;
        this.RANDOM_URL = `${this.BASE_URL}/index.php?page=post&s=random`;
        this.TOP_TAGS = `${this.BASE_URL}/index.php?page=toptags`;
        this.POOL_URL = `${this.BASE_URL}/index.php?page=pool&s=show`;
    }

    /**
     * Performs a search with the specified limit and tags.
     * @param {number} limit - The maximum number of results to retrieve.
     * @param {string[]} tags - The tags to search for. Can be provided as a single string or an array of strings.
     * @returns {Promise<PostR34[]>} A promise that resolves with an array of PostR34 objects when the search is complete.
     */
    async search(limit: number, tags: string[]): Promise<PostR34[]> {
        const response = await getCustomURL(
            this.POST_URL + `&limit=${limit}&tags=${tags.join("+")}`,
        );
        const searchResults = await response.json();
        const arrayPost: PostR34[] = [];

        for (const obj of searchResults) {
            arrayPost.push(new PostR34(obj));
        }

        return arrayPost;
    }

    /**
     * Retrieves a post with the specified post ID.
     * @param {string | number} post_id - The ID of the post to retrieve.
     * @returns {Promise<PostR34>} A promise that resolves with a PostR34 object representing the retrieved post.
     */
    async get_post(post_id: string | number): Promise<PostR34> {
        const response = await getCustomURL(`${this.POST_URL}&id=${post_id}`);
        const responseData = await response.json();
        return new PostR34(responseData[0]);
    }

    /**
     * Retrieves comments for a post with the specified post ID.
     * @param {string | number} post_id - The ID of the post to retrieve comments for.
     * @returns {Promise<PostCommentsR34[]>} A promise that resolves with an array of PostCommentsR34 objects representing the retrieved comments.
     * @throws {StarError} If the retrieval of the comments fails or an error occurs during post retrieval.
     */
    async get_comments(post_id: string | number): Promise<PostCommentsR34[]> {
        const response = await getCustomURL(
            `${this.COMMENTS_URL}&post_id=${post_id}`,
        );
        const responseData = await response.text();

        return new Promise<PostCommentsR34[]>((resolve, reject) => {
            interface Xml2JsResult {
                comments?: {
                    comment: {
                        $: {
                            created_at: string;
                            post_id: number;
                            body: string;
                            creator: string;
                            id: number;
                            creator_id: number;
                        };
                    }[];
                };
            }

            const parser = new xml2js.Parser();
            parser.parseString(
                responseData,
                (err: Error | null, result: Xml2JsResult) => {
                    if (err) return reject(err);

                    const comments = result.comments?.comment || [];

                    if (comments.length === 0)
                        throw new StarError(
                            "UNAVAILABLE_POST_COMMENTS",
                            "There are no comments on that post.",
                            0,
                        );

                    const postR34Comments = comments.map(
                        (comment) => new PostCommentsR34(comment.$),
                    );

                    resolve(postR34Comments);
                },
            );
        });
    }

    /**
     * Retrieve a random post from Rule34 website.
     * @throws {StarError} If the retrieval of the random post fails or an error occurs during post retrieval.
     * @returns {Promise<PostR34>} The random post.
     */
    async get_random_post(): Promise<PostR34> {
        const response = await getCustomURL(this.RANDOM_URL);
        const postId = this.extractIdFromURL(response.url);

        if (!postId)
            throw new StarError(
                "UNEXPECTED_ERROR",
                "The random Post ID returned null",
                0,
            );

        return this.get_post(postId);
    }

    /**
     * Retrieves the top tags from a custom URL.
     * @returns {Promise<R34TopTags[]>} A Promise that resolves to an array of `R34TopTags` objects representing the top tags.
     */
    async top_tags(): Promise<R34TopTags[]> {
        const response = await getCustomURL(this.TOP_TAGS);
        const $ = cheerio.load(await response.text());
        const table = $(".server-assigns");
        const tableRows = table.find("tr");
        const results: R34TopTags[] = [];

        for (let index = 2; index < tableRows.length; index++) {
            const row = tableRows.eq(index);
            const columns = row.find("td");

            if (columns.length >= 3) {
                const tagNumber = columns.eq(0).text().replace("#", "");
                const tagName = columns.eq(1).text();
                const percentage = columns.eq(2).text();

                const tag = new R34TopTags({
                    rank: Number(tagNumber),
                    name: tagName,
                    percentage: percentage,
                });

                results.push(tag);
            }
        }

        return results;
    }

    /**
     * Retrieves posts from a specific pool.
     * @param {string | number} pool_id - The ID of the pool to retrieve.
     * @returns {Promise<PostR34[]>} A promise that resolves with an array of PostR34 objects representing the posts in the pool.
     * @throws {StarError} If the retrieval of the pool fails or an error occurs during post retrieval.
     */
    async get_pool(pool_id: string | number): Promise<PostR34[]> {
        const response = await getCustomURL(`${this.POOL_URL}&id=${pool_id}`);
        const $ = cheerio.load(await response.text());
        const spans = $("span");
        const promises: Promise<PostR34>[] = [];

        spans.each((_index, element) => {
            const anchorTags = $(element).find("a");

            anchorTags.each((_index, anchorTag) => {
                const href = $(anchorTag).attr("href");

                if (href) {
                    const postId = this.extractIdFromURL(href);

                    if (postId === null)
                        throw new StarError(
                            "UNEXPECTED_ERROR",
                            "The Post ID returned null",
                            0,
                        );

                    const promise = this.get_post(postId);
                    promises.push(promise);
                }
            });
        });

        const results = await Promise.all(promises);
        return results;
    }

    /**
     * Downloads a post with the given post ID.
     * @param {string} post_id - The ID of the post to download.
     * @param {string} filename - (Optional) The desired filename for the downloaded post.
     * @returns {Promise<void>} A Promise that resolves when the video is downloaded successfully or rejects on error.
     */
    async download_post(post_id: string, filename?: string): Promise<void> {
        try {
            const fetchPost = await this.get_post(post_id);
            process.stdout.write(
                `[INFO] Post retrieved by ${fetchPost.owner}.\n`,
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
}
