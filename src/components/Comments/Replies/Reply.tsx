import { memo } from "react";
import { IReply } from "../../../app/slices/comments";
import { Avatar } from "../../AppComponents";
import { CommentContent } from "../CommentContent";
import { LikeButton } from "../LikeButton";
import scss from "../Comment/Comment.module.scss";

type replyProps = {
  reply: IReply;
};

export const Reply: React.FC<replyProps> = memo(({ reply }) => {
  console.log("Reply", reply.text);

  return (
    <>
      <div className={scss.comment}>
        <div className={scss.avatar}>
          <Avatar size={32} dest={reply.user.avatarDest} />
        </div>
        <CommentContent comment={reply} />
        <LikeButton id={reply._id} liked={reply.liked} />
      </div>
    </>
  );
});
