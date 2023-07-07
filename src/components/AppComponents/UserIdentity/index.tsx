import { useState, memo } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar";
import { TextButton } from "../TextButton";
import { LoadingIcon } from "../../icons";
import scss from "./UserIdentity.module.scss";

type UserIdentityProps = {
  avatarSize?: number;
  avatarDest?: string;
  username: string;
  fullname?: string;
  followsMe?: boolean;
  handleFollow?: () => Promise<void>;
};

export const UserIdentity: React.FC<UserIdentityProps> = memo(
  ({ avatarSize, avatarDest, username, fullname, followsMe, handleFollow }) => {
    console.log("UserIdentity", username);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const handleClickFollow = async () => {
      try {
        setIsFollowLoading(true);
        if (handleFollow) {
          await handleFollow();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFollowLoading(false);
      }
    };

    return (
      <div className={scss.identity}>
        <Avatar dest={avatarDest} size={avatarSize} />
        <div className={scss.userInfo}>
          <h5>
            <NavLink to={`/${username}`}>{username}</NavLink>
            {handleFollow && (
              <>
                <span>&#183;</span>
                {isFollowLoading ? (
                  <LoadingIcon />
                ) : (
                  <TextButton onClick={handleClickFollow}>Follow</TextButton>
                )}
              </>
            )}
          </h5>
          {fullname && <h6>{fullname}</h6>}
          {followsMe && <p>Follows you</p>}
        </div>
      </div>
    );
  }
);
