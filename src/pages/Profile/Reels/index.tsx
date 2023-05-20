import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PostGallery } from "../../../components";
import { SharePosts } from "../SharePosts";
import { useEffect } from "react";
import { getUserReelsAsync, selectUserReels } from "../../../app/slices/posts";
import { usePage } from "../../../utils/hooks";

export const Reels: React.FC = () => {
  const postsData = useAppSelector(selectUserReels);
  const dispatch = useAppDispatch();
  const { username, postId } = useParams();

  const { page, setPage } = usePage(postsData);

  useEffect(() => {
    if (
      username &&
      (!postsData ||
        (postsData.posts.length < page * 10 &&
          postsData.posts.length < postsData.postsCount))
    ) {
      dispatch(getUserReelsAsync({ username, page }));
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
  }, [dispatch, username, page, setPage, postsData, postId]);

  console.log("Reels", postsData, page);

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
