import { memo, useState } from "react";
import { IPost } from "../../../../../app/slices/posts";
import { DotsIcon } from "../../../../icons";
import { PostSettingsModal } from "../../../../PostSettingsModal";
import { UserIdentity } from "../../../../AppComponents";
import scss from "./PostTitle.module.scss";

type PostTitleProps = {
  post: IPost;
};

export const PostTitle: React.FC<PostTitleProps> = memo(({ post }) => {
  console.log("PostTitle");
  const [showPostSettings, setShowPostSettings] = useState(false);

  return (
    <>
      <div className={scss.title}>
        <UserIdentity
          username={post.user.username}
          avatarDest={post.user.avatarDest}
        />
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
