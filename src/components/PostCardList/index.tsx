import styles from "./styles.module.scss";

import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import PostCard from "../PostCard";
import { NothingFound } from "../NothingFound";

type Props = {
  posts: SubRedditPostModel[];
  limitLines: boolean;
};

export default function PostCardList({ posts, limitLines }: Props) {
  if (posts.length == 0) {
    return <NothingFound />;
  }

  return (
    <ul className={styles.postList}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} limitLines={limitLines} />
      ))}
    </ul>
  );
}
