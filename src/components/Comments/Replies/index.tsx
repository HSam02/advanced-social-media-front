import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { IReply, getCommentRepliesAsync } from "../../../app/slices/comments";
import { Reply } from "./Reply";
import { ShowMore } from "./ShowMore";
import scss from "./Replies.module.scss";

type RepliesProps = {
  parentId: string;
  count: number;
  replies: IReply[];
  status: "idle" | "loading" | "error";
};

export const Replies: React.FC<RepliesProps> = ({
  parentId,
  count,
  replies,
  status,
}) => {
  console.log("Replies", parentId);

  const dispatch = useAppDispatch();
  const [showReplies, setShowReplies] = useState(false);

  const handleClickShowMore = () => {
    if (count === replies.length) {
      setShowReplies((prev) => !prev);
      return;
    }
    setShowReplies(true);
    if ((showReplies && count > replies.length) || replies.length === 0) {
      dispatch(getCommentRepliesAsync(parentId));
    }
  };

  return (
    <div className={scss.replies}>
      {count > 0 && (
        <ShowMore
          count={count}
          onClick={handleClickShowMore}
          repliesLength={replies.length}
          showReplies={showReplies}
          status={status}
        />
      )}
      {replies.length > 0 && showReplies && (
        <ul>
          {replies.map((reply) => (
            <li key={reply._id}>
              <Reply reply={reply} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
