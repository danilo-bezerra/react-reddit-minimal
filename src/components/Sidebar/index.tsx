import { RedditContext } from "../../contexts/RedditContext";
import { SubRedditsDTO } from "../../dtos/SubRedditsDTO";
import { SubRedditModel } from "../../models/SubRedditModel";
import { redditApi } from "../../services/api";
import styles from "./styles.module.scss";
import React, { useContext } from "react";

import { CiMenuBurger } from "react-icons/ci";
import SidebarItemSkeleton from "../LoadingSkeletons/SidebarItemSkeleton";
import { useLocation, useNavigate } from "react-router-dom";

import "./styles.scss";
import { toggleSidebarVisibility } from "../../utils/toggleSidebarVisibility";
import { IconButton } from "../IconButton";

export function Sidebar() {
  const [subReddits, setSubReddits] = React.useState<SubRedditModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { selectSubReddit, selectedSubReddit } = useContext(RedditContext);

  const sidebarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function getSubReddits() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }

    getSubReddits();
  }, []);

  React.useEffect(() => {
    navigate("/");
  }, [selectedSubReddit]);

  return (
    <>
      <aside ref={sidebarRef} id="sidebar" className={`${styles.sidebar}`}>
        <header>
          <h2>Subreddits</h2>

          <IconButton
            className={styles.iconButton}
            onClick={toggleSidebarVisibility}
            icon={<CiMenuBurger size={28} />}
          />
        </header>
        <nav>
          <ul>
            {isLoading ? (
              <>
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
                <SidebarItemSkeleton />
              </>
            ) : (
              subReddits.map((s) => (
                <li
                  key={s.id}
                  className={`${styles.nav__item} ${
                    selectedSubReddit?.id == s.id && location.pathname == "/"
                      ? styles.selected
                      : ""
                  }`}
                >
                  <button
                    onClick={() => {
                      selectSubReddit(s);
                      toggleSidebarVisibility();
                      if (location.pathname != "/") {
                        navigate("/");
                      }
                    }}
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
                      style={{ border: `2px solid ${s.primary_color}` }}
                    />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}
