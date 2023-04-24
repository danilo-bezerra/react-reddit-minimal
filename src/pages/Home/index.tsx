import styles from "./styles.module.scss";
import React, { useContext, useEffect, useState } from "react";

import PostCard from "../../components/PostCard";
import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";

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
      <div>
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
