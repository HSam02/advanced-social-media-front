import { IUser } from "../../../app/slices/user";
import { SearchListItem } from "../SearchListItem";
import scss from "./SearchResult.module.scss";

type SearchResultProps = {
  users: IUser[];
};

export const SearchResult: React.FC<SearchResultProps> = ({ users }) => {
  console.log("SearchResult");

  return (
    <div className={scss.result}>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <SearchListItem key={user._id} searchItem={user} />
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
