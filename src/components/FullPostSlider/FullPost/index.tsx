import { useState } from "react";
import { IPost } from "../../../app/slices/posts";
import { PostTitle, UserInteraction } from "../../AppComponents";
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
          <TextareaContext.Provider value={inputRef}>
            <Comments post={post} />
          </TextareaContext.Provider>
        </div>
        <div className={scss.container}>
          <UserInteraction post={post} />
          <p className={scss.likes}>{post.likes.length} likes</p>
          <p className={scss.date}>{post.createdAt}</p>
        </div>
        <div className={scss.addComment}>
          <CommentInput postId={post._id} setInputRef={setInputRef} />
        </div>
      </div>
    </div>
  );
};
