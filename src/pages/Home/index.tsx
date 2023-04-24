import styles from "./styles.module.scss";
import React, { useContext, useEffect, useState } from "react";

import PostCard from "../../components/PostCard";
import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import PostCardList from "../../components/PostCardList";
import PostCardSkeleton from "../../components/LoadingSkeletons/PostSkeleton";

// type Props = {

// };

export function HomePage() {
  const [posts, setPosts] = useState<SubRedditPostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedSubReddit } = useContext(RedditContext);

  console.log(selectedSubReddit);

  useEffect(() => {
    async function getSubRedditPosts() {
      try {
        setIsLoading(true);
        const res = await redditApi.get<SubRedditPostsDTO>(
          `${selectedSubReddit?.url}.json`
        );
        const posts: SubRedditPostModel[] = [];
        res.data.data.children.forEach((p) => {
          posts.push(p.data);
        });
        console.log(posts);
        setPosts(posts);
      } catch {
        console.log("Erro Home");
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedSubReddit) {
      getSubRedditPosts();
    }
  }, [selectedSubReddit]);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : (
        <PostCardList posts={posts} />
      )}
    </main>
  );
}
