import { IPost } from "../../../app/slices/posts";
import { PostTitle } from "../../AppComponents";
import { MediaSlider } from "../../MediaSlider";
import { UserInteraction } from "../../AppComponents/UserInteraction";
import scss from "./FullPost.module.scss";

type FullPostProps = {
  post: IPost;
};

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  console.log("FullPost", post)

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
        <div className={`${scss.comments} ${scss.container}`}></div>
        <div className={scss.container}>
          <UserInteraction post={post} />
          <p className={scss.likes}>{post.likes.length} likes</p>
          <p className={scss.date}>{post.createdAt}</p>
        </div>
        <div className={scss.addComment}></div>
      </div>
    </div>
  );
};
