import styles from "./styles.module.scss";

type Props = {
  w: string;
  h: string;
  r?: string;
};

export default function RectSkeleton({
  w = "initial",
  h = "initial",
  r = "0px",
}: Props) {
  return (
    <div
      className={styles.skeletonRect}
      style={{ width: w, height: h, borderRadius: r }}
    ></div>
  );
}
