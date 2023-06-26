const xml2js = require('xml2js');
const cheerio = require('cheerio');
const {
	StarError
} = require('../index');
const {
	getCustomURL
} = require('../request');

/**
 * Represents a post from the Rule34 API.
 * @class
 * @classdesc This class represents a post with various properties.
 */
class PostR34 {
	/**
	 * Create a new PostR34 instance.
	 * @constructor
	 * @param {object} response - The raw response object from the API.
	 */
	constructor(response) {
		/**
		 * The URL of the post's preview image.
		 * @type {string}
		 */
		this.preview_url = response.preview_url;

		/**
		 * The URL of the post's sample image.
		 * @type {string}
		 */
		this.sample_url = response.sample_url;

		/**
		 * The URL of the post's full image or video.
		 * @type {string}
		 */
		this.file_url = response.file_url;

		/**
		 * The directory ID of the post.
		 * @type {number}
		 */
		this.directory = response.directory;

		/**
		 * The hash of the post.
		 * @type {string}
		 */
		this.hash = response.hash;

		/**
		 * The width of the post's image or video.
		 * @type {number}
		 */
		this.width = response.width;

		/**
		 * The height of the post's image or video.
		 * @type {number}
		 */
		this.height = response.height;

		/**
		 * The ID of the post.
		 * @type {number}
		 */
		this.id = response.id;

		/**
		 * The filename of the post's image or video.
		 * @type {string}
		 */
		this.image = response.image;

		/**
		 * The timestamp of when the post was last changed.
		 * @type {number}
		 */
		this.change = response.change;

		/**
		 * The owner of the post.
		 * @type {string}
		 */
		this.owner = response.owner;

		/**
		 * The parent ID of the post.
		 * @type {number}
		 */
		this.parent_id = response.parent_id;

		/**
		 * The rating of the post.
		 * @type {string}
		 */
		this.rating = response.rating;

		/**
		 * Indicates if the post is a sample.
		 * @type {boolean}
		 */
		this.sample = response.sample;

		/**
		 * The height of the post's sample image.
		 * @type {number}
		 */
		this.sample_height = response.sample_height;

		/**
		 * The width of the post's sample image.
		 * @type {number}
		 */
		this.sample_width = response.sample_width;

		/**
		 * The score of the post.
		 * @type {number}
		 */
		this.score = response.score;

		/**
		 * The tags associated with the post.
		 * @type {string[]}
		 */
		this.tags = response.tags.split(' ');

		/**
		 * The source of the post.
		 * @type {string}
		 */
		this.source = response.source;

		/**
		 * The status of the post.
		 * @type {string}
		 */
		this.status = response.status;

		/**
		 * Indicates if the post has notes.
		 * @type {boolean}
		 */
		this.has_notes = response.has_notes;

		/**
		 * The number of comments on the post.
		 * @type {number}
		 */
		this.comment_count = response.comment_count;
	}
}


/**
 * Represents a comment on a post from the Rule34 API.
 * @class
 * @classdesc This class encapsulates the properties of a post comment.
 */
class PostCommentsR34 {
	/**
	 * Creates a new instance of the PostCommentsR34 class.
	 * @constructor
	 * @param {object} response - The raw response object from the API.
	 */
	constructor(response) {
		/**
		 * The creation timestamp of the comment.
		 * @type {string}
		 */
		this.created_at = response.created_at;

		/**
		 * The ID of the post the comment belongs to.
		 * @type {number}
		 */
		this.post_id = response.post_id;

		/**
		 * The body or content of the comment.
		 * @type {string}
		 */
		this.body = response.body;

		/**
		 * The creator or author of the comment.
		 * @type {string}
		 */
		this.creator = response.creator;

		/**
		 * The ID of the comment.
		 * @type {number}
		 */
		this.id = response.id;

		/**
		 * The ID of the creator or author of the comment.
		 * @type {number}
		 */
		this.creator_id = response.creator_id;
	}
}

/**
 * Represents top tags from the Rule34 API.
 * @class
 * @classdesc This class encapsulates the properties of top tags.
 */
class R34TopTags {
	/**
	 * Creates a new instance of the R34TopTags class.
	 * @constructor
	 * @param {object} response - The raw response object from the API.
	 */
	constructor(response) {
		/**
		 * The rank of the tag.
		 * @type {number}
		 */
		this.rank = response.rank;

		/**
		 * The name of the tag.
		 * @type {string}
		 */
		this.name = response.name;

		/**
		 * The percentage representation of the tag's popularity.
		 * @type {string}
		 */
		this.percentage = response.percentage;
	}
}
/**
 * The R34 class provides methods for interacting with the Rule34 API.
 * @class
 * @classdesc This class encapsulates functionality related to Rule34 API.
 */
