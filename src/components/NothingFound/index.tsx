import { Button } from "../Button";
import styles from "./styles.module.scss";

import Empty from "../../assets/empty.png";
import { useNavigate } from "react-router-dom";

export function NothingFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.nothingFound}>
      <img src={Empty} alt="empty icon" />
      <h3>
        <span>Oops!</span>
        Nothing found
      </h3>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go home
      </Button>
    </div>
  );
}
