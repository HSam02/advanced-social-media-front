import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PostGallery } from "../../../components";
import {
  clearUnsavedPosts,
  getUserSavedPostsAsync,
  selectUserSavedPosts,
} from "../../../app/slices/posts";
import { usePage } from "../../../utils/hooks";

export const Saved: React.FC = () => {
  console.log("Saved");
  const postsData = useAppSelector(selectUserSavedPosts);
  const { postId } = useParams();
  const dispatch = useAppDispatch();

  usePage(postsData, () => {
    dispatch(getUserSavedPostsAsync());
  });

  useEffect(() => {
    if (
      postsData.status !== "loading" &&
      postsData.posts &&
      postsData.postsCount &&
      postsData.posts.length < postsData.postsCount &&
      postsData.posts.findIndex((post) => postId === post._id) ===
        postsData.posts.length - 3
    ) {
      dispatch(getUserSavedPostsAsync());
    }
  }, [dispatch, postId, postsData]);

  useEffect(() => {
    dispatch(clearUnsavedPosts());
    return () => {
      dispatch(clearUnsavedPosts());
    };
  }, [dispatch]);

  if (!postsData.posts) {
    return null;
  }
  return postsData.posts.length > 0 ? (
    <>
      <PostGallery posts={postsData.posts} />
      <Outlet />
    </>
  ) : (
    <h5>You don't have saved post</h5>
  );
};
