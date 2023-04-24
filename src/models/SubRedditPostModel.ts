export interface SubRedditPostModel {
  author: string;
  subreddit: string;
  id: string;
  subreddit_id: string;
  title: string;
  score: number;
  num_comments: number;
  created: number;
  url: string;
  subreddit_name_prefixed: string;
  permalink: string
}
