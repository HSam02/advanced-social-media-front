import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../app/slices/user";
import { AppButton } from "../../../components";
import { PostsFilter } from "../PostsFilter";
import { SettingsIcon } from "../../../components/icons";
import { ProfileAvatar } from "../ProfileAvatar";
import scss from "./MyProfile.module.scss";

export const MyProfile = () => {
  const { user } = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={scss.user}>
        <ProfileAvatar dest={user.avatarDest || ""} />
        <div className={scss.info}>
          <div>
            <p>{user.username}</p>
            <AppButton gray>Edit profile</AppButton>
            <SettingsIcon />
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
    </>
  );
};
