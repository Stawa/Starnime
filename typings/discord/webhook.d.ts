declare module "starnime/discord/webhook" {
    class DiscordEmbed {
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
                color?: Array<number> | string;
                footer?: {
                    text: string;
                    icon_url?: string;
                    proxy_icon_url?: string;
                };
                image?: {
                    url: string;
                    proxy_url?: string;
                    height?: string;
                    width?: string;
                };
                fields: Array<{
                    name: string;
                    value: string;
                    inline: boolean;
                }>;
            }[];
        };
        constructor();
        setAuthor(
            name: string,
            url?: string,
            icon_url?: string,
            proxy_icon_url?: string
        ): this;
        setTitle(title: string): this;
        setDescription(description: string): this;
        setURL(url: string): this;
        setTimestamp(timestamp?: string | any): this;
        setColor(color: string | number[]): this;
        setFooter(
            text: string,
            icon_url?: string,
            proxy_icon_url?: string
        ): this;
        setImage(
            url: string,
            proxy_url?: string,
            height?: string,
            width?: string
        ): this;
        addFields(name: string, value: string, inline: boolean): this;
        deleteField(index: number): this;
        __parseColor(color: string | number[]): number;
    }

    class DiscordWebhookOptions {
        webhookURL: string;
        username?: string;
        avatarURL?: string;
        retryAtLimit?: boolean;
        skipAnyError?: boolean;
        constructor(options: {
            webhookURL: string;
            username?: string;
            avatarURL?: string;
            retryAtLimit?: boolean;
            skipAnyError?: boolean;
        });
    }

    class DiscordWebhook {
        options: DiscordWebhookOptions;
        payload: {
            content?: string;
            embeds: any[];
        };
        constructor(options: DiscordWebhookOptions);
        addEmbed(embed: DiscordEmbed): void;
        setContent(content: string): void;
        execute(): Promise<void>;
    }
}
