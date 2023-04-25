import { CommentModel } from "../../models/CommentModel";
import { formatTimestamp } from "../../utils/formatTimestamp";
import styles from "./styles.module.scss";

import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";

type Props = {
  comment: CommentModel;
};

export function Comment({ comment }: Props) {
  if (!comment?.body) {
    return null;
  }

  return (
    <li className={styles.commentContainer}>
      <header>
        <h4>{comment.author}</h4>
        <span>{formatTimestamp(comment.created)}</span>
      </header>
      <p>{comment.body}</p>
      <footer>
        <div className={styles.scoreContainer}>
          <TiArrowUpOutline size={20} />
          <span>{comment.score}</span>
          <TiArrowDownOutline size={20} />
        </div>
      </footer>
    </li>
  );
}
