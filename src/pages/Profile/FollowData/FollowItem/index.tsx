import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IUser,
  changeFollowingCount,
  selectUserId,
} from "../../../../app/slices/user";
import appAxios from "../../../../appAxios";
import { FollowButton, UserIdentity } from "../../../../components";
import { followDataType } from "../FollowModal";
import scss from "./FollowItem.module.scss";

type FollowItemProps = {
  item: IUser;
  setFollowData: React.Dispatch<React.SetStateAction<followDataType | null>>;
};

export const FollowItem: React.FC<FollowItemProps> = memo(
  ({ item, setFollowData }) => {
    console.log("FollowItem", item.username);

    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUserId);

    const changeStatus = (
      id: string,
      newStatus: "loading" | "idle",
      newValue?: boolean
    ) => {
      setFollowData((prev) => {
        if (!prev) {
          return null;
        }
        const updatedFollowers = prev?.follows.map((follow) => {
          if (follow._id === id) {
            return {
              ...follow,
              followData: {
                ...follow.followData,
                followed:
                  newValue === undefined
                    ? follow.followData.followed
                    : newValue,
                status: newStatus,
              },
            };
          }
          return follow;
        }) as IUser[];

        return {
          ...prev,
          follows: updatedFollowers,
        };
      });
    };

    const handleFollow = async (id: string) => {
      try {
        changeStatus(id, "loading");
        if (item.followData.followed) {
          await appAxios.delete("/follow/" + id);
          dispatch(changeFollowingCount(-1));
        } else {
          await appAxios.post("/follow/" + id);
          dispatch(changeFollowingCount(1));
        }
        changeStatus(id, "idle", !item.followData.followed);
      } catch (error) {
        console.error(error);
        changeStatus(id, "idle");
      }
    };

    return (
      <li className={scss.followItem}>
        <UserIdentity
          username={item.username}
          fullname={item.fullname}
          avatarDest={item.avatarDest}
          followsMe={item.followData.following}
        />
        {userId !== item._id && (
          <FollowButton user={item} onClick={() => handleFollow(item._id)}>
            {item.followData.followed ? "" : <p>Follow</p>}
          </FollowButton>
        )}
      </li>
    );
  }
);
