const {
	getCustomURL
} = require("../request")

class DiscordEmbed {
	/**
	 * Creates an instance of the DiscordEmbed class.
	 */
	constructor() {
		/**
		 * The payload object that holds the properties of the embed.
		 * @type {Object}
		 */
		this.payload = {
			embeds: {
				fields: []
			}
		};
	}

	/**
	 * Sets the author of the payload.
	 * @param {string} name - The name of the author.
	 * @param {string} [url] - The URL associated with the author.
	 * @param {string} [icon_url] - The URL of the author's icon.
	 * @param {string} [proxy_icon_url] - The proxy URL of the author's icon.
	 */
	setAuthor(name, url, icon_url, proxy_icon_url) {
		this.payload.embeds.author = {
			name: name,
			url: url,
			icon_url: icon_url,
			proxy_icon_url: proxy_icon_url
		};
		return this;
	}

	/**
	 * Sets the title of the payload.
	 * @param {string} title - The title of the payload.
	 */
	setTitle(title) {
		this.payload.embeds.title = title;
		return this;
	}

	/**
	 * Sets the description of the payload.
	 * @param {string} description - The description of the payload.
	 */
	setDescription(description) {
		this.payload.embeds.description = description;
		return this;
	}

	/**
	 * Sets the URL of the payload.
	 * @param {string} url - The URL associated with the payload.
	 */
	setURL(url) {
		this.payload.embeds.url = url;
		return this;
	}

	/**
	 * Sets the timestamp of the payload.
	 * @param {string | any} [timestamp] - The timestamp of the payload. If not provided, the current timestamp is used.
	 */
	setTimestamp(timestamp) {
		this.payload.embeds.timestamp = timestamp || new Date().toISOString();
		return this;
	}

	/**
	 * Sets the color of the payload.
	 * @param {string | number[]} color - The color of the payload. This can be a string representing a color name or a hexadecimal value, or an array of RGB or RGBA values.
	 */
	setColor(color) {
		this.payload.embeds.color = this.__parseColor(color);
		return this;
	}

	/**
	 * Sets the footer of the payload.
	 * @param {string} text - The text of the footer.
	 * @param {string} [icon_url] - The URL of the footer's icon.
	 * @param {string} [proxy_icon_url] - The proxy URL of the footer's icon.
	 */
	setFooter(text, icon_url, proxy_icon_url) {
		this.payload.embeds.footer = {
			text: text,
			icon_url: icon_url,
			proxy_icon_url: proxy_icon_url
		};
		return this;
	}

	/**
	 * Sets the image of the payload.
	 * @param {string} url - The URL of the image.
	 * @param {string} [proxy_url] - The proxy URL of the image.
	 * @param {string} [height] - The height of the image.
	 * @param {string} [width] - The width of the image.
	 */
	setImage(url, proxy_url, height, width) {
		this.payload.embeds.image = {
			url: url,
			proxy_url: proxy_url,
			height: height,
			width: width
		};
		return this;
	}

	/**
	 * Adds a field to the payload.
	 * @param {string} name - The name of the field.
	 * @param {string} value - The value of the field.
	 * @param {boolean} inline - Whether the field should be displayed inline.
	 */
	addFields(name, value, inline) {
		this.payload.embeds.fields.push({
			name: name,
			value: value,
			inline: inline
		});
		return this;
	}

	/**
	 * Deletes a field from the payload by index.
	 * @param {number} index - The index of the field to delete.
	 */
	deleteField(index) {
		this.payload.embeds.fields.splice(index, 1);
		return this;
	}

	/**
	 * Converts a color from hexadecimal or RGB format to decimal.
	 * @param {string | number[]} color - The color value to parse.
	 * @returns {number} The decimal representation of the color.
	 */
	__parseColor(color) {
		let decimalColor = 0;

		if (typeof color === 'object') {
			for (const component of color) {
				decimalColor = (decimalColor << 8) + parseInt(String(component), 16);
			}
			return decimalColor;
		}

		return parseInt(color, 16);
	}

}

/**
 * Represents options for a Discord webhook.
 */
class DiscordWebhookOptions {
	/**
	 * Create a new DiscordWebhookOptions instance.
	 * @constructor
	 * @param {object} options - The options for the webhook.
	 * @param {string} options.webhookURL - The URL of the webhook.
	 * @param {string} options.username - The username for the webhook.
	 * @param {string} options.avatarURL - The avatar URL for the webhook.
	 * @param {boolean} options.retryAtLimit - Whether to retry sending the webhook when rate limit is reached.
	 * @param {boolean} options.skipAnyError - Whether to skip any error that occurs while sending the webhook.
	 */
	constructor(options) {
		/**
		 * The URL of the webhook.
		 * @type {string}
		 */
		this.webhookURL = options.webhookURL;

		/**
		 * The username for the webhook.
		 * @type {string}
		 */
		this.username = options.username;

		/**
		 * The avatar URL for the webhook.
		 * @type {string}
		 */
		this.avatarURL = options.avatarURL;

		/**
		 * Whether to retry sending the webhook when rate limit is reached.
		 * @type {boolean}
		 */
		this.retryAtLimit = options.retryAtLimit;

		/**
		 * Whether to skip any error that occurs while sending the webhook.
		 * @type {boolean}
		 */
		this.skipAnyError = options.skipAnyError;
	}
}

/**
 * Represents a Discord webhook.
 */
class DiscordWebhook {
	/**
	 * Creates an instance of the DiscordWebhook class.
	 * @param {DiscordWebhookOptions} options - Optional options for the DiscordWebhook class.
	 */
	constructor(options) {
		/**
		 * The options for the webhook.
		 * @type {DiscordWebhookOptions}
		 */
		this.options = new DiscordWebhookOptions(options);

		/**
		 * The payload object that holds the properties of the webhook.
		 * @type {Object}
		 */
		this.payload = {
			embeds: []
		};
	}

	/**
	 * Adds an embed to the webhook payload.
	 * @param {DiscordEmbed} embed - The DiscordEmbed instance representing the embed to add.
	 */
	addEmbed(embed) {
		this.payload.embeds.push(embed.payload.embeds);
	}

	/**
	 * Sets the content of the webhook payload.
	 * @param {string} content - The content of the webhook message.
	 */
	setContent(content) {
		this.payload.content = content;
	}

	/**
	 * Executes the webhook by sending the payload to the webhook URL.
	 */
	async execute() {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.options.username,
				avatar_url: this.options.avatarURL,
				content: this.payload.content,
				embeds: this.payload.embeds,
				url: this.payload.embeds.url
			})
		};

		const response = await getCustomURL(this.options.webhookURL, requestOptions);

		if (response.status === 429 && this.options.retryAtLimit) {
			const responseData = await response.json();
			const retryAfter = responseData['retryAfter'];

			setTimeout(async () => await getCustomURL(this.options.webhookURL, requestOptions), retryAfter);
		}
	}
}

module.exports = {
	DiscordEmbed,
	DiscordWebhook,
	DiscordWebhookOptions
}
