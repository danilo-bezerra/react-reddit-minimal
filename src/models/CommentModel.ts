export interface CommentModel {
  id: string;
  author: string;
  subreddit_name_prefixed: string;
  body: string;
  body_html: string;
  score: number;
  created: number;
}
