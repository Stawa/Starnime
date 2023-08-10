import { Utility } from "../utility";
import { exec } from "child_process";
import { promisify } from "util";
import cheerio from "cheerio";
import figlet from "figlet";
import gradient from "gradient-string";
import ora from "ora";
import * as path from "path";
import * as fs from "fs";

const mkdir = promisify(fs.mkdir);
const rm = promisify(fs.rm);

/**
 * Represents the response response for a showroom livestream.
 */
interface ShowroomLivestreamResponse {
    enquete_gift_num: number;
    is_enquete: boolean;
    is_recording_prohibited: boolean;
    live_id: number;
    is_enquete_result: boolean;
    room_name: string;
    background_image_url: string;
    age_verification_status: number;
    bcsvr_port: number;
    video_type: number;
    banner_image_url: string;
    banner_destination_url: string;
    live_type: number;
    is_free_gift_only: boolean;
    premium_room_type: number;
    bcsvr_host: string;
    live_status: number;
    bcsvr_key: string;
    room_id: number;
}

export class ShowroomLivestream {
    /**
     * The number of gifts for the enquête.
     */
    enquete_gift_num: number;

    /**
     * Indicates whether enquête (survey) is available during the livestream.
     */
    is_enquete: boolean;

    /**
     * Indicates whether recording is prohibited for the livestream.
     */
    is_recording_prohibited: boolean;

    /**
     * The unique ID of the livestream.
     */
    live_id: number;

    /**
     * Indicates whether enquête (survey) results are available.
     */
    is_enquete_result: boolean;

    /**
     * The name of the livestream room.
     */
    room_name: string;

    /**
     * URL of the background image for the livestream room.
     */
    background_image_url: string;

    /**
     * The status of age verification for the livestream.
     */
    age_verification_status: number;

    /**
     * The port number for the broadcasting server.
     */
    bcsvr_port: number;

    /**
     * The type of video used for the livestream.
     */
    video_type: number;

    /**
     * URL of the banner image associated with the livestream.
     */
    banner_image_url: string;

    /**
     * URL that the banner image links to when clicked.
     */
    banner_destination_url: string;

    /**
     * The type of livestream (e.g., public, private, premium).
     */
    live_type: number;

    /**
     * Indicates whether only free gifts are allowed in the livestream.
     */
    is_free_gift_only: boolean;

    /**
     * The type of premium room, if applicable.
     */
    premium_room_type: number;

    /**
     * Hostname of the broadcasting server.
     */
    bcsvr_host: string;

    /**
     * The status of the livestream (e.g., live, ended).
     */
    live_status: number;

    /**
     * Key used for authentication with the broadcasting server.
     */
    bcsvr_key: string;

    /**
     * The unique ID of the livestream room.
     */
    room_id: number;

    constructor(response: ShowroomLivestreamResponse) {
        this.enquete_gift_num = response.enquete_gift_num;
        this.is_enquete = response.is_enquete;
        this.is_recording_prohibited = response.is_recording_prohibited;
        this.live_id = response.live_id;
        this.is_enquete_result = response.is_enquete_result;
        this.room_name = response.room_name;
        this.background_image_url = response.background_image_url;
        this.age_verification_status = response.age_verification_status;
        this.bcsvr_port = response.bcsvr_port;
        this.video_type = response.video_type;
        this.banner_image_url = response.banner_image_url;
        this.banner_destination_url = response.banner_destination_url;
        this.live_type = response.live_type;
        this.is_free_gift_only = response.is_free_gift_only;
        this.premium_room_type = response.premium_room_type;
        this.bcsvr_host = response.bcsvr_host;
        this.live_status = response.live_status;
        this.bcsvr_key = response.bcsvr_key;
        this.room_id = response.room_id;
    }
}

/**
 * response structure received from polling a showroom.
 */
interface ShowroomPollingResponse {
    renew_room_response: number;
    active_fan: {
        can_boostable: boolean;
        user: {
            before_level: number;
            title_id: number;
            current_level: number;
        } | null;
        room: {
            total_user_count: number;
            fan_name: string;
        };
    };
    is_login: boolean;
    show_login_dialog: number;
    online_user_num: number;
    toast: {
        fontsize: number;
        duration: number;
        image: string;
        message: string;
    };
    live_watch_incentive: {
        ok: number;
        is_amateur: string;
    };
}

