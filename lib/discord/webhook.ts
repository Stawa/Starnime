import * as request from "../request";

interface Embed {
    author?: {
      name: string;
      url?: string;
      icon_url?: string;
      proxy_icon_url?: string;
    };
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string | any;
    color?: number;
    footer?: { text: string; icon_url?: string; proxy_icon_url?: string };
    image?: {
      url: string;
      proxy_url?: string;
      height?: string;
      width?: string;
    };
    fields: Array<object>;
  }

/**
 * Represents an embedded message for Discord.
 * @class
 * @classdesc Provides methods to set various properties of the embed, such as author, title, description, URL, timestamp, color, footer, image, and fields.
 */
export class DiscordEmbed {
  payload: {
    embeds: {
      author?: {
        name: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
      };
      title?: string;
      description?: string;
      url?: string;
      timestamp?: string | any;
      color?: number;
      footer?: { text: string; icon_url?: string; proxy_icon_url?: string };
      image?: {
        url: string;
        proxy_url?: string;
        height?: string;
        width?: string;
      };
      fields: Array<object>;
    };
  };

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
        fields: [],
      },
    };
  }

  /**
   * Sets the author of the payload.
   * @param {string} name - The name of the author.
   * @param {string} [url] - The URL associated with the author.
   * @param {string} [icon_url] - The URL of the author's icon.
   * @param {string} [proxy_icon_url] - The proxy URL of the author's icon.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setAuthor(
    name: string,
    url?: string,
    icon_url?: string,
    proxy_icon_url?: string
  ): DiscordEmbed {
    this.payload.embeds.author = {
      name: name,
      url: url,
      icon_url: icon_url,
      proxy_icon_url: proxy_icon_url,
    };
    return this;
  }

  /**
   * Sets the title of the payload.
   * @param {string} title - The title of the payload.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setTitle(title: string): DiscordEmbed {
    this.payload.embeds.title = title;
    return this;
  }

  /**
   * Sets the description of the payload.
   * @param {string} description - The description of the payload.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setDescription(description: string): DiscordEmbed {
    this.payload.embeds.description = description;
    return this;
  }

  /**
   * Sets the URL of the payload.
   * @param {string} url - The URL associated with the payload.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setURL(url: string): DiscordEmbed {
    this.payload.embeds.url = url;
    return this;
  }

  /**
   * Sets the timestamp of the payload.
   * @param {string | any} [timestamp] - The timestamp of the payload. If not provided, the current timestamp is used.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setTimestamp(timestamp?: string | any): DiscordEmbed {
    this.payload.embeds.timestamp = timestamp || new Date().toISOString();
    return this;
  }

  /**
   * Sets the color of the payload.
   * @param {string | number[]} color - The color of the payload. This can be a string representing a color name or a hexadecimal value, or an array of RGB or RGBA values.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setColor(color: string | number[]): DiscordEmbed {
    this.payload.embeds.color = this.__parseColor(color);
    return this;
  }

  /**
   * Sets the footer of the payload.
   * @param {string} text - The text of the footer.
   * @param {string} [icon_url] - The URL of the footer's icon.
   * @param {string} [proxy_icon_url] - The proxy URL of the footer's icon.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setFooter(
    text: string,
    icon_url?: string,
    proxy_icon_url?: string
  ): DiscordEmbed {
    this.payload.embeds.footer = {
      text: text,
      icon_url: icon_url,
      proxy_icon_url: proxy_icon_url,
    };
    return this;
  }

  /**
   * Sets the image of the payload.
   * @param {string} url - The URL of the image.
   * @param {string} [proxy_url] - The proxy URL of the image.
   * @param {string} [height] - The height of the image.
   * @param {string} [width] - The width of the image.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  setImage(
    url: string,
    proxy_url?: string,
    height?: string,
    width?: string
  ): DiscordEmbed {
    this.payload.embeds.image = {
      url: url,
      proxy_url: proxy_url,
      height: height,
      width: width,
    };
    return this;
  }

  /**
   * Adds a field to the payload.
   * @param {string} name - The name of the field.
   * @param {string} value - The value of the field.
   * @param {boolean} inline - Whether the field should be displayed inline.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  addFields(name: string, value: string, inline?: boolean): DiscordEmbed {
    this.payload.embeds.fields.push({
      name: name,
      value: value,
      inline: inline,
    });
    return this;
  }

  /**
   * Deletes a field from the payload by index.
   * @param {number} index - The index of the field to delete.
   * @returns {DiscordEmbed} The current DiscordEmbed instance.
   */
  deleteField(index: number): DiscordEmbed {
    this.payload.embeds.fields.splice(index, 1);
    return this;
  }

  /**
   * Converts a color from hexadecimal or RGB format to decimal.
   * @param {string | number[]} color - The color value to parse.
   * @returns {number} The decimal representation of the color.
   * @throws {Error} If the color value is invalid or the format is incorrect.
   */
  __parseColor(color: string | number[]): number {
    if (typeof color === "number") {
      if (color < 0 || color > 0xffffff)
        throw new Error(
          "Invalid color value. The color should be a number between 0 and 0xffffff."
        );
    }

    if (Number.isNaN(color))
      throw new Error(
        "Invalid color value. The color should be a valid number."
      );
    if (Array.isArray(color))
      return (color[0] || 0 << 16) + (color[1] || 0 << 8) + (color[2] || 0);
    if (/^#?[\da-f]{6}$/i.test(color))
      return parseInt(color.replace("#", ""), 16);

    throw new Error("Invalid color value. The color format is not recognized.");
  }
}

