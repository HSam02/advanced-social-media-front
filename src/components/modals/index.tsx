import { AppButton, Avatar } from "../";
import { CloseIcon } from "../icons";
import scss from "./modals.module.scss";

export { UploadModal } from "./UploadModal";

export const FollowersModal: React.FC = () => {
  return (
    <div className={scss.background}>
      <div className={`${scss.box} ${scss.follow__box}`}>
        <div className={scss.title}>
          <p>Followers</p>
          <span>
            <CloseIcon />
          </span>
        </div>
        <ul>
          {Array(10)
            .fill("")
            .map((el, i) => (
              <li key={i}>
                <div>
                  <Avatar size="44px" />
                  <span>
                    <p>nickname</p>
                    <span>full name</span>
                  </span>
                </div>
                <AppButton gray>Remove</AppButton>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const FollowingModal: React.FC = () => {
  return (
    <div className={scss.background}>
      <div className={`${scss.box} ${scss.follow__box}`}>
        <div className={scss.title}>
          <p>Following</p>
          <span>
            <CloseIcon />
          </span>
        </div>
        <div className={scss.filter}>
          <ul>
            <li className={scss.active}>
              <a href="/">People</a>
            </li>
            <li>
              <a href="/">Hashtags</a>
            </li>
          </ul>
        </div>
        <ul style={{ height: "316px" }}>
          {Array(10)
            .fill("")
            .map((el, i) => (
              <li key={i}>
                <div>
                  <Avatar size="44px" />
                  <span>
                    <p>nickname</p>
                    <span>full name</span>
                  </span>
                </div>
                <AppButton gray>Following</AppButton>
              </li>
            ))}
        </ul>
        {/* <div className={scss.hashtags}>
          <span>#</span>
          <h3>Hashtags you follow</h3>
          <p>Once you follow hashtags, you'll see them here.</p>
        </div> */}
      </div>
    </div>
  );
};

export const UnfollowModal: React.FC = () => {
  return (
    <div className={scss.background}>
      <div className={`${scss.box} ${scss.options__box}`}>
        <Avatar size="90px" />
        <p>Unfollow @{"nickname"}</p>
        <ul>
          <li>Unfollow</li>
          <li>Cancel</li>
        </ul>
      </div>
    </div>
  );
};

export const SettingsModal: React.FC = () => {
  return (
    <div className={scss.background}>
      <div className={`${scss.box} ${scss.options__box}`}>
        <ul>
          <li>Change password</li>
          <li>Report a problem</li>
          <li>Log Out</li>
          <li>Cancel</li>
        </ul>
      </div>
    </div>
  );
};

export const DiscardModal: React.FC<{
  title: string;
  text: string;
  onClose: () => void;
  onAccept: () => void;
}> = ({ title, text, onClose, onAccept }) => {
  return (
    <div className={scss.background} onClick={onClose}>
      <div
        // onClick={(e) => e.stopPropagation()}
        className={`${scss.box} ${scss.options__box}`}
      >
        <h6>{title}</h6>
        <p>{text}</p>
        <ul>
          <li onClick={onAccept}>Discard</li>
          <li onClick={onClose}>Cancel</li>
        </ul>
      </div>
    </div>
  );
};
