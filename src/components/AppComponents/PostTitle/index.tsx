import { memo, useState } from "react";
import { DotsIcon } from "../../icons";
import { Avatar } from "../Avatar";
import scss from "./PostTitle.module.scss";
import { IPost } from "../../../app/slices/posts";
import { PostSettingsModal } from "../../PostSettingsModal";

type PostTitleProps = {
  post: IPost;
  // username: string;
  // avatarDest?: string;
  date?: boolean;
};

export const PostTitle: React.FC<PostTitleProps> = memo(({ post, date }) => {
  const [showPostSettings, setShowPostSettings] = useState(true);
  console.log("PostTitle");

  return (
    <>
      <div className={scss.title}>
        <div className={scss.avatar}>
          <Avatar dest={post.user.avatarDest} />
        </div>
        <div className={scss.username}>
          <span>{post.user.username}</span> &#183; {date && <p>4h</p>} Follow
        </div>
        <div onClick={() => setShowPostSettings(true)}>
          <DotsIcon />
        </div>
      </div>
      {showPostSettings && (
        <PostSettingsModal
          post={post}
          onClose={() => setShowPostSettings(false)}
        />
      )}
    </>
  );
});
