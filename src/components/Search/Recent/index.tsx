import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import appAxios from "../../../appAxios";
import { IUser } from "../../../app/slices/user";
import { LoadingIcon } from "../../icons";
import { TextButton } from "../../AppComponents";
import { SearchListItem } from "../SearchListItem";
import { DiscardModal } from "../../DiscardModal";
import scss from "./Recent.module.scss";

export type recentType = {
  _id: string;
  search: IUser;
};

export const Recent = () => {
  console.log("SearchHistory");
  const [recents, setRecents] = useState<recentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await appAxios.get("/recent/search");
        setRecents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const clearAll = async () => {
    try {
      setIsLoading(true);
      await appAxios.delete("/recent/search");
      setRecents([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearModalElement = showClearModal ? (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <DiscardModal
        acceptText="Clear all"
        title="Clear search history?"
        text="You won't be able to undo this. If you clear your search history, you may still see accounts you've searched for as suggested results."
        onClose={() => setShowClearModal(false)}
        onAccept={clearAll}
      />
    </div>
  ) : null;

  return (
    <>
      <div className={scss.recent}>
        <div className={scss.title}>
          <h3>Recent</h3>
          {recents.length > 0 && (
            <TextButton onClick={() => setShowClearModal(true)}>
              Clear All
            </TextButton>
          )}
        </div>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <div className={scss.result}>
            {recents.length ? (
              <ul>
                {recents.map((recent) => (
                  <SearchListItem
                    key={recent._id}
                    searchItem={recent.search}
                    deletable
                    setRecents={setRecents}
                  />
                ))}
              </ul>
            ) : (
              <p>No recent searches.</p>
            )}
          </div>
        )}
      </div>
      {createPortal(
        clearModalElement,
        document.getElementById("root") as Element
      )}
    </>
  );
};
