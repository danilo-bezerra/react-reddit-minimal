import styles from "./styles.module.scss";

import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export function IconButton({ icon, className = "", ...rest }: Props) {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`}
      {...rest}
    >
      {icon}
    </button>
  );
}
