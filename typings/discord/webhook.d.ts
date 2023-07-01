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
        ): void;
        setTitle(title: string): void;
        setDescription(description: string): void;
        setURL(url: string): void;
        setTimestamp(timestamp?: string | any): void;
        setColor(color: Array<number> | string): void;
        setFooter(
            text: string,
            icon_url?: string,
            proxy_icon_url?: string
        ): void;
        setImage(
            url: string,
            proxy_url?: string,
            height?: string,
            width?: string
        ): void;
        addFields(name: string, value: string, inline: boolean): void;
        deleteField(index: number): void;
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
