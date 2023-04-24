import RectSkeleton from "../RectSkeleton";
import styles from "./styles.module.scss";

export default function SidebarItemSkeleton() {
  return (
    <div className={styles.skeletonSidebarItem}>
      <RectSkeleton w="2.5rem" h="2.5rem" r="50%" />
      <RectSkeleton w="100%" h="1rem" />
    </div>
  );
}
