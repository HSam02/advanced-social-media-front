import { useAppSelector } from "../../../../app/hooks";
import { selectUserSavedPosts } from "../../../../app/slices/posts";
import { FullPostSlider } from "../../../../components";

export const SavedSlider = () => {
  const postsData = useAppSelector(selectUserSavedPosts);

  if (!postsData.posts) {
    return <></>;
  }

  return <FullPostSlider posts={postsData.posts} />
};
