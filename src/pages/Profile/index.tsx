import { useAppSelector } from "../../app/hooks";
import { Outlet, useParams } from "react-router-dom";
import { selectUser } from "../../app/slices/user";
import { AppButton } from "../../components";
import { SettingsIcon } from "../../components/icons";
// import { SettingsModal, UnfollowModal, FollowersModal, FollowingModal } from "../../components/modals";
import { ProfileAvatar } from "./ProfileAvatar";
import { PostsFilter } from "./PostsFilter";
import scss from "./Profile.module.scss";

export const Profile: React.FC = () => {
  console.log("Profile");
  const { user } = useAppSelector(selectUser);
  const { username } = useParams();

  if (!user || !username) {
    return null;
  }

  if (user.username === username) {
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
          <PostsFilter />
          <Outlet />
        </div>
      </div>
    );
  }

  return null;
};