/**
 * Represents the response received from polling a showroom.
 */
export class ShowroomPolling {
    /**
     * Indicates whether the room response should be renewed.
     */
    renew_room_response: number;

    /**
     * Information about the active fan's interaction.
     */
    active_fan: {
        /**
         * Indicates whether the active fan can provide a boostable action.
         */
        can_boostable: boolean;

        /**
         * User-specific information for the active fan.
         */
        user: {
            /**
             * The previous level of the user.
             */
            before_level: number;

            /**
             * The ID of the user's current title.
             */
            title_id: number;

            /**
             * The current level of the user.
             */
            current_level: number;
        } | null;

        /**
         * Information about the room, including total user count and fan name.
         */
        room: {
            /**
             * The total number of users in the room.
             */
            total_user_count: number;

            /**
             * The name associated with the fan in the room.
             */
            fan_name: string;
        };
    };

    /**
     * Indicates whether a user is logged in.
     */
    is_login: boolean;

    /**
     * Indicates whether a login dialog should be displayed.
     */
    show_login_dialog: number;

    /**
     * The number of online users.
     */
    online_user_num: number;

    /**
     * Toast message details.
     */
    toast: {
        /**
         * The font size of the toast message.
         */
        fontsize: number;

        /**
         * The duration of the toast message.
         */
        duration: number;

        /**
         * URL of the image associated with the toast message.
         */
        image: string;

        /**
         * The content of the toast message.
         */
        message: string;
    };

    /**
     * Incentives related to watching a live broadcast.
     */
    live_watch_incentive: {
        /**
         * Indicator of the incentive's availability.
         */
        ok: number;

        /**
         * Indicates whether the fan is an amateur.
         */
        is_amateur: string;
    };

    constructor(response: ShowroomPollingResponse) {
        this.renew_room_response = response.renew_room_response;
        this.active_fan = response.active_fan;
        this.is_login = response.is_login;
        this.show_login_dialog = response.show_login_dialog;
        this.online_user_num = response.online_user_num;
        this.toast = response.toast;
        this.live_watch_incentive = response.live_watch_incentive;
    }
}

/**
 * Represents the response data for age verification.
 */
interface AgeVerificationResponse {
    is_passed: boolean;
}

/**
 * Represents the result of age verification.
 */
export class AgeVerification {
    /**
     * Indicates whether age verification is successfully passed.
     */
    is_passed: boolean;

    /**
     * Creates an instance of AgeVerification.
     * @param response - The response data from age verification.
     */
    constructor(response: AgeVerificationResponse) {
        this.is_passed = response.is_passed;
    }
}

/**
 * response structure representing the current user's response received from a showroom.
 */
interface ShowroomCurrentUserresponse {
    live_rank: number;
    avatar_id: number;
    gift_use_flg1: boolean;
    next_level_point: number;
    locale: string;
    gift_list: {
        enquete: any[];
        normal: {
            gift_id: number;
            free_num: number;
        }[];
    };
    next_fan_level: number;
    is_confirm_gifting_use_gold: boolean;
    add_free_gift: number;
    badge_type: number;
    gold: number;
    is_login: boolean;
    badge: number;
    fan_level: number;
    twitter_auth: boolean;
    is_tutorial: boolean;
    name: string;
    own_room_url_key: string | null;
    avatar_url: string;
    current_level_point: number;
    account_id: string;
    image: string;
    contribution_point: number;
    user_id: number;
}

/**
 * Represents the current user's response received from a showroom.
 */
export class ShowroomCurrentUser {
    /**
     * The user's current rank in the live broadcast.
     */
    live_rank: number;

    /**
     * The ID of the user's avatar.
     */
    avatar_id: number;

    /**
     * Indicates whether the first type of gift is available for use.
     */
    gift_use_flg1: boolean;

    /**
     * The points required to reach the next fan level.
     */
    next_level_point: number;

    /**
     * The user's preferred locale.
     */
    locale: string;

    /**
     * Lists of gifts available to the user.
     */
    gift_list: {
        /**
         * List of enquête gifts.
         */
        enquete: any[];

        /**
         * List of normal gifts with their available quantities.
         */
        normal: {
            gift_id: number;
            free_num: number;
        }[];
    };

