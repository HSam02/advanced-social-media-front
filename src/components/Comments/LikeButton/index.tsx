import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addLike, removeLike } from "../../../app/slices/comments";
import appAxios from "../../../utils/appAxios";
import { HeartIcon } from "../../icons";
import scss from "./LikeButton.module.scss";

type LikeButtonProps = {
  id: string;
  liked: boolean;
};

export const LikeButton: React.FC<LikeButtonProps> = ({ id, liked }) => {
  console.log("LikeButton");

  const dispatch = useAppDispatch();
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const handleClickLike = async () => {
    try {
      setIsLikeLoading(true);
      if (liked) {
        await appAxios.delete("/comment/like/" + id);
        dispatch(removeLike(id));
      } else {
        await appAxios.post("/comment/like/" + id);
        dispatch(addLike(id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };
  return (
    <div
      onClick={handleClickLike}
      className={scss.likeButton}
      style={isLikeLoading ? { pointerEvents: "none" } : undefined}
    >
      <HeartIcon active={liked} red />
    </div>
  );
};
