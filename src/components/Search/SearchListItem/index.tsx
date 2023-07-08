import { useState, useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { OnCloseContext } from "../../SideBar/utils";
import appAxios from "../../../utils/appAxios";
import { IUser } from "../../../app/slices/user";
import { CloseIcon } from "../../icons";
import { recentType } from "../Recent";
import { Avatar } from "../../AppComponents";
import scss from "./SearchListItem.module.scss";

type SearchListItemProps = {
  searchItem: IUser;
  deletable?: boolean;
  setRecents?: React.Dispatch<React.SetStateAction<recentType[]>>;
};

export const SearchListItem: React.FC<SearchListItemProps> = memo(
  ({ searchItem, deletable, setRecents }) => {
    console.log("SearchItem");

    const onClose = useContext(OnCloseContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoToUser = () => {
      onClose();
      navigate("/" + searchItem.username);
      appAxios.post("/recent/search/" + searchItem._id);
    };

    const handleRemoveRecent = async (
      event: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
      try {
        event.stopPropagation();
        setIsLoading(true);
        await appAxios.delete("/recent/search/" + searchItem._id);
        if (setRecents) {
          setRecents((prev) =>
            prev.filter(({ search }) => search._id !== searchItem._id)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <li
        className={`${scss.listItem} ${isLoading ? scss.loading : ""}`}
        onClick={handleGoToUser}
      >
        <Avatar dest={searchItem.avatarDest} size={44} />
        <div>
          <h5>{searchItem.username}</h5>
          {searchItem.fullname && <h6>{searchItem.fullname}</h6>}
        </div>
        {deletable && (
          <span onClick={handleRemoveRecent}>
            <CloseIcon />
          </span>
        )}
      </li>
    );
  }
);