    /**
     * The next fan level that the user can achieve.
     */
    next_fan_level: number;

    /**
     * Indicates whether gifting using gold is confirmed.
     */
    is_confirm_gifting_use_gold: boolean;

    /**
     * The number of additional free gifts.
     */
    add_free_gift: number;

    /**
     * The badge type associated with the user.
     */
    badge_type: number;

    /**
     * The amount of gold owned by the user.
     */
    gold: number;

    /**
     * Indicates whether the user is logged in.
     */
    is_login: boolean;

    /**
     * The user's badge ID.
     */
    badge: number;

    /**
     * The user's fan level.
     */
    fan_level: number;

    /**
     * Indicates whether the user has authorized Twitter authentication.
     */
    twitter_auth: boolean;

    /**
     * Indicates whether the user is in tutorial mode.
     */
    is_tutorial: boolean;

    /**
     * The user's display name.
     */
    name: string;

    /**
     * The URL key for the user's own room.
     */
    own_room_url_key: string | null;

    /**
     * URL of the user's avatar image.
     */
    avatar_url: string;

    /**
     * The current level points of the user.
     */
    current_level_point: number;

    /**
     * The account ID of the user.
     */
    account_id: string;

    /**
     * URL of the user's profile image.
     */
    image: string;

    /**
     * The contribution points of the user.
     */
    contribution_point: number;

    /**
     * The unique user ID.
     */
    user_id: number;

    constructor(response: ShowroomCurrentUserresponse) {
        this.live_rank = response.live_rank;
        this.avatar_id = response.avatar_id;
        this.gift_use_flg1 = response.gift_use_flg1;
        this.next_level_point = response.next_level_point;
        this.locale = response.locale;
        this.gift_list = {
            enquete: response.gift_list.enquete,
            normal: response.gift_list.normal,
        };
        this.next_fan_level = response.next_fan_level;
        this.is_confirm_gifting_use_gold = response.is_confirm_gifting_use_gold;
        this.add_free_gift = response.add_free_gift;
        this.badge_type = response.badge_type;
        this.gold = response.gold;
        this.is_login = response.is_login;
        this.badge = response.badge;
        this.fan_level = response.fan_level;
        this.twitter_auth = response.twitter_auth;
        this.is_tutorial = response.is_tutorial;
        this.name = response.name;
        this.own_room_url_key = response.own_room_url_key;
        this.avatar_url = response.avatar_url;
        this.current_level_point = response.current_level_point;
        this.account_id = response.account_id;
        this.image = response.image;
        this.contribution_point = response.contribution_point;
        this.user_id = response.user_id;
    }
}

/**
 * Represents telop data received from a source.
 */
export class TelopResponse {
    /**
     * List of telops.
     */
    telops: any[];

    /**
     * The current telop.
     */
    telop: any | null;

    /**
     * The interval for displaying telops in milliseconds.
     */
    interval: number;

    /**
     * Creates an instance of Telopresponse.
     * @param response - The telop data object.
     */
    constructor(response: TelopResponseObject) {
        this.telops = response.telops;
        this.telop = response.telop;
        this.interval = response.interval;
    }
}

/**
 * Response structure representing telop response.
 */
interface TelopResponseObject {
    telops: any[];
    telop: any | null;
    interval: number;
}

/**
 * Represents enquete result data received from a source.
 */
export class EnqueteResult {
    /**
     * List of enquete results.
     */
    enquete_results: any[];

    /**
     * The version of the enquete result response.
     */
    version: string;

    /**
     * The base URL for enquete result images.
     */
    image_base_url: string;

    /**
     * Creates an instance of EnqueteResultresponse.
     * @param response - The enquete result data object.
     */
    constructor(response: EnqueteResultResponseObject) {
        this.enquete_results = response.l;
        this.version = response.v;
        this.image_base_url = response.i;
    }
}

/**
 * Data structure representing enquete result response.
 */
interface EnqueteResultResponseObject {
    l: any[];
    v: string;
    i: string;
}

/**
 * Data structure representing profile response.
 */
