import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import moment from "moment";

import styles from "./styles.module.scss";

import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";

type Props = {
  post: SubRedditPostModel;
};

export default function PostCard({ post }: Props) {
  console.log(post);
  return (
    <div className={styles.postcard}>
      <div className={styles.scoreContainer}>
        <TiArrowUpOutline size={24} />
        <span>{post.score}</span>
        <TiArrowDownOutline size={24} />
      </div>
      <div className={styles.contentContainer}>
        <section>
          <h3 className={styles.postcard__title}>{post.title}</h3>
          {post.url && <img className={styles.image} src={post.url} alt="" />}
        </section>
        <footer>
          <span>
            <strong>{post.author}</strong>
          </span>
          <span className={styles.createTime}>
            {moment.unix(post.created).fromNow()}
          </span>
          <span>
            <TiMessage size={20} /> {post.num_comments}
          </span>
        </footer>
      </div>
    </div>
  );
}
