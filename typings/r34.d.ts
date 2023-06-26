declare module "starnime/r34" {
	class PostR34 {
		constructor(response: object);
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
		tags: string[];
		source: string;
		status: string;
		has_notes: boolean;
		comment_count: number;
	}

	class PostCommentsR34 {
		constructor(response: object);
		created_at: string;
		post_id: number;
		body: string;
		creator: string;
		id: number;
		creator_id: number;
	}

	class R34TopTags {
		constructor(response: object);
		rank: number;
		name: string;
		percentage: string;
	}

	class R34 {
		constructor();
		search(limit: number, tags: string[]): Promise <PostR34>;
		get_post(post_id: string | number): Promise <PostR34>;
		get_comments(post_id: string | number): Promise <PostCommentsR34>;
		get_random_post(): Promise <PostR34>;
		top_tags(): Promise <R34TopTags>;
		get_pool(pool_id: string | number): Promise <PostR34[]>;
		extractIdFromURL(url: string): string | null;
	}

	export {
		PostR34,
		PostCommentsR34,
		R34TopTags,
		R34
	}
}
