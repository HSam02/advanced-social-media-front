import { IPost } from "../../../app/slices/posts";
import { MediaBox } from "../../AppComponents";
import {
  CommentFillIcon,
  HeartIcon,
  MediaGalleryFilledIcon,
} from "../../icons";
import scss from "./PostBox.module.scss";

type PostBoxProps = {
  post: IPost;
};

export const PostBox: React.FC<PostBoxProps> = ({ post }) => {
  console.log("PostBox");

  const mediaClassName = `${scss.mediaBox} ${
    post.aspect <= 1 ? scss.width100 : ""
  } ${post.aspect >= 1 ? scss.height100 : ""}`;

  return (
    <div className={scss.box}>
      <div className={mediaClassName}>
        <MediaBox aspect={post.aspect} media={post.media[0]} />
      </div>
      {post.media.length > 1 && (
        <span className={scss.galleryIcon}>
          <MediaGalleryFilledIcon />
        </span>
      )}
      {!(post.hideComments && post.hideLikes) && (
        <div className={scss.hoverDiv}>
          <div>
            {!post.hideLikes && (
              <span>
                <HeartIcon active /> 5465
              </span>
            )}
            {!post.hideComments && (
              <span>
                <CommentFillIcon /> 5465
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
