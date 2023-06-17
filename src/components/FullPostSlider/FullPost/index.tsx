import { useState } from "react";
import { IPost } from "../../../app/slices/posts";
import { Avatar, PostTitle, UserInteraction } from "../../AppComponents";
import { MediaSlider } from "../../MediaSlider";
import { CommentInput } from "../../Comments/CommentInput";
import { Comments } from "../../Comments";
import TextareaContext from "../../Comments/TextareaContext";
import scss from "./FullPost.module.scss";

type FullPostProps = {
  post: IPost;
};

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  console.log("FullPost", post);

  const [inputRef, setInputRef] =
    useState<React.RefObject<HTMLTextAreaElement> | null>(null);

  return (
    <div className={scss.fullPost}>
      <TextareaContext.Provider value={inputRef}>
        <div className={scss.media}>
          <MediaSlider
            aspect={post.aspect}
            media={post.media}
            arrowsType="dark-white"
            videoPlay
          />
        </div>
        <div className={scss.postInfo}>
          <div className={scss.container}>
            <PostTitle post={post} />
          </div>
          <div className={`${scss.comments} ${scss.container}`}>
            {post.text && (
              <li className={scss.postDescription}>
                <Avatar size="32px" dest={post.user.avatarDest} />
                <pre>
                  <span>{post.user.username}</span>
                  {post.text}
                </pre>
              </li>
            )}
            <Comments post={post} />
          </div>
          <div className={scss.container}>
            <UserInteraction post={post} />
            <p className={scss.likes}>{post.likes.length} likes</p>
            <p className={scss.date}>{post.createdAt}</p>
          </div>
          {!post.hideComments && (
            <div className={scss.addComment}>
              <CommentInput postId={post._id} setInputRef={setInputRef} />
            </div>
          )}
        </div>
      </TextareaContext.Provider>
    </div>
  );
};