interface ProfileResponseObject {
    prev_league_id: number;
    image_list: any[];
    banner_list: {
        url: string;
        image: string;
    }[];
    is_talk_online: boolean;
    award_list: any[] | null;
    push_send_status: any;
    performer_name: string;
    follower_num: number;
    live_continuous_days: number;
    next_league_id: number;
    live_id: number;
    league_id: number;
    is_official: boolean;
    is_follow: boolean;
    voice_list: any[];
    show_rank_subdivided: string;
    event: {
        ended_at: number;
        event_id: number;
        started_at: number;
        url: string;
        name: string;
        image: string;
    } | null;
    is_birthday: boolean;
    description: string;
    live_tags: any[];
    genre_id: number;
    displayed_medals: any[];
    prev_score: number;
    youtube_id: string;
    visit_count: number;
    recommend_comment_list: {
        created_at: number;
        comment: string;
        user: any;
    }[];
    current_live_started_at: number;
    next_show_rank_subdivided: string;
    share_text_live: string;
    sns_list: {
        icon: string;
        url: string;
        name: string;
    }[];
    recommend_comments_url: string;
    share_url: string;
    room_url_key: string;
    league_label: string;
    is_live_tag_campaign_opened: boolean;
    avatar: any;
    share_url_live: string;
    prev_show_rank_subdivided: string;
    is_talk_opened: boolean;
    image_square: string;
    recommend_comment_post_url: string;
    genre_name: string;
    room_name: string;
    birthday: number;
    room_level: number;
    party_live_status: number;
    party: any;
    ec_config: {
        sales_available: number;
        is_external_ec: number;
        links: any[];
    };
    image: string;
    recommend_comment_open_status: number;
    main_name: string;
    view_num: number;
    has_more_recommend_comment: boolean;
    is_party_enabled: boolean;
    premium_room_type: number;
    next_score: number;
    is_onlive: boolean;
    room_id: number;
}

/**
 * Represents a user's profile response.
 */
export class Profile {
    /** The previous league ID of the user. */
    prev_league_id: number;

    /** List of user's images. */
    image_list: any[];

    /** List of banners with their URLs and images. */
    banner_list: {
        url: string;
        image: string;
    }[];

    /** Indicates if the user is available for talk online. */
    is_talk_online: boolean;

    /** List of user's awards or null if none. */
    award_list: any[] | null;

    /** Status of push notifications sending. */
    push_send_status: any;

    /** Name of the performer. */
    performer_name: string;

    /** Number of followers the user has. */
    follower_num: number;

    /** Number of consecutive days with live broadcasts. */
    live_continuous_days: number;

    /** The ID of the next league the user is progressing towards. */
    next_league_id: number;

    /** The ID of the current live broadcast. */
    live_id: number;

    /** The ID of the current league the user is in. */
    league_id: number;

    /** Indicates if the user is an official account. */
    is_official: boolean;

    /** Indicates if the user is followed by the viewer. */
    is_follow: boolean;

    /** List of user's voice data or null if none. */
    voice_list: any[];

    /** Subdivision of the show rank the user belongs to. */
    show_rank_subdivided: string;

    /** Event information or null if none. */
    event: {
        ended_at: number;
        event_id: number;
        started_at: number;
        url: string;
        name: string;
        image: string;
    } | null;

    /** Indicates if it's the user's birthday. */
    is_birthday: boolean;

    /** Description of the user and their activities. */
    description: string;

    /** List of live broadcast tags. */
    live_tags: any[];

    /** ID of the genre the user is associated with. */
    genre_id: number;

    /** List of displayed medals or null if none. */
    displayed_medals: any[];

    /** User's previous score. */
    prev_score: number;

    /** User's YouTube ID if available. */
    youtube_id: string;

    /** Number of visits to the user's profile. */
    visit_count: number;

    /** List of recommended comments. */
    recommend_comment_list: {
        created_at: number;
        comment: string;
        user: any;
    }[];

    /** Timestamp of the start of the current live broadcast. */
    current_live_started_at: number;

    /** Subdivision of the next show rank the user is progressing towards. */
    next_show_rank_subdivided: string;

    /** Text for sharing the current live broadcast. */
    share_text_live: string;

    /** List of user's social media accounts. */
    sns_list: {
        icon: string;
        url: string;
        name: string;
    }[];

    /** URL for recommending comments. */
    recommend_comments_url: string;

    /** URL for sharing the user's profile. */
    share_url: string;

    /** Room URL key for the user's profile. */
    room_url_key: string;

    /** Label of the current league. */
    league_label: string;

