import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (search: string) => void;
}

function SearchBox({ search, setSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBox;
