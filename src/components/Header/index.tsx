import styles from "./styles.module.scss";

//import Logo from "../../assets/reddit-logo-original-small.png";
import { SearchForm } from "../SearchForm";
import { NavLink } from "react-router-dom";
import { toggleSidebarVisibility } from "../../utils/toggleSidebarVisibility";

import { CiMenuBurger } from "react-icons/ci";
import { IconButton } from "../IconButton";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <NavLink to="/">
        <img
          className={styles.logo}
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
          alt="reddit logo"
        />
      </NavLink>
      <SearchForm />
      <IconButton
        className={styles.iconButton}
        onClick={toggleSidebarVisibility}
        icon={<CiMenuBurger size={28} />}
      />
    </header>
  );
}
