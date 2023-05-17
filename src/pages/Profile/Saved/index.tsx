import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { removeUserUnsaves, selectUser } from "../../../app/slices/user";
import { PostGallery } from "../../../components";
import {
  clearUnsavedPosts,
  getUserSavedPostsAsync,
  selectUserSavedPosts,
} from "../../../app/slices/posts";
import { useGetPage } from "../../../utils/hooks";

export const Saved: React.FC = () => {
  const postsData = useAppSelector(selectUserSavedPosts);
  // const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log("Saved");

  const page = useGetPage(postsData);

  useEffect(() => {
    if (
      !postsData ||
      (postsData.posts.length < page * 10 &&
        postsData.posts.length < postsData.postsCount)
    ) {
      dispatch(getUserSavedPostsAsync(page));
    }
  }, [dispatch, page, postsData]);

  useEffect(() => {
    dispatch(clearUnsavedPosts());
    return () => {
      dispatch(clearUnsavedPosts());
    };
  }, [dispatch]);

  if (!postsData) {
    return null;
  }
  return postsData && postsData.posts.length > 0 ? (
    <>
      <PostGallery posts={postsData.posts} />
      <Outlet />
    </>
  ) : (
    <h5>You don't have saved post</h5>
  );
};
