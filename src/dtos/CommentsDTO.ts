import { CommentDTO } from "./CommentDTO";

export interface CommentsDTO {
  kind: string;
  data: {
    children: CommentDTO[];
  };
}
