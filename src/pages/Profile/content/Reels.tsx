import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PostGallery } from "../../../components";
import { SharePosts } from "../SharePosts";
import { useEffect } from "react";
import {
  getUserReelsAsync,
  selectUserReels,
} from "../../../app/slices/posts";
import { usePage } from "../../../utils/hooks";

export const Reels: React.FC = () => {
  console.log("Reels");
  
  const postsData = useAppSelector(selectUserReels);
  const dispatch = useAppDispatch();
  const { username, postId } = useParams();

  usePage(postsData, () => {
    if (username) {
      dispatch(getUserReelsAsync(username));
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
      dispatch(getUserReelsAsync(username));
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
