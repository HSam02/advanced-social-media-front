import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPostCommentsAsync,
  selectPostComments,
} from "../../app/slices/comments";
import { Comment } from "./Comment";
import scss from "./Comments.module.scss";

type CommentsProps = {
  postId: string;
};

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  console.log("Comments");

  const dispatch = useAppDispatch();
  const commentsData = useAppSelector(selectPostComments(postId));
  useEffect(() => {
    if (!commentsData) {
      dispatch(getPostCommentsAsync({ postId, page: 1 }));
    }
  }, [postId, dispatch, commentsData]);

  if (!commentsData) {
    return null;
  }

  if (commentsData.comments.length === 0) {
    return (
      <div className={scss.noComments}>
        <h6>No comments yet.</h6>
        <p>Start the conversation</p>
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
    </ul>
  );
};
