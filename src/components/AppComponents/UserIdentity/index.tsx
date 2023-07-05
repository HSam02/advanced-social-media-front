import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar";
import scss from "./UserIdentity.module.scss";

type UserIdentityProps = {
  avatarDest?: string;
  username: string;
  fullname?: string;
};

export const UserIdentity: React.FC<UserIdentityProps> = ({
  avatarDest,
  username,
  fullname,
}) => {
  return (
    <div className={scss.identity}>
      <Avatar dest={avatarDest} size="44px" />
      <div className={scss.userInfo}>
        <h5>
          <NavLink to={`/${username}`}>{username}</NavLink>
        </h5>
        {fullname && <h6>{fullname}</h6>}
      </div>
    </div>
  );
};
