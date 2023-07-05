import { useState, useEffect, useRef, useContext } from "react";
import { useClickOutside } from "../../utils/hooks";
import { OnCloseContext } from "../SideBar/utils";
import { IUser } from "../../app/slices/user";
import appAxios from "../../appAxios";
import { LoadingIcon } from "../icons";
import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";
import { Recent } from "./Recent";
import scss from "./Search.module.scss";

const initialResult = {
  users: [],
  usersCount: 0,
};

export const Search: React.FC = () => {
  console.log("Search");

  const onClose = useContext(OnCloseContext);
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<{ users: IUser[]; usersCount: number }>(
    initialResult
  );
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const searchController = useRef(new AbortController());

  useClickOutside(boxRef, onClose);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        if (searchText) {
          if (isLoading) {
            searchController.current.abort();
            searchController.current = new AbortController();
          }
          const { data } = await appAxios.get("/search/" + searchText, {
            signal: searchController.current.signal,
          });
          setResult(data);
        } else {
          setResult(initialResult);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className={scss.search} ref={boxRef}>
      <div className={scss.upper}>
        <h2>Search</h2>
        <SearchInput
          text={searchText}
          setText={setSearchText}
          isLoading={isLoading}
        />
      </div>
      {searchText ? (
        isLoading && !result.users.length ? (
          <div className={scss.loading}>
            <LoadingIcon />
          </div>
        ) : (
          <SearchResult users={result.users} />
        )
      ) : (
        <Recent />
      )}
    </div>
  );
};
