import styles from "./styles.module.scss";

import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import RectSkeleton from "../RectSkeleton";

export default function CommentSkeleton() {
  return (
    <li className={styles.commentContainer}>
      <RectSkeleton w="100%" h="1rem" />
      <RectSkeleton w="100%" h="3rem" />
      <footer>
        <div className={styles.scoreContainer}>
          <TiArrowUpOutline size={20} />
          <RectSkeleton w="2rem" h="1rem" />
          <TiArrowDownOutline size={20} />
        </div>
      </footer>
    </li>
  );
}
