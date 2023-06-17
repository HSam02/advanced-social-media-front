import { useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPostCommentsAsync,
  selectPostComments,
} from "../../app/slices/comments";
import { Comment } from "./Comment";
import { NoComments } from "./NoComments";
import { TextButton } from "../AppComponents";
import { LoadingIcon, PlusCircleIcon } from "../icons";
import scss from "./Comments.module.scss";

type CommentsProps = {
  postId: string;
  postText: boolean;
  hideComments: boolean;
};

export const Comments: React.FC<CommentsProps> = memo(
  ({ hideComments, postId, postText }) => {
    console.log("Comments");

    const dispatch = useAppDispatch();
    const commentsData = useAppSelector(selectPostComments(postId));

    useEffect(() => {
      if (!commentsData && !hideComments) {
        dispatch(getPostCommentsAsync(postId));
      }
    }, [postId, hideComments, dispatch, commentsData]);

    if (
      ((commentsData?.status === "idle" &&
        commentsData.comments.length === 0) ||
        hideComments) &&
      !postText
    ) {
      return <NoComments />;
    }

    if (!commentsData || hideComments) {
      return null;
    }

    if (commentsData.status === "error" && commentsData.comments.length === 0) {
      return (
        <div
          className={scss.center}
          style={postText ? { height: "unset" } : undefined}
        >
          <TextButton onClick={() => dispatch(getPostCommentsAsync(postId))}>
            Retry
          </TextButton>
        </div>
      );
    }

    if (
      commentsData.status === "loading" &&
      commentsData.comments.length === 0
    ) {
      return (
        <div
          className={scss.center}
          style={postText ? { height: "unset" } : undefined}
        >
          <LoadingIcon />
        </div>
      );
    }

    return (
      <ul className={scss.comments}>
        {commentsData.comments.map((comment) => (
          <li key={comment._id}>
            <Comment comment={comment} />
          </li>
        ))}
        {commentsData.comments.length < commentsData.commentsCount &&
          (commentsData.status === "loading" ? (
            <div className={scss.showMore}>
              <LoadingIcon />
            </div>
          ) : (
            <li
              onClick={() => {
                dispatch(getPostCommentsAsync(postId));
              }}
              className={scss.showMore}
            >
              <PlusCircleIcon />
            </li>
          ))}
      </ul>
    );
  }
);