    /** Indicates if the live tag campaign is opened. */
    is_live_tag_campaign_opened: boolean;

    /** User's avatar data or null if none. */
    avatar: any;

    /** URL for sharing the current live broadcast. */
    share_url_live: string;

    /** Subdivision of the previous show rank the user belonged to. */
    prev_show_rank_subdivided: string;

    /** Indicates if talking is opened. */
    is_talk_opened: boolean;

    /** URL for the user's square image. */
    image_square: string;

    /** URL for posting recommended comments. */
    recommend_comment_post_url: string;

    /** Name of the genre the user is associated with. */
    genre_name: string;

    /** Name of the user's room. */
    room_name: string;

    /** User's birthday timestamp. */
    birthday: number;

    /** Level of the user's room. */
    room_level: number;

    /** Status of party live. */
    party_live_status: number;

    /** Party data or null if none. */
    party: any;

    /** Configuration for external commerce. */
    ec_config: {
        sales_available: number;
        is_external_ec: number;
        links: any[];
    };

    /** URL of the user's profile image. */
    image: string;

    /** Status of recommended comments open. */
    recommend_comment_open_status: number;

    /** Main name of the user. */
    main_name: string;

    /** Number of views on the user's profile. */
    view_num: number;

    /** Indicates if there are more recommended comments. */
    has_more_recommend_comment: boolean;

    /** Indicates if party is enabled. */
    is_party_enabled: boolean;

    /** Type of premium room. */
    premium_room_type: number;

    /** Score for the next show rank. */
    next_score: number;

    /** Indicates if the user is currently live. */
    is_onlive: boolean;

    /** ID of the user's room. */
    room_id: number;

    constructor(response: ProfileResponseObject) {
        this.prev_league_id = response.prev_league_id;
        this.image_list = response.image_list;
        this.banner_list = response.banner_list;
        this.is_talk_online = response.is_talk_online;
        this.award_list = response.award_list;
        this.push_send_status = response.push_send_status;
        this.performer_name = response.performer_name;
        this.follower_num = response.follower_num;
        this.live_continuous_days = response.live_continuous_days;
        this.next_league_id = response.next_league_id;
        this.live_id = response.live_id;
        this.league_id = response.league_id;
        this.is_official = response.is_official;
        this.is_follow = response.is_follow;
        this.voice_list = response.voice_list;
        this.show_rank_subdivided = response.show_rank_subdivided;
        this.event = response.event;
        this.is_birthday = response.is_birthday;
        this.description = response.description;
        this.live_tags = response.live_tags;
        this.genre_id = response.genre_id;
        this.displayed_medals = response.displayed_medals;
        this.prev_score = response.prev_score;
        this.youtube_id = response.youtube_id;
        this.visit_count = response.visit_count;
        this.recommend_comment_list = response.recommend_comment_list;
        this.current_live_started_at = response.current_live_started_at;
        this.next_show_rank_subdivided = response.next_show_rank_subdivided;
        this.share_text_live = response.share_text_live;
        this.sns_list = response.sns_list;
        this.recommend_comments_url = response.recommend_comments_url;
        this.share_url = response.share_url;
        this.room_url_key = response.room_url_key;
        this.league_label = response.league_label;
        this.is_live_tag_campaign_opened = response.is_live_tag_campaign_opened;
        this.avatar = response.avatar;
        this.share_url_live = response.share_url_live;
        this.prev_show_rank_subdivided = response.prev_show_rank_subdivided;
        this.is_talk_opened = response.is_talk_opened;
        this.image_square = response.image_square;
        this.recommend_comment_post_url = response.recommend_comment_post_url;
        this.genre_name = response.genre_name;
        this.room_name = response.room_name;
        this.birthday = response.birthday;
        this.room_level = response.room_level;
        this.party_live_status = response.party_live_status;
        this.party = response.party;
        this.ec_config = response.ec_config;
        this.image = response.image;
        this.recommend_comment_open_status =
            response.recommend_comment_open_status;
        this.main_name = response.main_name;
        this.view_num = response.view_num;
        this.has_more_recommend_comment = response.has_more_recommend_comment;
        this.is_party_enabled = response.is_party_enabled;
        this.premium_room_type = response.premium_room_type;
        this.next_score = response.next_score;
        this.is_onlive = response.is_onlive;
        this.room_id = response.room_id;
    }
}

