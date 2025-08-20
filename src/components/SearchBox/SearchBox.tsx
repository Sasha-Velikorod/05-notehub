import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}
const SearchBox = ({ onSearch }: SearchBoxProps) => {
  return (
    <input
      onChange={(event) => onSearch(event.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
