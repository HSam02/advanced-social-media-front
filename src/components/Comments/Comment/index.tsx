import { memo } from "react";
import { IComment } from "../../../app/slices/comments";
import { Avatar } from "../../AppComponents";
import { LikeButton } from "../LikeButton";
import { CommentContent } from "../CommentContent";
import { Replies } from "../Replies";
import scss from "./Comment.module.scss";

type commentProps = {
  comment: IComment;
};

export const Comment: React.FC<commentProps> = memo(({ comment }) => {
  console.log("Comment", comment.text);

  return (
    <>
      <div className={scss.comment}>
        <div className={scss.avatar}>
          <Avatar size="32px" dest={comment.user.avatarDest} />
        </div>
        <CommentContent comment={comment} />
        <LikeButton id={comment._id} liked={comment.liked} />
      </div>
      <Replies
        parentId={comment._id}
        count={comment.repliesCount}
        replies={comment.replies}
        status={comment.repliesStatus}
      />
    </>
  );
});
