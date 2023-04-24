import styles from "./styles.module.scss";
import React, { useContext, useEffect, useState } from "react";

import PostCard from "../../components/PostCard";
import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import PostCardList from "../../components/PostCardList";

// type Props = {

// };

export function HomePage() {
  const [posts, setPosts] = useState<SubRedditPostModel[]>([]);

  const { selectedSubReddit } = useContext(RedditContext);

  console.log(selectedSubReddit);

  useEffect(() => {
    async function getSubRedditPosts() {
      try {
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
      }
    }

    if (selectedSubReddit) {
      getSubRedditPosts();
    }
  }, [selectedSubReddit]);

  return (
    <div>
      Home {selectedSubReddit?.title}
      <PostCardList posts={posts} />
    </div>
  );
}
