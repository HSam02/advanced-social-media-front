import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  IPost,
  addLike,
  addToSaved,
  removeLike,
  unsavePost,
} from "../../../app/slices/posts";
import { selectUser } from "../../../app/slices/user";
import appAxios from "../../../appAxios";
import { BookMarkIcon, CommentIcon, HeartIcon, PlaneIcon } from "../../icons";
import scss from "./UserInteraction.module.scss";
import TextareaContext from "../../Comments/TextareaContext";

type UserInteractionProps = {
  post: IPost;
};

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  console.log("UserInteraction");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const textareaRef = useContext(TextareaContext);

  const liked = post.liked;
  const saved = post.saved;

  const handleClickLike = async () => {
    try {
      setIsLikeLoading(true);
      if (!liked) {
        await appAxios.post("/posts/like/" + post._id);
        dispatch(addLike({ postId: post._id, userId: user?._id || "" }));
      } else {
        await appAxios.delete("/posts/like/" + post._id);
        dispatch(removeLike({ postId: post._id, userId: user?._id || "" }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleClickSave = async () => {
    try {
      setIsSaveLoading(true);
      if (!saved) {
        await appAxios.post("/posts/save/" + post._id);
        dispatch(addToSaved(post));
      } else {
        await appAxios.delete("/posts/save/" + post._id);
        dispatch(unsavePost(post._id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <ul className={scss.interaction}>
      <li
        onClick={handleClickLike}
        className={isLikeLoading ? scss.loading : ""}
      >
        <HeartIcon active={liked} red />
      </li>
      {!post.hideComments && (
        <li onClick={() => textareaRef?.current?.focus()}>
          <CommentIcon />
        </li>
      )}
      <li>
        <PlaneIcon />
      </li>
      <li
        onClick={handleClickSave}
        className={isSaveLoading ? scss.loading : ""}
      >
        <BookMarkIcon active={saved} />
      </li>
    </ul>
  );
};
