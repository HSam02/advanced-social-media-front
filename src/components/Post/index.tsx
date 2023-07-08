import { useEffect, useState } from "react";
import { MediaSlider } from "../";
import scss from "./Post.module.scss";
import appAxios from "../../utils/appAxios";
import { IPost } from "../../app/slices/posts";
import { PostTitle } from "../FullPostSlider/FullPost/FullPostContent/PostTitle";
import { UserInteraction } from "../FullPostSlider/FullPost/UserInteraction";

export const Post: React.FC = () => {
  const [post, setPost] = useState<IPost | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await appAxios.get<IPost>(
          "/posts/640a3a5813fc6721e0c7268f"
        );
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  if (!post) {
    return <></>;
  }
  return (
    <li className={scss.post}>
      <PostTitle
        post={post}
      />
      <div className={scss.photo}>
        <MediaSlider
          aspect={post.aspect}
          media={post.media}
          videoPlay
          intersection
        />
      </div>
      <div className={scss.subtitle}>
        <UserInteraction post={post} />
        <p className={scss.likes}>{4788} likes</p>
        <div className={scss.description}>
          description vnjndjk fbhjad hbefhd j ehjf hjhj ddfh dfh df
        </div>
        <div className={scss.comments}>
          <a href="/">View all {18} comments</a>
          <div>
            <textarea placeholder="Add a comment..."></textarea>
            <a href="/">Post</a>
          </div>
        </div>
      </div>
    </li>
  );
};
