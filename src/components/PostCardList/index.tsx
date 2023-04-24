import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import moment from "moment";

import styles from "./styles.module.scss";

import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";
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
