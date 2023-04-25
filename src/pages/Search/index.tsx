import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import PostCardList from "../../components/PostCardList";
import PostCardSkeleton from "../../components/LoadingSkeletons/PostSkeleton";
import { Button } from "../../components/Button";

export function SearchPage() {
  const [posts, setPosts] = useState<SubRedditPostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState<"link" | "sr" | "comment">(
    "link"
  );

  const { q } = useParams();

  useEffect(() => {
    async function getSubRedditPosts() {
      try {
        setIsLoading(true);
        const res = await redditApi.get<SubRedditPostsDTO>(
          `/search.json?q=${
            q ?? "cars"
          }&include_over_18=true&type=${searchType}`
        );
        const posts: SubRedditPostModel[] = [];
        res.data.data.children.forEach((p) => {
          posts.push(p.data);
        });

        setPosts(posts);
      } catch {
        console.log("Erro Home");
      } finally {
        setIsLoading(false);
      }
    }

    if (q) {
      getSubRedditPosts();
    }
  }, [q, searchType]);

  if (searchType == "comment") {
    console.log({ posts });
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.searchTitle}>Showing search results for "{q}"</h2>
      <div className={styles.searchTypeButtons}>
        <Button
          variant={searchType == "link" ? "primary" : undefined}
          onClick={() => setSearchType("link")}
        >
          Posts
        </Button>
        <Button
          variant={searchType == "comment" ? "primary" : undefined}
          onClick={() => setSearchType("comment")}
        >
          Comments
        </Button>
        {/* <Button
          variant={searchType == "sr" ? "primary" : undefined}
          onClick={() => setSearchType("sr")}
        >
          Communities
        </Button> */}
      </div>
      {isLoading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : (
        <PostCardList posts={posts} limitLines={true} />
      )}
    </main>
  );
}
