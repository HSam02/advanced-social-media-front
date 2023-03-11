import { PostBox } from "./PostBox";
import { IPost } from "../../app/slices/posts";
import scss from "./PostGallery.module.scss";

type PostGalleryProps = {
  posts: IPost[];
};

export const PostGallery: React.FC<PostGalleryProps> = ({ posts }) => {
  console.log("PostGallery");
  
  return (
    <ul className={scss.gallery}>
      {posts.map((post) => (
        <li key={post._id}>
          <PostBox post={post} />
        </li>
      ))}
    </ul>
  );
};
