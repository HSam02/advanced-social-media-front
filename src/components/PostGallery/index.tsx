import { memo } from "react";
import { NavLink } from "react-router-dom";
import { IPost } from "../../app/slices/posts";
import { PostBox } from "./PostBox";
import scss from "./PostGallery.module.scss";

type PostGalleryProps = {
  posts: IPost[];
};

export const PostGallery: React.FC<PostGalleryProps> = memo(({ posts }) => {
  console.log("PostGallery");

  return (
    <ul className={scss.gallery}>
      {posts.map(
        (post) =>
          post && (
            <li key={post._id}>
              <NavLink to={post._id}>
                <PostBox post={post} />
              </NavLink>
              {/* <MediaBox aspect={post.aspect} media={post.media[0]} /> */}
            </li>
          )
      )}
    </ul>
  );
});