/**
 * Represents options for a Discord webhook.
 */
export class DiscordWebhookOptions {
  /**
   * The URL of the webhook.
   */
  webhookURL: string;

  /**
   * The username for the webhook.
   */
  username?: string;

  /**
   * The avatar URL for the webhook.
   */
  avatarURL?: string;

  /**
   * Whether to retry sending the webhook when rate limit is reached.
   */
  retryAtLimit?: boolean;

  /**
   * Whether to skip any error that occurs while sending the webhook.
   */
  skipAnyError?: boolean;

  /**
   * Creates a new DiscordWebhookOptions instance.
   * @param options - The options for the webhook.
   */
  constructor(options: {
    webhookURL: string;
    username?: string;
    avatarURL?: string;
    retryAtLimit?: boolean;
    skipAnyError?: boolean;
  }) {
    const defaultOptions = {
      retryAtLimit: true,
      skipAnyError: true,
    };

    const opts = {
      ...defaultOptions,
      ...options,
    };

    this.webhookURL = opts.webhookURL;
    this.username = opts.username;
    this.avatarURL = opts.avatarURL;
    this.retryAtLimit = opts.retryAtLimit;
    this.skipAnyError = opts.skipAnyError;
  }
}

interface Payload {
  embeds: Embed[];
  content?: string;
}

/**
 * Represents a Discord webhook.
 */
export class DiscordWebhook {
  /**
   * The options for the webhook.
   */
  options: DiscordWebhookOptions;

  /**
   * The payload object that holds the properties of the webhook.
   */
  payload: Payload;

  /**
   * Creates an instance of the DiscordWebhook class.
   * @param options - Options for the DiscordWebhook class.
   */
  constructor(options: DiscordWebhookOptions) {
    this.options = new DiscordWebhookOptions(options);
    this.payload = {
      embeds: [],
    };
  }

  /**
   * Adds an embed to the webhook payload.
   * @param embed - The DiscordEmbed instance representing the embed to add.
   */
  addEmbed(embed: DiscordEmbed): void {
    this.payload.embeds.push(embed.payload.embeds);
  }

  /**
   * Sets the content of the webhook payload.
   * @param content - The content of the webhook message.
   */
  setContent(content: string): void {
    this.payload.content = content;
  }

  /**
   * Executes the webhook by sending the payload to the webhook URL.
   */
  async execute(): Promise<void> {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.options.username,
        avatar_url: this.options.avatarURL,
        content: this.payload.content,
        embeds: this.payload.embeds,
        url: this.payload.embeds[0]?.url,
      }),
    };

    const response = await request.getCustomURL(
      this.options.webhookURL,
      requestOptions
    );

    if (response.status === 429 && this.options.retryAtLimit) {
      const responseData = await response.json();
      const retryAfter = responseData.retryAfter;

      setTimeout(async () => await this.execute(), retryAfter);
    }
  }
}