export class Showroom extends Utility {
    API_URL = "https://www.showroom-live.com/api";
    HEADERS: { Cookie: string };

    constructor(cookie: string) {
        super();
        this.HEADERS = {
            Cookie: cookie,
        };
    }

    /**
     * Extract the roomId from a given URL.
     * @param {string} url - The URL containing the roomId.
     * @returns {Promise<string | undefined>} - The extracted roomId or undefined if not found.
     */
    async get_roomId(url: string): Promise<string | undefined> {
        const fetchRoom = await fetch(url);
        const $ = cheerio.load(await fetchRoom.text());
        const roomID = $(".st-header__link").attr("href");
        return roomID?.split("=")[1];
    }

    /**
     * Fetch information about a livestream using the room ID.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<ShowroomLivestream>} - A promise containing the livestream information.
     */
    async live_info(roomId: number): Promise<ShowroomLivestream> {
        const fetchLivestream = await fetch(
            `${this.API_URL}/live/live_info?room_id=${roomId}`,
        );
        return new ShowroomLivestream(await fetchLivestream.json());
    }

    /**
     * Fetch the streaming URL for a livestream using the room ID.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the streaming URL information.
     */
    async streaming_url(roomId: number): Promise<any> {
        const fetchLivestream = await fetch(
            `${this.API_URL}/live/streaming_url?room_id=${roomId}`,
        );
        return await fetchLivestream.json();
    }

    /**
     * Poll for updates using the room ID.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<ShowroomPolling>} - A promise containing the polling results.
     */
    async polling(roomId: number): Promise<ShowroomPolling> {
        const fetchPolling = await fetch(
            `${this.API_URL}/live/polling?room_id=${roomId}`,
            {
                headers: this.HEADERS,
            },
        );
        return new ShowroomPolling(await fetchPolling.json());
    }

    /**
     * Perform age verification for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<AgeVerification>} - A promise containing age verification information.
     */
    async age_verification(roomId: number): Promise<AgeVerification> {
        const fetchVerification = await fetch(
            `${this.API_URL}/live/age_verification?room_id=${roomId}`,
        );
        return new AgeVerification(await fetchVerification.json());
    }

    /**
     * Fetch information about the current user in a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<ShowroomCurrentUser>} - A promise containing current user information.
     */
    async current_user(roomId: number): Promise<ShowroomCurrentUser> {
        const fetchUser = await fetch(
            `${this.API_URL}/live/current_user?room_id=${roomId}`,
        );
        return new ShowroomCurrentUser(await fetchUser.json());
    }

    /**
     * Fetch telop information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<TelopResponse>} - A promise containing telop information.
     */
    async telop(roomId: number): Promise<TelopResponse> {
        const fetchTelop = await fetch(
            `${this.API_URL}/live/telop?room_id=${roomId}`,
        );
        return new TelopResponse(await fetchTelop.json());
    }

    /**
     * Fetch the result of an enquete (survey) for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<EnqueteResult>} - A promise containing the enquete result information.
     */
    async enquete_result(roomId: number): Promise<EnqueteResult> {
        const fetchEnquete = await fetch(
            `${this.API_URL}/live/enquete_result?room_id=${roomId}`,
        );
        return new EnqueteResult(await fetchEnquete.json());
    }

    /**
     * Fetch summary ranking information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the summary ranking information.
     */
    async summary_ranking(roomId: number): Promise<any> {
        const fetchSummary = await fetch(
            `${this.API_URL}/live/summary_ranking?room_id=${roomId}`,
        );
        return await fetchSummary.json();
    }

    /**
     * Fetch comment log information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the comment log information.
     */
    async comment_log(roomId: number): Promise<any> {
        const fetchComment = await fetch(
            `${this.API_URL}/live/comment_log?room_id=${roomId}`,
        );
        return await fetchComment.json();
    }

    /**
     * Fetch gift log information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the gift log information.
     */
    async gift_log(roomId: number): Promise<any> {
        const fetchGiftLog = await fetch(
            `${this.API_URL}/live/gift_log?room_id=${roomId}`,
        );
        return await fetchGiftLog.json();
    }

