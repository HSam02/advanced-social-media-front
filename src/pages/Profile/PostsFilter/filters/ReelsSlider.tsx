import { useAppSelector } from "../../../../app/hooks";
import { selectUserReels } from "../../../../app/slices/posts";
import { FullPostSlider } from "../../../../components";

export const ReelsSlider = () => {
  const postsData = useAppSelector(selectUserReels);

  if (!postsData) {
    return <></>;
  }

  return <FullPostSlider posts={postsData.posts} />;
};
