import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../app/slices/user";
import { PostGallery } from "../../../components";
import { SharePosts } from "../SharePosts";

export const Posts: React.FC = () => {
  const { user } = useAppSelector(selectUser);
  console.log("Posts", user);

  if (!user) {
    return null;
  }
  return user.posts.length > 0 ? (
    <>
      <PostGallery posts={user.posts} />
      <Outlet />
    </>
  ) : (
    <SharePosts />
  );
};
