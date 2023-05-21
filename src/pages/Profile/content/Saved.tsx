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
  const postsData = useAppSelector(selectUserSavedPosts);
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  console.log("Saved");

  const { page, setPage } = usePage(postsData);

  useEffect(() => {
    if (
      !postsData ||
      (postsData.status !== "loading" &&
        postsData.posts.length < page * 10 &&
        postsData.posts.length < postsData.postsCount)
    ) {
      dispatch(getUserSavedPostsAsync(page));
      return;
    }

    if (
      postsData &&
      page < postsData.pages &&
      postsData.posts.findIndex((post) => postId === post._id) ===
        postsData.posts.length - 2
    ) {
      setPage(page + 1);
    }
  }, [dispatch, page, setPage, postsData, postId]);

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
