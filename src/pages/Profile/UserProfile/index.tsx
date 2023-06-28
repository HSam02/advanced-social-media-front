import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Outlet, useParams } from "react-router-dom";
import {
  followUserAsync,
  getOtherUserAsync,
  selectOtherUser,
} from "../../../app/slices/user";
import appAxios from "../../../appAxios";
import { AppButton, Avatar } from "../../../components";
import {
  DotsIcon,
  LoadingIcon,
  VerticalArrowIcon,
} from "../../../components/icons";
import { PostsFilter } from "../PostsFilter";
import { FollowSettings } from "./FollowSettings";
import scss from "./UserProfile.module.scss";

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector(selectOtherUser);
  const [showFollowSettings, setShowFollowSettings] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    if (username && !user) {
      dispatch(getOtherUserAsync(username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <AppButton
                gray
                disabled={user.followData.status === "loading"}
                onClick={() => setShowFollowSettings(true)}
              >
                <div style={{ display: "flex" }}>
                  <div
                    className={`${scss.followBtn} ${
                      user.followData.status === "loading"
                        ? scss.followLoading
                        : ""
                    }`}
                  >
                    <LoadingIcon />
                    <p>Following</p>
                  </div>
                  <span className={scss.followingArrowIcon}>
                    <VerticalArrowIcon />
                  </span>
                </div>
              </AppButton>
            ) : (
              <AppButton
                disabled={user.followData.status === "loading"}
                onClick={() => dispatch(followUserAsync())}
              >
                <div
                  className={`${scss.followBtn} ${
                    user.followData.status === "loading"
                      ? scss.followLoading
                      : ""
                  }`}
                >
                  <LoadingIcon />
                  <p>Follow{user.followData.following ? " Back" : ""}</p>
                </div>
              </AppButton>
            )}
            <AppButton gray>Message</AppButton>
            <DotsIcon />
          </div>
          <ul>
            <li>
              <span>{user.postsCount}</span> posts
            </li>
            <li>
              <a href="/">
                <span>{user.followData.followersCount}</span> followers
              </a>
            </li>
            <li>
              <a href="/">
                <span>{user.followData.followingCount}</span> following
              </a>
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
      {showFollowSettings && (
        <FollowSettings
          user={user}
          onClose={() => setShowFollowSettings(false)}
        />
      )}
    </>
  );
};
