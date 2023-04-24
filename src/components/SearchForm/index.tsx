import styles from "./styles.module.scss";

import { FormEvent, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function SearchForm() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (search.trim()) {
      navigate(`search/${search}`);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search something..."
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <button>
        <AiOutlineSearch size={24} />
      </button>
    </form>
  );
}
