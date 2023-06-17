import { IPost } from "../../../app/slices/posts";
import { MediaSlider } from "../../MediaSlider";
import { FullPostContent } from "./FullPostContent";
import scss from "./FullPost.module.scss";

type FullPostProps = {
  post: IPost;
};

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  console.log("FullPost", post);
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
        <FullPostContent post={post} />
      </div>
    </div>
  );
};
