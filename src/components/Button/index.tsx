import styles from "./styles.module.scss";

import { HTMLAttributes, } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | undefined;
};

export function Button({
  children,
  className = "",
  variant = undefined,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${
        variant != undefined && styles[variant]
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
