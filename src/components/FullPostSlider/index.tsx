import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostFilter } from "../../utils/hooks";
import { IPost } from "../../app/slices/posts";
import { MediaSliderArrows, ModalBackground } from "../AppComponents";
import { FullPost } from "./FullPost";
import scss from "./FullPostSlider.module.scss";

type FullPostSliderProps = {
  posts: IPost[];
};

export const FullPostSlider: React.FC<FullPostSliderProps> = ({ posts }) => {
  console.log("FullPostSlider");

  const [currentPost, setCurrentPost] = useState<number>();
  const { postId, username } = useParams();
  const tempIndex = useRef<number>();
  const tempPostId = useRef<string | undefined>(postId);
  const navigate = useNavigate();
  
  const filter = usePostFilter();
  
  const navigateToGallery = useCallback(() => {
    navigate(
      filter === "posts"
        ? `/${username}`
        : filter === "reels"
        ? `/${username}/reels`
        : `/${username}/saved`
    );
  }, [navigate, filter, username]);

  useEffect(() => {
    if (
      currentPost !== undefined &&
      currentPost !== tempIndex.current &&
      postId === tempPostId.current
    ) {
      return;
    }
    const index = posts.findIndex((el) => el && el._id === postId);
    if (index === -1) {
      navigateToGallery();
      return;
    }
    setCurrentPost(index);
    tempIndex.current = index;
  }, [posts, postId, navigateToGallery, currentPost]);

  useEffect(() => {
    if (
      currentPost !== undefined &&
      postId === tempPostId.current &&
      postId !== posts[currentPost]._id
    ) {
      tempIndex.current = currentPost;
      tempPostId.current = posts[currentPost]._id;
      navigate(
        filter === "posts"
          ? `/${username}/${posts[currentPost]._id}`
          : filter === "reels"
          ? `/${username}/reels/${posts[currentPost]._id}`
          : `/${username}/saved/${posts[currentPost]._id}`
      );
    } else {
      tempPostId.current = postId;
    }
  }, [currentPost, navigate, posts, username, filter, postId]);

  if (currentPost === undefined) {
    return null;
  }

  return (
    <>
      <ModalBackground onClose={navigateToGallery}>
        <div>
          <FullPost post={posts[currentPost!]} />
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
