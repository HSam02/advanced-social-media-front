import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PostGallery } from "../../../components";
import { SharePosts } from "../SharePosts";
import { useEffect } from "react";
import { getUserPostsAsync, selectUserPosts } from "../../../app/slices/posts";
import { useGetPage } from "../../../utils/hooks";

export const Posts: React.FC = () => {
  const postsData = useAppSelector(selectUserPosts);
  const dispatch = useAppDispatch();
  const { username } = useParams();

  const page = useGetPage(postsData);

  useEffect(() => {
    if (
      username &&
      (!postsData ||
        (postsData.posts.length < page * 10 &&
          postsData.posts.length < postsData.postsCount))
    ) {
      dispatch(getUserPostsAsync({ username, page }));
    }
  }, [dispatch, username, page, postsData]);

  console.log("Posts", postsData, page);

  if (!postsData) {
    return null;
  }

  const { posts } = postsData;

  return posts.length > 0 ? (
    <>
      <PostGallery posts={posts} />
      <Outlet />
    </>
  ) : (
    <SharePosts />
  );
};
