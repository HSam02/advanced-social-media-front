import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPostCommentsAsync,
  selectPostComments,
} from "../../app/slices/comments";
import { IPost } from "../../app/slices/posts";
import { Comment } from "./Comment";
import { TextButton } from "../AppComponents";
import { LoadingIcon, PlusCircleIcon } from "../icons";
import scss from "./Comments.module.scss";

type CommentsProps = {
  post: IPost;
};

export const Comments: React.FC<CommentsProps> = ({ post }) => {
  console.log("Comments");

  const dispatch = useAppDispatch();
  const commentsData = useAppSelector(selectPostComments(post._id));

  useEffect(() => {
    if (!commentsData && !post.hideComments) {
      dispatch(getPostCommentsAsync(post._id));
    }
  }, [post, dispatch, commentsData]);

  if (
    ((commentsData?.status === "idle" && commentsData.comments.length === 0) ||
      post.hideComments) &&
    !post.text
  ) {
    return (
      <div className={scss.noComments}>
        <h6>No comments yet.</h6>
        <p>Start the conversation</p>
      </div>
    );
  }

  if (!commentsData) {
    return null;
  }

  if (commentsData.status === "error" && commentsData.comments.length === 0) {
    return (
      <div
        className={scss.center}
        style={post.text ? { height: "unset" } : undefined}
      >
        <TextButton onClick={() => dispatch(getPostCommentsAsync(post._id))}>
          Retry
        </TextButton>
      </div>
    );
  }

  if (commentsData.status === "loading" && commentsData.comments.length === 0) {
    return (
      <div className={scss.center}>
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
              dispatch(getPostCommentsAsync(post._id));
            }}
            className={scss.showMore}
          >
            <PlusCircleIcon />
          </li>
        ))}
    </ul>
  );
};
