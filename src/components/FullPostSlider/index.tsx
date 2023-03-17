import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { MediaSliderArrows, ModalBackground } from "../AppComponents";
import { FullPost } from "./FullPost";
import scss from "./FullPostSlider.module.scss";

export const FullPostSlider: React.FC = () => {
  console.log("FullPostSlider");

  const [currentPost, setCurrentPost] = useState<number | undefined>();
  const { user } = useAppSelector(selectUser);
  const { postId, username } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const filter = pathname.includes("saved") ? "saved" : "posts";
  const posts = user && user[filter];

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
          : `/${username}/saved/${posts[currentPost]._id}`
      );
    } else if (posts && !posts.find((el) => el && el._id === postId)) {
      navigate(filter === "posts" ? `/${username}` : `/${username}/saved`);
    }
  }, [currentPost, navigate, posts, username, filter, pathname, postId]);

  if (!posts || !username || currentPost === undefined) {
    return null;
  }

  return (
    <>
      <ModalBackground
        onClose={() =>
          navigate(filter === "posts" ? `/${username}` : `/${username}/saved`)
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
