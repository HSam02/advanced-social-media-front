import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { addLike } from "../../../../app/slices/posts";
import appAxios from "../../../../utils/appAxios";
import scss from "./FullPostLikes.module.scss";
import { selectUser } from "../../../../app/slices/user";

type FullPostLikesProps = {
  postId: string;
  likesCount: number;
};

export const FullPostLikes: React.FC<FullPostLikesProps> = ({
  likesCount,
  postId,
}) => {
  console.log("FullPostLikes");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const handleFirstLike = async () => {
    try {
      setIsLikeLoading(true);
      await appAxios.post("/posts/like/" + postId);
      dispatch(addLike({ postId, userId: user?._id || "" }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };
  return (
    <p className={scss.likes}>
      {likesCount ? (
        <>
          {likesCount} like{likesCount > 1 ? "s" : ""}
        </>
      ) : (
        <>
          Be the first to{" "}
          <span
            onClick={handleFirstLike}
            className={isLikeLoading ? scss.likeLoading : undefined}
          >
            like this
          </span>
        </>
      )}
    </p>
  );
};
