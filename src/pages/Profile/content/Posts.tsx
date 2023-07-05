import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PostGallery } from "../../../components";
import { SharePosts } from "../SharePosts";
import { getUserPostsAsync, selectUserPosts } from "../../../app/slices/posts";
import { usePostsPage } from "../../../utils/hooks";

export const Posts: React.FC = () => {
  console.log("Posts");
  const postsData = useAppSelector(selectUserPosts);
  const dispatch = useAppDispatch();
  const { username, postId } = useParams();

  usePostsPage(postsData, () => {
    if (username) {
      dispatch(getUserPostsAsync(username));
    }
  });

  useEffect(() => {
    if (
      username &&
      postsData.status !== "loading" &&
      postsData.posts &&
      postsData.postsCount &&
      postsData.posts.length < postsData.postsCount &&
      postsData.posts.findIndex((post) => postId === post._id) ===
        postsData.posts.length - 3
    ) {
      dispatch(getUserPostsAsync(username));
    }
  }, [dispatch, username, postId, postsData]);

  if (!postsData.posts) {
    return postsData.status === "loading" ? null : <SharePosts />;
  }

  return postsData.posts.length > 0 ? (
    <>
      <PostGallery posts={postsData.posts} />
      <Outlet />
    </>
  ) : (
    <SharePosts />
  );
};
