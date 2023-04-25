import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import PostCardSkeleton from "../../components/LoadingSkeletons/PostSkeleton";
import PostCard from "../../components/PostCard";
import { CommentsDTO } from "../../dtos/CommentsDTO";
import { CommentModel } from "../../models/CommentModel";
import { CommentList } from "../../components/CommentList";
import CommentSkeleton from "../../components/LoadingSkeletons/CommentSkeleton";

// type Props = {

// };

export function PostPage() {
  const [post, setPost] = useState<SubRedditPostModel | null>(null);
  const [postComments, setPostComments] = useState<CommentModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getSubRedditPosts() {
      try {
        setIsLoading(true);
        const res = await redditApi.get<[SubRedditPostsDTO, CommentsDTO]>(
          `/comments/${id}.json`
        );
        setPost(res.data[0].data.children[0].data);
        const comments: CommentModel[] = [];
        res.data[1].data.children.forEach((c) => {
          //console.log({ data: c.data, c, co: c.data });
          comments.push(c.data);
        });
        //console.log(res.data[0].data.children[0].data);
        //console.log(res.data[1].data.children);
        //console.log("| | |");
        setPostComments(comments);
      } catch {
        console.log("Erro Home");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      getSubRedditPosts();
    }
  }, [id]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <PostCardSkeleton />
        <h2>Comments</h2>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </main>
    );
  }

  console.log(post);

  return (
    <main className={styles.main}>
      <PostCard post={post!} />
      <h2>Comments</h2>
      <CommentList comments={postComments} />
    </main>
  );
}
