import styles from "./styles.module.scss";

import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";
import RectSkeleton from "../RectSkeleton";

export default function PostCardSkeleton() {
  return (
    <div className={styles.postcard}>
      <div className={styles.scoreContainer}>
        <TiArrowUpOutline size={24} />
        <RectSkeleton w="100%" h="1rem" />
        <TiArrowDownOutline size={24} />
      </div>
      <div className={styles.contentContainer}>
        <section>
          <RectSkeleton w="100%" h="2rem" />
          <RectSkeleton w="100%" h="5rem" />
        </section>
        <footer>
          <RectSkeleton w="5rem" h="1rem" />
          <RectSkeleton w="5rem" h="1rem" />
          <span>
            <TiMessage size={20} /> <RectSkeleton w="5rem" h="1rem" />
          </span>
        </footer>
      </div>
    </div>
  );
}
