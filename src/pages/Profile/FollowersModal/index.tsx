import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useScrollEnd } from "../../../utils/hooks";
import {
  IUser,
  changeFollowingCount,
  selectUser,
} from "../../../app/slices/user";
import appAxios from "../../../appAxios";
import {
  FollowButton,
  ModalBackground,
  UserIdentity,
} from "../../../components";
import { CloseIcon, LoadingIcon } from "../../../components/icons";
import scss from "./FollowersModal.module.scss";

type FollowersModalProps = {
  onClose: () => void;
};

type followersDataType = {
  followers: IUser[];
  followersCount: number;
};

export const FollowersModal: React.FC<FollowersModalProps> = ({ onClose }) => {
  console.log("FollowersModal");

  const dispatch = useAppDispatch();
  const [followersData, setFollowersData] = useState<followersDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(selectUser);
  const { username } = useParams();

  const getFollowersData = async () => {
    if (isLoading) {
      return;
    }
    try {
      if (
        followersData &&
        followersData.followersCount > followersData.followers.length
      ) {
        setIsLoading(true);
        const lastId = followersData?.followers.at(-1)?._id;
        const { data } = await appAxios.get<followersDataType>(
          `/follow/followers/${username}?limit=7${
            lastId ? `&lastId=${lastId}` : ""
          }`
        );
        data.followers.forEach(
          (follower) => (follower.followData.status = "idle")
        );
        setFollowersData((prev) =>
          prev
            ? { ...data, followers: [...prev.followers, ...data.followers] }
            : data
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useScrollEnd(boxRef, 10, getFollowersData);

  const changeStatus = (
    id: string,
    newStatus: "loading" | "idle",
    newValue?: boolean
  ) => {
    setFollowersData((prev) => {
      if (!prev) {
        return null;
      }
      const updatedFollowers = prev?.followers.map((follower) => {
        if (follower._id === id) {
          return {
            ...follower,
            followData: {
              ...follower.followData,
              followed:
                newValue === undefined
                  ? follower.followData.followed
                  : newValue,
              status: newStatus,
            },
          };
        }
        return follower;
      }) as IUser[];

      return {
        ...prev,
        followers: updatedFollowers,
      };
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await appAxios.get<followersDataType>(
          `/follow/followers/${username}?limit=7`
        );
        data.followers.forEach(
          (follower) => (follower.followData.status = "idle")
        );
        setFollowersData((prev) =>
          prev
            ? { ...data, followers: [...prev.followers, ...data.followers] }
            : data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [username]);

  const handleFollow = async (id: string) => {
    try {
      const follower = followersData?.followers.find(
        (follower) => follower._id === id
      );
      if (!follower) {
        return;
      }
      changeStatus(id, "loading");
      if (follower.followData.followed) {
        await appAxios.delete("/follow/" + id);
        dispatch(changeFollowingCount(-1));
      } else {
        await appAxios.post("/follow/" + id);
        dispatch(changeFollowingCount(1));
      }
      changeStatus(id, "idle", !follower.followData.followed);
    } catch (error) {
      console.error(error);
      changeStatus(id, "idle");
    }
  };

  return (
    <ModalBackground onClose={onClose}>
      <div className={scss.box}>
        <div className={scss.title}>
          <h2>Followers</h2>
          <span onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
        <div className={scss.content} ref={boxRef}>
          {followersData && (
            <ul>
              {followersData.followers.map((follower) => (
                <li key={follower._id}>
                  <UserIdentity
                    username={follower.username}
                    fullname={follower.username}
                    avatarDest={follower.avatarDest}
                  />
                  {user?._id !== follower._id && (
                    <FollowButton
                      user={follower}
                      onClick={() => handleFollow(follower._id)}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
          {isLoading && (
            <div
              className={scss.loading}
              style={followersData ? undefined : { flex: 10 }}
            >
              <LoadingIcon />
            </div>
          )}
        </div>
      </div>
    </ModalBackground>
  );
};
