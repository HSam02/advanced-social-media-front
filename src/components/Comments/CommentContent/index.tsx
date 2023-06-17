import { useContext } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { IComment, IReply, setReply } from "../../../app/slices/comments";
import TextareaContext from "../TextareaContext";
import { CommentSettings } from "../CommentSettings";
import scss from "./CommentContent.module.scss";

type CommentContentProps = {
  comment: IComment | IReply;
};

export const CommentContent: React.FC<CommentContentProps> = ({ comment }) => {
  console.log("CommentContent");

  const dispatch = useAppDispatch();
  const textareaRef = useContext(TextareaContext);

  const handleClickReply = () => {
    dispatch(setReply(comment));
    textareaRef?.current?.focus();
  };

  return (
    <div className={scss.content}>
      <pre>
        <span>{comment.user.username}</span>
        {comment.text}
      </pre>
      <div className={scss.info}>
        <span>{comment.createdAt}</span>

        {comment.likesCount ? (
          <span>
            {comment.likesCount} like{comment.likesCount > 1 ? "s" : ""}
          </span>
        ) : null}

        <span onClick={handleClickReply}>Reply</span>
        <CommentSettings commentId={comment._id} />
      </div>
    </div>
  );
};
