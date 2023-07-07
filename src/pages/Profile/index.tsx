import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearPostSlice } from "../../app/slices/posts";
import { clearComments } from "../../app/slices/comments";
import {
  clearOtherUser,
  followUserAsync,
  getOtherUserAsync,
  selectOtherUser,
  selectUser,
} from "../../app/slices/user";
import { PostsFilter } from "./PostsFilter";
import { AppButton, Avatar, FollowButton } from "../../components";
import {
  DotsIcon,
  LoadingIcon,
  SettingsIcon,
  VerticalArrowIcon,
} from "../../components/icons";
import { FollowSettings } from "./FollowData/FollowSettings";
import { FollowModal } from "./FollowData/FollowModal";
import scss from "./Profile.module.scss";

export const Profile: React.FC = () => {
  console.log("Profile");
  const dispatch = useAppDispatch();
  const { status, ...otherUserData } = useAppSelector(selectOtherUser);
  const userData = useAppSelector(selectUser).user;
  const [activeModal, setActiveModal] = useState<
    "settings" | "followers" | "following" | null
  >(null);
  const { username } = useParams();

  const user = username === userData?.username ? userData : otherUserData.user;

  useEffect(() => {
    return () => {
      dispatch(clearPostSlice());
      dispatch(clearComments());
      dispatch(clearOtherUser());
    };
  }, [dispatch, username]);

  useEffect(() => {
    if (username && username !== userData?.username) {
      setActiveModal(null);
      dispatch(getOtherUserAsync(username));
    }
  }, [username, dispatch, userData?.username]);

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
    <div className={scss.profile}>
      <div className={scss.user}>
        <Avatar dest={user.avatarDest} size="150px" />
        <div className={scss.info}>
          <div>
            <p>{user.username}</p>
            {userData?._id === user._id ? (
              <>
                <AppButton gray>Edit profile</AppButton>
                <SettingsIcon />
              </>
            ) : (
              <>
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
              </>
            )}
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
      {activeModal === "settings" && (
        <FollowSettings user={user} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "followers" && (
        <FollowModal type="followers" onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "following" && (
        <FollowModal type="following" onClose={() => setActiveModal(null)} />
      )}
      <div>
        <PostsFilter />
        <Outlet />
      </div>
    </div>
  );
};
