import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  IUser,
  changeFollowingCount,
  decrementFolloersCount,
  selectOtherUser,
  selectUserId,
} from "../../../../app/slices/user";
import { followDataType } from "../FollowModal";
import appAxios from "../../../../appAxios";
import {
  DiscardModal,
  LoadingButton,
  UserIdentity,
} from "../../../../components";
import scss from "./FollowItem.module.scss";

type FollowItemProps = {
  type: "followers" | "following";
  item: IUser;
  setFollowData: React.Dispatch<React.SetStateAction<followDataType | null>>;
};

export const FollowItem: React.FC<FollowItemProps> = memo(
  ({ item, type, setFollowData }) => {
    console.log("FollowItem", item.username);

    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUserId);
    const otherUser = useAppSelector(selectOtherUser).user;
    const [showDiscard, setShowDiscard] = useState(false);
    const [removed, setRemoved] = useState(false);

    const areMyFollowers = !otherUser && type === "followers";

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

    const toggleFollow = async () => {
      try {
        changeStatus(item._id, "loading");
        if (item.followData.followed) {
          await appAxios.delete("/follow/" + item._id);
          dispatch(changeFollowingCount(-1));
        } else {
          await appAxios.post("/follow/" + item._id);
          dispatch(changeFollowingCount(1));
        }
        changeStatus(item._id, "idle", !item.followData.followed);
      } catch (error) {
        console.error(error);
        changeStatus(item._id, "idle");
      }
    };

    const handleRemoveFollower = async () => {
      try {
        changeStatus(item._id, "loading");
        await appAxios.delete("/follow/follower/" + item._id);
        dispatch(decrementFolloersCount());
        setRemoved(true);
      } catch (error) {
        console.error(error);
      } finally {
        changeStatus(item._id, "idle");
      }
    };

    return (
      <li className={scss.followItem}>
        <UserIdentity
          username={item.username}
          fullname={item.fullname}
          avatarDest={item.avatarDest}
          followsMe={item.followData.following}
          handleFollow={
            areMyFollowers && !item.followData.followed
              ? toggleFollow
              : undefined
          }
        />
        {userId !== item._id && (
          <LoadingButton
            isLoading={item.followData.status === "loading"}
            gray={item.followData.followed || areMyFollowers}
            disabled={removed}
            onClick={
              item.followData.followed
                ? () => setShowDiscard(true)
                : toggleFollow
            }
          >
            {areMyFollowers
              ? `Remove${removed ? "d" : ""}`
              : `Follow${item.followData.followed ? "ing" : ""}`}
          </LoadingButton>
        )}
        {showDiscard && (
          <DiscardModal
            title={
              areMyFollowers
                ? "Remove follower?"
                : `Unfollow @${item.username}?`
            }
            text={
              areMyFollowers
                ? `FInstagram won't tell ${item.username} they were removed from your followers.`
                : undefined
            }
            acceptText={areMyFollowers ? "Remove" : "Unfollow"}
            onAccept={areMyFollowers ? handleRemoveFollower : toggleFollow}
            onClose={() => setShowDiscard(false)}
            avatarDest={item.avatarDest || ""}
          />
        )}
      </li>
    );
  }
);