    /**
     * Fetch gift list information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the gift list information.
     */
    async gift_list(roomId: number): Promise<any> {
        const fetchGiftList = await fetch(
            `${this.API_URL}/live/gift_list?room_id=${roomId}`,
        );
        return await fetchGiftList.json();
    }

    /**
     * Fetch stage gift list information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the stage gift list information.
     */
    async stage_gift_list(roomId: number): Promise<any> {
        const fetchStageGift = await fetch(
            `${this.API_URL}/live/stage_gift_list?room_id=${roomId}`,
        );
        return await fetchStageGift.json();
    }

    /**
     * Fetch stage user list information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the stage user list information.
     */
    async stage_user_list(roomId: number): Promise<any> {
        const fetchStageUser = await fetch(
            `${this.API_URL}/live/stage_user_list?room_id=${roomId}`,
            {
                headers: this.HEADERS,
            },
        );
        return await fetchStageUser.json();
    }

    /**
     * Fetch onlive number information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the onlive number information.
     */
    async onlive_num(roomId: number): Promise<any> {
        const fetchOnliveNum = await fetch(
            `${this.API_URL}/live/onlive_num?room_id=${roomId}`,
            {
                headers: this.HEADERS,
            },
        );
        return await fetchOnliveNum.json();
    }

    /**
     * Fetch profile information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<Profile>} - A promise containing the profile information.
     */
    async profile(roomId: number): Promise<Profile> {
        const fetchProfile = await fetch(
            `${this.API_URL}/room/profile?room_id=${roomId}`,
            {
                headers: this.HEADERS,
            },
        );
        return new Profile(await fetchProfile.json());
    }

    /**
     * Fetch event and support information for a livestream room.
     * @param {number} roomId - The room ID of the livestream room.
     * @returns {Promise<any>} - A promise containing the event and support information.
     */
    async event_and_support(roomId: number): Promise<any> {
        const fetchEvent = await fetch(
            `${this.API_URL}/room/event_and_support?room_id=${roomId}`,
        );
        return await fetchEvent.json();
    }

    /**
     * Download and process a livestream recording.
     * @param {number} roomId - The room ID of the livestream room.
     * @param {string} dir - The directory for storage.
     * @returns {Promise<void>} - A promise indicating the completion of the download and conversion process.
     */
    async downloadLivestream(roomId: number, dir: string): Promise<void> {
        const liveInfo = await this.live_info(roomId);

        if (liveInfo.live_status === 1) {
            process.stdout.write(
                gradient.mind(
                    "[OFF-AIR] The room is currently not live streaming.\n",
                ),
            );

            return;
        }

        figlet("Showroom-live Recorder", (err, data) => {
            if (err) {
                process.stderr.write(
                    gradient.retro(
                        `[ERROR] An issue occurred while attempting to log showroom text: ${err.message}\n`,
                    ),
                );

                return;
            }

            process.stdout.write(`${gradient.cristal.multiline(data)}\n`);
            process.stdout.write(
                gradient.vice(
                    "[INFORMATION] Script developed by Stawa using Typescript.\n",
                ),
            );
        });

        const fetchStream = await this.streaming_url(roomId);
        const streamUrl = fetchStream.streaming_url_list;
        const ffmpegCommand = `ffmpeg -i ${streamUrl[1].url}  -c copy -f segment -segment_time 10 temp_livestream/output_%03d.ts`;
        const pathTemp = path.join(dir, "temp_livestream");

        process.stdout.write(
            gradient.pastel(
                `[DETAILS] Livestream room information acquired: ${liveInfo.room_name} (ID: ${liveInfo.room_id})\n`,
            ),
        );

        try {
            await mkdir(pathTemp);
        } catch (err) {
            if ((err as Error).name !== "EEXIST") {
                process.stderr.write(
                    gradient.retro(
                        `[ERROR] Unable to establish temporary folder: ${
                            (err as Error).message
                        }\n`,
                    ),
                );
                return;
            }
        }

        await this.__executeFFmpeg(ffmpegCommand, dir, pathTemp);
        await this.__convert(liveInfo.room_id, pathTemp);
    }

