import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar";
import scss from "./UserIdentity.module.scss";

type UserIdentityProps = {
  avatarDest?: string;
  username: string;
  fullname?: string;
  followsMe?: boolean;
};

export const UserIdentity: React.FC<UserIdentityProps> = memo(
  ({ avatarDest, username, fullname, followsMe }) => {
    console.log("UserIdentity", username);

    return (
      <div className={scss.identity}>
        <Avatar dest={avatarDest} size="44px" />
        <div className={scss.userInfo}>
          <h5>
            <NavLink to={`/${username}`}>{username}</NavLink>
          </h5>
          {fullname && <h6>{fullname}</h6>}
          {followsMe && <p>Follows you</p>}
        </div>
      </div>
    );
  }
);
