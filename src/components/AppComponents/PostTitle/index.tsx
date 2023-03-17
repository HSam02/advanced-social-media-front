import { DotsIcon } from "../../icons";
import { Avatar } from "../Avatar";
import scss from "./PostTitle.module.scss";

type PostTitleProps = {
  username: string;
  avatarDest?: string;
  date?: boolean;
};

export const PostTitle: React.FC<PostTitleProps> = ({
  username,
  avatarDest,
  date,
}) => {
  console.log("PostTitle");

  return (
    <div className={scss.title}>
      <div className={scss.avatar}>
        <Avatar dest={avatarDest} />
      </div>
      <div className={scss.username}>
        <span>{username}</span> &#183; {date && <p>4h</p>} Follow
      </div>
      <div>
        <DotsIcon />
      </div>
    </div>
  );
};
