import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { FollowersModal, FollowingModal } from "../../components";
import { AppButton, Avatar } from "../../components";
import { ImageIcon, SettingsIcon } from "../../components/icons";
import { SettingsModal, UnfollowModal } from "../../components/modals";
import scss from "./Profile.module.scss";

export const Profile: React.FC = () => {
  const {user} = useAppSelector(selectUser);
  return (
    <div className={scss.profile}>
			{/* <FollowersModal /> */}
			{/* <FollowingModal /> */}
			{/* <UnfollowModal /> */}
			{/* <SettingsModal /> */}
      <div className={scss.user}>
				<Avatar size="150px" />
        <div className={scss.info}>
          <div>
            <p>{user?.username}</p>
            <AppButton gray>Edit profile</AppButton>
            <SettingsIcon />
          </div>
          <ul>
            <li><span>{0}</span> posts</li>
            <li>
              <a href="/"><span>{112}</span> followers</a>
            </li>
            <li>
              <a href="/"><span>{473}</span> following</a>
            </li>
          </ul>
          <h4>{user?.fullname}</h4>
          <p>bio</p>
        </div>
      </div>
      <div className={scss.posts}>
        <div className={scss.imageIcon}>
          <ImageIcon />
        </div>
        <h3>Share Photos</h3>
        <p>When you share photos, they will appear on your profile.</p>
        <a href="/">Share your first photo</a>
      </div>
    </div>
  );
};
