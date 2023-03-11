import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { PostGallery } from "../../components";
import { AppButton } from "../../components";
import { SettingsIcon } from "../../components/icons";
// import { SettingsModal, UnfollowModal, FollowersModal, FollowingModal } from "../../components/modals";
import scss from "./Profile.module.scss";
import { ProfileAvatar } from "./ProfileAvatar";
import { SharePosts } from "./SharePosts";
import { PostsFilter } from "./PostsFilter";

export const Profile: React.FC = () => {
  console.log("Profile");
  const { user } = useAppSelector(selectUser);
  const [filter, setFilter] = useState<"posts" | "saved">("posts");

  if (!user) {
    return <></>;
  }

  return (
    <div className={scss.profile}>
      {/* <FollowersModal /> */}
      {/* <FollowingModal /> */}
      {/* <UnfollowModal /> */}
      {/* <SettingsModal /> */}
      <div className={scss.user}>
        <ProfileAvatar dest={user.avatarDest || ""} />
        <div className={scss.info}>
          <div>
            <p>{user?.username}</p>
            <AppButton gray>Edit profile</AppButton>
            <SettingsIcon />
          </div>
          <ul>
            <li>
              <span>{user.posts.length}</span> posts
            </li>
            <li>
              <a href="/">
                <span>{112}</span> followers
              </a>
            </li>
            <li>
              <a href="/">
                <span>{473}</span> following
              </a>
            </li>
          </ul>
          <h4>{user.fullname}</h4>
          <p>bio</p>
        </div>
      </div>
      <div className={scss.posts}>
        <PostsFilter filter={filter} setFilter={setFilter} />
        {user[filter].length > 0 ? (
          <PostGallery posts={user[filter]} />
        ) : filter === "posts" ? (
          <SharePosts />
        ) : <h5>You don't have saved post</h5>}
      </div>
    </div>
  );
};
