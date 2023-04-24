import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { SubRedditPostModel } from "../../models/SubRedditPostModel";
import { redditApi } from "../../services/api";
import { SubRedditPostsDTO } from "../../dtos/SubRedditPostsDTO";
import PostCardList from "../../components/PostCardList";
import PostCardSkeleton from "../../components/LoadingSkeletons/PostSkeleton";

// type Props = {

// };

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
        console.log(posts);
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

  console.log(posts);

  return (
    <main className={styles.main}>
      <h2>Showing search results for "{q}"</h2>
      <div className={styles.searchTypeButtons}>
        <button
          className={`${styles.button} ${
            searchType == "link" ? styles.buttonActive : ""
          }`}
          onClick={() => setSearchType("link")}
        >
          Posts
        </button>
        <button
          className={`${styles.button} ${
            searchType == "comment" ? styles.buttonActive : ""
          }`}
          onClick={() => setSearchType("comment")}
        >
          Comments
        </button>
        <button
          className={`${styles.button} ${
            searchType == "sr" ? styles.buttonActive : ""
          }`}
          onClick={() => setSearchType("sr")}
        >
          Communities
        </button>
      </div>
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
