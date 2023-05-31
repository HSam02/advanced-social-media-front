import { useState, useCallback, useContext } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  IReply,
  addLike,
  removeLike,
  setReply,
} from "../../../app/slices/comments";
import appAxios from "../../../appAxios";
import { getFormattedTime } from "../../../utils/getTimeAgo";
import { Avatar } from "../../AppComponents";
import { DotsIcon, HeartIcon } from "../../icons";
import { CommentSettingsModal } from "../CommentSettingsModal";
import scss from "../Comment/Comment.module.scss";
import TextareaContext from "../TextareaContext";

type replyProps = {
  reply: IReply;
};

export const Reply: React.FC<replyProps> = ({ reply }) => {
  console.log("Reply", reply.text);

  const dispatch = useAppDispatch();
  const timeAgo = getFormattedTime(reply.createdAt);

  const [showSettings, setShowSettings] = useState(false);
  const textareaRef = useContext(TextareaContext);

  const handleCloseSettings = useCallback(() => setShowSettings(false), []);

  const handleClickLike = async () => {
    try {
      if (reply.liked) {
        await appAxios.delete("/comment/like/" + reply._id);
        dispatch(removeLike(reply._id));
      } else {
        await appAxios.post("/comment/like/" + reply._id);
        dispatch(addLike(reply._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickReply = () => {
    dispatch(setReply({ ...reply, _id: reply.parentId }));
    textareaRef?.current?.focus();
  };

  return (
    <>
      <div className={scss.comment}>
        <div className={scss.avatar}>
          <Avatar size="32px" dest={reply.user.avatarDest} />
        </div>
        <div className={scss.content}>
          <pre>
            <span>{reply.user.username}</span>
            {reply.text}
          </pre>
          <div className={scss.info}>
            <span>{timeAgo}</span>

            {reply.likesCount ? (
              <span>
                {reply.likesCount} like{reply.likesCount > 1 ? "s" : ""}
              </span>
            ) : null}

            <span onClick={handleClickReply}>Reply</span>
            <div className={scss.dots} onClick={() => setShowSettings(true)}>
              <DotsIcon />
            </div>
          </div>
        </div>
        <div onClick={handleClickLike} className={scss.likeButton}>
          <HeartIcon active={reply.liked} />
        </div>
      </div>
      {showSettings && (
        <CommentSettingsModal
          commentId={reply._id}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