class R34 {
	constructor() {
		this.BASE_URL = 'https://rule34.xxx'
		this.API_URL = 'https://api.rule34.xxx';
		this.POST_URL = `${this.API_URL}/index.php?page=dapi&s=post&q=index&json=1`;
		this.COMMENTS_URL = `${this.API_URL}/index.php?page=dapi&s=comment&q=index`;
		this.RANDOM_URL = `${this.BASE_URL}/index.php?page=post&s=random`;
		this.TOP_TAGS = `${this.BASE_URL}/index.php?page=toptags`;
		this.POOL_URL = `${this.BASE_URL}/index.php?page=pool&s=show`
	}

	/**
	 * Performs a search with the specified limit and tags.
	 * @param {number} limit - The maximum number of results to retrieve.
	 * @param {string[]} tags - The tags to search for. Can be provided as a single string or an array of strings.
	 * @returns {Promise<PostR34[]>} A promise that resolves with an array of PostR34 objects when the search is complete.
	 */
	async search(limit, tags) {
		const response = await getCustomURL(this.POST_URL + `&limit=${limit}&tags=${tags.join('+')}`);

		const searchResults = await response.json();
		const arrayPost = [];

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
	async get_post(post_id) {
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
	async get_comments(post_id) {
		const response = await getCustomURL(`${this.COMMENTS_URL}&post_id=${post_id}`);
		const responseData = await response.text();

		return new Promise((resolve, reject) => {
			const parser = new xml2js.Parser();
			parser.parseString(responseData, (err, result) => {
				if (err) return reject(err);

				const comments = result.comments?.comment || [];

				if (comments.length === 0) throw new StarError('UNAVAILABLE_POST_COMMENTS', 'There are no comments on that post.', 0)

				const postR34Comments = comments.map(comment => new PostCommentsR34(comment.$));

				resolve(postR34Comments);
			});
		});
	}

	/**
	 * Retrieve a random post from Rule34 website.
	 * @throws {StarError} If the retrieval of the random post fails or an error occurs during post retrieval.
	 * @returns {Promise<PostR34>} The random post.
	 */
	async get_random_post() {
		const response = await getCustomURL(this.RANDOM_URL);
		const postId = this.extractIdFromURL(response.url);

		if (!postId) throw new StarError('UNEXPECTED_ERROR', 'The random Post ID returned null', 0);
		return this.get_post(postId)
	}

	/**
	 * Retrieves the top tags from a custom URL.
	 * @returns {Promise<R34TopTags[]>} A Promise that resolves to an array of `R34TopTags` objects representing the top tags.
	 */
	async top_tags() {
		const response = await getCustomURL(this.TOP_TAGS);
		const $ = cheerio.load(await response.text());
		const table = $('.server-assigns');
		const tableRows = table.find('tr');
		const results = [];

		for (let index = 2; index < tableRows.length; index++) {
			const row = tableRows.eq(index);
			const columns = row.find('td');

			if (columns.length >= 3) {
				const tagNumber = columns.eq(0).text().replace('#', '');
				const tagName = columns.eq(1).text();
				const percentage = columns.eq(2).text();

				const tag = new R34TopTags({
					rank: tagNumber,
					name: tagName,
					percentage: percentage
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
	async get_pool(pool_id) {
		const response = await getCustomURL(`${this.POOL_URL}&id=${pool_id}`);
		const $ = cheerio.load(await response.text());
		const spans = $('span');
		const promises = [];

		spans.each((_index, element) => {
			const anchorTags = $(element).find('a');

			anchorTags.each((_index, anchorTag) => {
				const href = $(anchorTag).attr('href');

				if (href) {
					const postId = this.extractIdFromURL(href);

					if (postId === null) throw new StarError('UNEXPECTED_ERROR', 'The Post ID returned null', 0);

					const promise = this.get_post(postId);
					promises.push(promise);
				}
			});
		});

		const results = await Promise.all(promises);
		return results;
	}

	/**
	 * Extract the ID from a Rule34 post URL.
	 * @param {string} url - The post URL.
	 * @returns {string | null} The extracted ID or null if not found.
	 */
	extractIdFromURL(url) {
		const regex = /id=(\d+)/;
		const match = url.match(regex);
		return match ? match[1] : null;
	}
}

module.exports = {
	PostR34,
	PostCommentsR34,
	R34TopTags,
	R34
}
