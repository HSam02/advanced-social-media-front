import { useEffect, useState } from "react";
import {
  BookMarkIcon,
  CommentIcon,
  DotsIcon,
  HeartIcon,
  PlaneIcon,
} from "../icons";
import { Avatar, MediaSlider } from "../";
import scss from "./Post.module.scss";
import appAxios from "../../appAxios";
import { IPost } from "../../app/slices/posts";

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
        console.log(error);
      }
    })();
  }, []);
  if (!post) {
    return <></>;
  }
  return (
    <li className={scss.post}>
      <div className={scss.title}>
        <div className={scss.userInfo}>
          <a href="/">
            <Avatar />
          </a>
          <p>
            <a href="/">{post?.user.username}</a> &#183; <span>4h</span>
          </p>
        </div>
        <a href="/">
          <DotsIcon />
        </a>
      </div>
      <div className={scss.photo}>
        <MediaSlider
          aspect={post.aspect}
          dataCount={post.media.length}
          media={post.media}
          videoPlay
        />
      </div>
      <div className={scss.subtitle}>
        <div className={scss.icons}>
          <HeartIcon />
          <CommentIcon />
          <PlaneIcon />
          <BookMarkIcon />
        </div>
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
