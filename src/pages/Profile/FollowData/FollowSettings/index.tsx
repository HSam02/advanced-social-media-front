import { useAppDispatch } from "../../../../app/hooks";
import { IUser, unfollowUserAsync } from "../../../../app/slices/user";
import { Avatar, ModalBackground } from "../../../../components";
import {
  CircleStarIcon,
  CloseIcon,
  StarIcon,
  VerticalArrowIcon,
} from "../../../../components/icons";
import scss from "./FollowSettings.module.scss";

type FollowSettingsType = {
  user: IUser;
  onClose: () => void;
};

export const FollowSettings: React.FC<FollowSettingsType> = ({
  user,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const handleUnfollow = async () => {
    onClose();
    dispatch(unfollowUserAsync());
  };
  return (
    <ModalBackground onClose={onClose}>
      <div className={scss.box}>
        <div className={scss.userInfo}>
          <Avatar dest={user.avatarDest} size="56px" />
          <h4>{user.username}</h4>
        </div>
        <ul className={scss.settingsList}>
          <li>
            Add to close friends list
            <span>
              <CircleStarIcon />
            </span>
          </li>
          <li>
            Add to favorites
            <span>
              <StarIcon />
            </span>
          </li>
          <li>
            Mute
            <span className={scss.arrow}>
              <VerticalArrowIcon />
            </span>
          </li>
          <li>
            Restrict
            <span className={scss.arrow}>
              <VerticalArrowIcon />
            </span>
          </li>
          <li onClick={handleUnfollow}>Unfollow</li>
        </ul>
        <span onClick={onClose}>
          <CloseIcon />
        </span>
      </div>
    </ModalBackground>
  );
};
