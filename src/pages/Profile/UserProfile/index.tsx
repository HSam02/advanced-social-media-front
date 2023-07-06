import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Outlet, useParams } from "react-router-dom";
import {
  clearOtherUser,
  followUserAsync,
  getOtherUserAsync,
  selectOtherUser,
} from "../../../app/slices/user";
import { AppButton, Avatar, FollowButton } from "../../../components";
import {
  DotsIcon,
  LoadingIcon,
  VerticalArrowIcon,
} from "../../../components/icons";
import { PostsFilter } from "../PostsFilter";
import { FollowSettings } from "../FollowData/FollowSettings";
import { FollowModal } from "../FollowData/FollowModal";
import scss from "./UserProfile.module.scss";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector(selectOtherUser);
  const [activeModal, setActiveModal] = useState<
    "settings" | "followers" | "following" | null
  >(null);
  const { username } = useParams();

  useEffect(() => {
    return () => {
      dispatch(clearOtherUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (username) {
      setActiveModal(null);
      dispatch(getOtherUserAsync(username));
    }
  }, [username, dispatch]);

  if (status === "loading") {
    return (
      <div className={scss.loading}>
        <LoadingIcon />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={scss.user}>
        <Avatar dest={user.avatarDest} size="150px" />
        <div className={scss.info}>
          <div>
            <p>{user.username}</p>
            {user.followData.followed ? (
              <FollowButton
                user={user}
                onClick={() => setActiveModal("settings")}
              >
                <div style={{ display: "flex" }}>
                  <p>Following</p>
                  <span className={scss.followingArrowIcon}>
                    <VerticalArrowIcon />
                  </span>
                </div>
              </FollowButton>
            ) : (
              <FollowButton
                user={user}
                onClick={() => dispatch(followUserAsync())}
              />
            )}
            <AppButton gray>Message</AppButton>
            <DotsIcon />
          </div>
          <ul>
            <li>
              <span>{user.postsCount}</span> posts
            </li>
            <li onClick={() => setActiveModal("followers")}>
              <span>{user.followData.followersCount}</span> followers
            </li>
            <li onClick={() => setActiveModal("following")}>
              <span>{user.followData.followingCount}</span> following
            </li>
          </ul>
          <h4>{user.fullname}</h4>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className={scss.posts}>
        <PostsFilter />
        <Outlet />
      </div>
      {activeModal === "settings" && (
        <FollowSettings user={user} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "followers" && (
        <FollowModal type="followers" onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "following" && (
        <FollowModal type="following" onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};
