import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectUserId } from "../../../../../app/slices/user";
import { IPost, followPostUserAsync } from "../../../../../app/slices/posts";
import { DotsIcon } from "../../../../icons";
import { PostSettingsModal } from "../../../../PostSettingsModal";
import { UserIdentity } from "../../../../AppComponents";
import scss from "./PostTitle.module.scss";

type PostTitleProps = {
  post: IPost;
};

export const PostTitle: React.FC<PostTitleProps> = memo(({ post }) => {
  console.log("PostTitle");
  const dispatch = useAppDispatch();
  const myId = useAppSelector(selectUserId);
  const [showPostSettings, setShowPostSettings] = useState(false);

  return (
    <>
      <div className={scss.title}>
        <UserIdentity
          username={post.user.username}
          avatarDest={post.user.avatarDest}
          isLoading={post.user.followData.status === "loading"}
          handleFollowSync={
            post.user.followData.followed && myId !== post.user._id
              ? undefined
              : () => dispatch(followPostUserAsync(post.user._id))
          }
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
