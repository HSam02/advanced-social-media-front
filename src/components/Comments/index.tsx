import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPostCommentsAsync,
  selectPostComments,
} from "../../app/slices/comments";
import { Comment } from "./Comment";
import scss from "./Comments.module.scss";
import { IPost } from "../../app/slices/posts";
import { Avatar } from "../AppComponents";
import { LoadingIcon, PlusCircleIcon } from "../icons";

type CommentsProps = {
  post: IPost;
};

export const Comments: React.FC<CommentsProps> = ({ post }) => {
  console.log("Comments");

  const dispatch = useAppDispatch();
  const commentsData = useAppSelector(selectPostComments(post._id));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!commentsData) {
      dispatch(getPostCommentsAsync(post._id));
    }
  }, [post, dispatch, commentsData]);

  if (!commentsData) {
    return null;
  }

  if (commentsData.comments.length === 0 && !post.text) {
    return (
      <div className={scss.noComments}>
        <h6>No comments yet.</h6>
        <p>Start the conversation</p>
      </div>
    );
  }

  return (
    <ul className={scss.comments}>
      {post.text && (
        <li className={scss.postDescription}>
          <Avatar size="32px" dest={post.user.avatarDest} />
          <pre>
            <span>{post.user.username}</span>
            {post.text}
          </pre>
        </li>
      )}
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
