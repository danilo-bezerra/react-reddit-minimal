interface SubRedditPostDTO {
  kind: string;
  data: {
    author: string;
    subreddit: string;
    id: string;
    subreddit_id: string;
    title: string;
    score: number;
    num_comments: number;
    permalink: string;
    created: number;
    url: string;
    subreddit_name_prefixed: string;
  };
}

export interface SubRedditPostsDTO {
  kind: string;
  data: {
    children: SubRedditPostDTO[];
  };
}
