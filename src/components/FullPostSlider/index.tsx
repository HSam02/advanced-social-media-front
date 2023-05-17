import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MediaSliderArrows, ModalBackground } from "../AppComponents";
import { FullPost } from "./FullPost";
import scss from "./FullPostSlider.module.scss";
import { IPost } from "../../app/slices/posts";
import { useGetPostFilter } from "../../utils/hooks";

type FullPostSliderProps = {
  posts: IPost[];
};

export const FullPostSlider: React.FC<FullPostSliderProps> = ({ posts }) => {
  console.log("FullPostSlider");

  const [currentPost, setCurrentPost] = useState<number | undefined>();
  const { postId, username } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const filter = useGetPostFilter();

  useEffect(() => {
    const index = posts?.findIndex((el) => el && el._id === postId);
    if (index !== -1) {
      setCurrentPost(index);
    }
  }, [posts, postId]);

  useEffect(() => {
    if (
      currentPost !== undefined &&
      posts &&
      posts[currentPost] &&
      !pathname.includes(posts[currentPost]._id)
    ) {
      navigate(
        filter === "posts"
          ? `/${username}/${posts[currentPost]._id}`
          : filter === "reels"
          ? `/${username}/reels/${posts[currentPost]._id}`
          : `/${username}/saved/${posts[currentPost]._id}`
      );
    } else if (posts && !posts.find((el) => el && el._id === postId)) {
      navigate(
        filter === "posts"
          ? `/${username}`
          : filter === "reels"
          ? `/${username}/reels`
          : `/${username}/saved`
      );
    }
  }, [currentPost, navigate, posts, username, filter, pathname, postId]);

  if (!posts || !username || currentPost === undefined) {
    return null;
  }

  return (
    <>
      <ModalBackground
        onClose={() =>
          navigate(
            filter === "posts"
              ? `/${username}`
              : filter === "reels"
              ? `/${username}/reels`
              : `/${username}/saved`
          )
        }
      >
        <div>
          <FullPost post={posts[currentPost]} />
        </div>
      </ModalBackground>
      {currentPost !== undefined && (
        <div className={scss.arrows}>
          <MediaSliderArrows
            currentMedia={currentPost}
            mediaCount={posts.length}
            setCurrentMedia={
              setCurrentPost as React.Dispatch<React.SetStateAction<number>>
            }
            type="white"
          />
        </div>
      )}
    </>
  );
};
