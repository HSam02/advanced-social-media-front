import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { selectUserPosts } from "../../../../app/slices/posts";
import { FullPostSlider } from "../../../../components";
import { useEffect } from "react";

export const PostsSlider = () => {
  const postsData = useAppSelector(selectUserPosts);
  // const { postId } = useParams();

  // useEffect(() => {
  //   if (
  //     postsData &&
  //     postsData.posts.findIndex((post) => postId === post._id) ===
  //       postsData.posts.length - 2
  //   ) {
      
  //   }
  // }, [postId, postsData]);

  if (!postsData) {
    return <></>;
  }

  return <FullPostSlider posts={postsData.posts} />;
};
