import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditsDTO } from "../../dtos/SubRedditsDTO";
import { SubRedditModel } from "../../models/SubRedditModel";
import { redditApi } from "../../services/api";
import styles from "./styles.module.scss";
import React, { useContext } from "react";

import { CiMenuBurger } from "react-icons/ci";

export function Sidebar() {
  const [subReddits, setSubReddits] = React.useState<SubRedditModel[]>([]);

  const { selectSubReddit, selectedSubReddit } = useContext(RedditContext);

  const sidebarRef = React.useRef<HTMLDivElement>(null);

  function toggleSidebarVisibility() {
    if (sidebarRef.current) {
      console.log(sidebarRef.current.classList.toggle(styles.active));
    }
  }

  React.useEffect(() => {
    async function getSubReddits() {
      try {
        const res = await redditApi.get<SubRedditsDTO>("/subreddits.json");
        const subReddits: SubRedditModel[] = [];
        res.data.data.children.forEach((o) => {
          const { id, title, url, icon_img, primary_color } = o.data;

          subReddits.push({ id, title, url, icon_img, primary_color });
        });
        setSubReddits(subReddits);
        selectSubReddit(subReddits[0]);
      } catch {
        console.log("Error");
      }
    }

    getSubReddits();
  }, []);

  return (
    <>
      <aside ref={sidebarRef} className={`${styles.sidebar}`}>
        <header>
          <h2>Subreddits</h2>

          <button
            className={styles.iconButton}
            onClick={toggleSidebarVisibility}
          >
            <CiMenuBurger size={28} />
          </button>
        </header>
        <nav>
          <ul>
            {subReddits.map((s) => (
              <li
                key={s.id}
                className={`${styles.nav__item} ${
                  selectedSubReddit?.id == s.id ? styles.selected : ""
                }`}
              >
                <button
                  onClick={() => selectSubReddit(s)}
                  className={`${
                    selectedSubReddit?.id == s.id ? styles.selected : ""
                  }`}
                >
                  <img
                    src={
                      s.icon_img ||
                      "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
                    }
                    alt={s.title}
                  />
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
