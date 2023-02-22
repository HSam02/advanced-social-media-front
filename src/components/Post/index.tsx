import { BookMarkIcon, CommentIcon, DotsIcon, HeartIcon, PlaneIcon } from "../icons";
import { Avatar } from "../AppComponents";
import scss from "./Post.module.scss";

export const Post: React.FC = () => {
  return (
    <li className={scss.post}>
      <div className={scss.title}>
        <div className={scss.userInfo}>
          <a href="/">
            <Avatar />
          </a>
          <p>
            <a href="/">nnickname</a> &#183; <span>4h</span>
          </p>
        </div>
        <a href="/">
          <DotsIcon />
        </a>
      </div>
      <div className={scss.photo}>
        <img
          src="https://images.unsplash.com/photo-1597573337211-e1080012b84b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8OSUzQTE2fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt=""
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
