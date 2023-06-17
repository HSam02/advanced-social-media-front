import { useEffect, useState, useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  IComment,
  addLike,
  getCommentRepliesAsync,
  removeLike,
  // selectTextareaRef,
  setReply,
} from "../../../app/slices/comments";
import appAxios from "../../../appAxios";
import { Avatar } from "../../AppComponents";
import { DotsIcon, HeartIcon, LoadingIcon } from "../../icons";
import { Reply } from "../Reply";
import { CommentSettingsModal } from "../CommentSettingsModal";
import scss from "./Comment.module.scss";
import TextareaContext from "../TextareaContext";

type commentProps = {
  comment: IComment;
};

export const Comment: React.FC<commentProps> = ({ comment }) => {
  console.log("Comment", comment.text);

  const dispatch = useAppDispatch();
  const textareaRef = useContext(TextareaContext);

  const [showReplies, setShowReplies] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleCloseSettings = useCallback(() => setShowSettings(false), []);

  const handleClickLike = async () => {
    try {
      if (comment.liked) {
        await appAxios.delete("/comment/like/" + comment._id);
        dispatch(removeLike(comment._id));
      } else {
        await appAxios.post("/comment/like/" + comment._id);
        dispatch(addLike(comment._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowMore = () => {
    if (comment.repliesCount === comment.replies.length) {
      setShowReplies((prev) => !prev);
      return;
    }
    setShowReplies(true);
    if (
      (showReplies && comment.repliesCount > comment.replies.length) ||
      comment.replies.length === 0
    ) {
      dispatch(getCommentRepliesAsync(comment._id));
    }
  };

  const handleClickReply = () => {
    dispatch(setReply(comment));
    textareaRef?.current?.focus();
  };

  return (
    <>
      <div className={scss.comment}>
        <div className={scss.avatar}>
          <Avatar size="32px" dest={comment.user.avatarDest} />
        </div>
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
            <div className={scss.dots} onClick={() => setShowSettings(true)}>
              <DotsIcon />
            </div>
          </div>
        </div>
        <div onClick={handleClickLike} className={scss.likeButton}>
          <HeartIcon active={comment.liked} />
        </div>
      </div>
      <div className={scss.replies}>
        {comment.repliesCount > 0 && (
          <div
            onClick={handleClickShowMore}
            className={`${scss.replies__button} ${
              comment.repliesStatus === "loading" ? scss.disabled : ""
            }`}
          >
            <span></span>
            {showReplies && comment.replies.length === comment.repliesCount ? (
              <p>Hide replies</p>
            ) : (
              <p>
                View replies (
                {showReplies
                  ? comment.repliesCount - comment.replies.length
                  : comment.repliesCount}
                )
              </p>
            )}
            {comment.repliesStatus === "loading" && (
              <div>
                <LoadingIcon />
              </div>
            )}
          </div>
        )}
        {comment.replies.length > 0 && showReplies && (
          <ul>
            {comment.replies.map((reply) => (
              <li key={reply._id}>
                <Reply reply={reply} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {showSettings && (
        <CommentSettingsModal
          commentId={comment._id}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
