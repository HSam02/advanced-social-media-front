import { useState } from "react";
import { CloseIcon, LoadingIcon, SearchIcon } from "../../icons";
import scss from "./SearchInput.module.scss";

type SearchInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  text,
  setText,
  isLoading,
}) => {
  console.log("SearchInput");

  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className={scss.searchInput}>
      {!isInputFocused && <SearchIcon />}
      <input
        type="text"
        placeholder={text || "Search"}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        value={isInputFocused ? text : ""}
      />
      {text &&
        (isLoading ? (
          <div className={scss.loading}>
            <LoadingIcon />
          </div>
        ) : (
          <div onClick={() => setText("")}>
            <CloseIcon />
          </div>
        ))}
    </div>
  );
};
