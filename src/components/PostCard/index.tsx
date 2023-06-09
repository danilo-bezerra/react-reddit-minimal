import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import moment from "moment";

import styles from "./styles.module.scss";

import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";
import { NavLink } from "react-router-dom";

type Props = {
  post: SubRedditPostModel;
  limitLines?: boolean;
};

export default function PostCard({ post, limitLines = false }: Props) {
  return (
    <NavLink to={`/post/${post.id}`} className={styles.postcard}>
      <div className={styles.scoreContainer}>
        <TiArrowUpOutline size={24} />
        <span>{post.score}</span>
        <TiArrowDownOutline size={24} />
      </div>
      <div className={styles.contentContainer}>
        <header>
          <span>
            <strong>{post.subreddit_name_prefixed}</strong>
            by
            <strong>{post.author}</strong>
          </span>
        </header>
        <section>
          <h3 className={styles.postcard__title}>{post.title}</h3>
          {post.selftext && (
            <p
              className={`${styles.text} ${
                limitLines ? styles.limitLines : ""
              }`}
            >
              {post.selftext}
            </p>
          )}
          {post.url && <img className={styles.image} src={post.url} alt="" />}
          {post?.media && (
            <video
              src={post?.media.reddit_video?.fallback_url}
              preload="metadata"
              controls
              poster={post.thumbnail}
            >
              Tem video
            </video>
          )}
        </section>
        <footer>
          <span>
            <TiMessage size={20} /> {post.num_comments}
          </span>
          <span className={styles.createTime}>
            {moment.unix(post.created).fromNow()}
          </span>
        </footer>
      </div>
    </NavLink>
  );
}
