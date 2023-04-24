export interface CommentDTO {
  kind: string;
  data: {
    id: string;
    author: string;
    subreddit: string;
    subreddit_name_prefixed: string;
    body: string;
    body_html: string;
    score: number;
    created: number
  };
}