    /**
     * Execute an FFmpeg command, monitoring and displaying progress.
     * @param {string} command - The FFmpeg command to execute.
     * @param {string} dir - The directory for file watching.
     * @param {string} pathTemp - The path to the temporary folder.
     * @returns {Promise<void>} - A promise indicating the completion of the FFmpeg process.
     */
    private async __executeFFmpeg(
        command: string,
        dir: string,
        pathTemp: string,
    ): Promise<void> {
        const spinner = ora("Preparing...").start();
        const startTime = process.hrtime();
        let tsFilesSize = "";

        return new Promise<void>((resolve, reject) => {
            const watch = fs.watch(
                path.join(dir, "temp_livestream"),
                async (_eventType, filename) => {
                    if (filename && filename.endsWith(".ts")) {
                        tsFilesSize = this.__calculateCombinedSize(
                            pathTemp,
                            ".ts",
                        );

                        const endTime = process.hrtime(startTime);
                        const elapsedTimeInSeconds =
                            endTime[0] + endTime[1] / 1e9;
                        const hours = Math.floor(elapsedTimeInSeconds / 3600);
                        const minutes = Math.floor(
                            (elapsedTimeInSeconds % 3600) / 60,
                        );
                        const seconds = Math.floor(elapsedTimeInSeconds % 60);

                        spinner.text = gradient.atlas(
                            `[STATS] Livestream recording occupies a total of ${tsFilesSize} MB.\n[TIME] Elapsed: ${hours
                                .toString()
                                .padStart(2, "0")} hours, ${minutes
                                .toString()
                                .padStart(2, "0")} minutes, ${seconds
                                .toString()
                                .padStart(2, "0")} seconds.\r`,
                        );
                    }
                },
            );

            watch.on("close", () => {
                spinner.succeed(
                    gradient.rainbow(
                        "[STATUS] Livestream recording is now complete. Proceeding with the conversion process...\n",
                    ),
                );
            });

            watch.on("error", (error) => {
                spinner.fail(
                    gradient.retro(
                        `[IGNORE ERROR] A non-critical error occurred, and it's safe to dismiss: ${error.message}\n`,
                    ),
                );
            });

            exec(command, (error, _stdout, _stderr) => {
                if (error) {
                    reject(error);
                } else {
                    watch.close();
                    resolve();
                }
            });
        });
    }

    /**
     * Convert recorded livestream segments into a single video file.
     * @param {string} folderPath - The room ID of the livestream room.
     * @param {string} extension - The path to the temporary folder.
     * @returns {Promise<void>} A promise indicating completion of the conversion process.
     */
    private async __convert(roomId: number, pathTemp: string): Promise<void> {
        const liveInfo = await this.live_info(roomId);
        const combineCommand =
            "copy /b temp_livestream\\output_*.ts temp_livestream\\combined.ts";
        await promisify(exec)(combineCommand);

        const mp4FileName = `live_${liveInfo.room_id}.mp4`;
        const convertCommand = `ffmpeg -i temp_livestream\\combined.ts -c copy ${mp4FileName}`;
        await promisify(exec)(convertCommand);

        process.stdout.write(
            gradient.vice(
                `[SUCCESS] Your file has been converted successfully to ${mp4FileName}.\n`,
            ),
        );

        process.stdout.write(
            gradient.summer(
                `[UPDATE] Initiating temporary folder deletion...\n`,
            ),
        );

        try {
            await rm(pathTemp, { recursive: true });
        } catch (err) {
            process.stderr.write(
                gradient.retro(
                    `[ERROR] An issue occurred while attempting to clean up the temporary folder: ${
                        (err as Error).message
                    }\n`,
                ),
            );
        }

        process.stdout.write(
            gradient.cristal(
                `[UPDATE] All tasks have been successfully finished. You are now ready to enjoy the livestream video titled '${mp4FileName}'.\n`,
            ),
        );
    }

    /**
     * Calculate the combined size of files with a specific extension in a given folder.
     * @param {string} folderPath - The path to the folder containing the files.
     * @param {string} extension - The desired file extension for filtering.
     * @returns {string} The combined size in megabytes (MB) of files matching the extension.
     */
    private __calculateCombinedSize(
        folderPath: string,
        extension: string,
    ): string {
        let combinedSizeBytes = 0;
        fs.readdirSync(folderPath).forEach((file) => {
            if (file.endsWith(extension)) {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);
                combinedSizeBytes += stats.size;
            }
        });
        const combinedSizeMB = combinedSizeBytes / (1024 * 1024);
        return combinedSizeMB.toFixed(2);
    }
}
