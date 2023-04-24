import styles from "./styles.module.scss";

import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import PostCard from "../PostCard";

type Props = {
  posts: SubRedditPostModel[];
};

export default function PostCardList({ posts }: Props) {
  return (
    <ul className={styles.postList}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </ul>
  );
}
