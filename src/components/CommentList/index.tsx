import { CommentModel } from "../../models/CommentModel";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { Comment } from "../Comment";
import styles from "./styles.module.scss";

//import Logo from "../../assets/reddit-logo-original-small.png";
type Props = {
  comments: CommentModel[];
};

export function CommentList({ comments }: Props) {
  return (
    <ul className={styles.commentList}>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </ul>
  );
}
