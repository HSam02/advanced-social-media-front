import { memo, useState } from "react";
import { IPost } from "../../../../../app/slices/posts";
import { DotsIcon } from "../../../../icons";
import { Avatar } from "../../../../AppComponents/Avatar";
import { PostSettingsModal } from "../../../../PostSettingsModal";
import scss from "./PostTitle.module.scss";

type PostTitleProps = {
  post: IPost;
};

export const PostTitle: React.FC<PostTitleProps> = memo(({ post }) => {
  const [showPostSettings, setShowPostSettings] = useState(false);
  console.log("PostTitle");

  return (
    <>
      <div className={scss.title}>
        <div className={scss.avatar}>
          <Avatar dest={post.user.avatarDest} />
        </div>
        <div className={scss.username}>
          <span>{post.user.username}</span> &#183; Follow
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
