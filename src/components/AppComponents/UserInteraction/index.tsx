import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IPost } from "../../../app/slices/posts";
import { ISavedPost, selectUser } from "../../../app/slices/user";
import appAxios from "../../../appAxios";
import { BookMarkIcon, CommentIcon, HeartIcon, PlaneIcon } from "../../icons";
import {
  addLike,
  addSaved,
  removeLike,
  removeSaved,
} from "../../../app/thunks";
import scss from "./UserInteraction.module.scss";

type UserInteractionProps = {
  post: IPost | ISavedPost;
};

export const UserInteraction: React.FC<UserInteractionProps> = ({ post }) => {
  console.log("UserInteraction");
  
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  // const [postCopy, setPostCopy] = useState<IPost>({...post});

  const liked = post.likes.includes(user!._id);
  const saved = Boolean(
    user!.saved.find((savedPost) => savedPost && savedPost._id === post._id && !savedPost.deleted)
  );

    console.log(saved);

  const handleClickLike = async () => {
    try {
      setIsLikeLoading(true);
      if (!liked) {
        await appAxios.post("/posts/like/" + post._id);
        dispatch(addLike(post._id, user!._id));
        // setPostCopy((prev) => ({
        //   ...prev,
        //   likes: [user!._id, ...prev.likes],
        // }));
      } else {
        await appAxios.delete("/posts/like/" + post._id);
        dispatch(removeLike(post._id, user!._id));
        // setPostCopy((prev) => ({
        //   ...prev,
        //   likes: prev.likes.filter((like) => like !== user!._id),
        // }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleClickSave = async () => {
    try {
      setIsSaveLoading(true);
      if (!saved) {
        await appAxios.post("/posts/save/" + post._id);
        dispatch(addSaved(post, user!._id));
        // setPostCopy((prev) => ({
        //   ...prev,
        //   saves: prev.saves + 1,
        // }));
      } else {
        await appAxios.delete("/posts/save/" + post._id);
        dispatch(removeSaved(post._id, user!._id));
        // setPostCopy((prev) => ({
        //   ...prev,
        //   saves: prev.saves - 1,
        // }));
      }
    } catch (error) {
      console.log(error);
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
        <HeartIcon active={liked} />
      </li>
      <li>
        <CommentIcon />
      </li>
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
