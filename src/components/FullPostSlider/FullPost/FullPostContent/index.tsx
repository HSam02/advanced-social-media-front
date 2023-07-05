import { useState } from "react";
import { IPost } from "../../../../app/slices/posts";
import TextareaContext from "../../../Comments/TextareaContext";
import { Avatar } from "../../../AppComponents";
import { Comments } from "../../../Comments";
import { CommentInput } from "../../../Comments/CommentInput";
import { FullPostLikes } from "../FullPostLikes";
import { PostTitle } from "./PostTitle";
import { UserInteraction } from "../UserInteraction";
import scss from "./FullPostContent.module.scss";

type FullPostContentProps = {
  post: IPost;
};

export const FullPostContent: React.FC<FullPostContentProps> = ({ post }) => {
  console.log("FullPostContent");

  const [inputRef, setInputRef] =
    useState<React.RefObject<HTMLTextAreaElement> | null>(null);

  return (
    <TextareaContext.Provider value={inputRef}>
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
          <Comments
            postId={post._id}
            hideComments={post.hideComments}
            postText={Boolean(post.text)}
          />
        </div>
        <div className={scss.container}>
          <UserInteraction post={post} />
          <FullPostLikes postId={post._id} likesCount={post.likes.length} />
          <p className={scss.date}>{post.createdAt}</p>
        </div>
        {!post.hideComments && (
          <div className={scss.addComment}>
            <CommentInput postId={post._id} setInputRef={setInputRef} />
          </div>
        )}
      </div>
    </TextareaContext.Provider>
  );
};
