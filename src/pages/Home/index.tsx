import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";

import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import PostCardList from "../../components/PostCardList";
import PostCardSkeleton from "../../components/LoadingSkeletons/PostSkeleton";
import { Button } from "../../components/Button";

// type Props = {

// };

export function HomePage() {
  const [posts, setPosts] = useState<SubRedditPostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState<"best" | "new" | "top">("best");

  const { selectedSubReddit } = useContext(RedditContext);

  console.log(selectedSubReddit);

  useEffect(() => {
    async function getSubRedditPosts() {
      try {
        setIsLoading(true);
        const path =
          sortType == "best"
            ? `${selectedSubReddit?.url}.json`
            : `${selectedSubReddit?.url}${sortType}.json`;
        const res = await redditApi.get<SubRedditPostsDTO>(path);
        console.log(path);
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
  }, [selectedSubReddit, sortType]);

  return (
    <main className={styles.main}>
      <div className={styles.buttonRow}>
        <Button
          variant={sortType == "best" ? "primary" : undefined}
          onClick={() => setSortType("best")}
        >
          Best
        </Button>
        <Button
          variant={sortType == "top" ? "primary" : undefined}
          onClick={() => setSortType("top")}
        >
          Top
        </Button>
        <Button
          variant={sortType == "new" ? "primary" : undefined}
          onClick={() => setSortType("new")}
        >
          New
        </Button>
      </div>
      {isLoading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : (
        <>
          <PostCardList posts={posts} />
        </>
      )}
    </main>
  );
}
