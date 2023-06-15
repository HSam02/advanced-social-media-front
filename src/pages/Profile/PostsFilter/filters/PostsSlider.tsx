import { useAppSelector } from "../../../../app/hooks";
import { selectUserPosts } from "../../../../app/slices/posts";
import { FullPostSlider } from "../../../../components";

export const PostsSlider = () => {
  const postsData = useAppSelector(selectUserPosts);

  if (!postsData.posts) {
    return <></>;
  }

  return <FullPostSlider posts={postsData.posts} />;
};
