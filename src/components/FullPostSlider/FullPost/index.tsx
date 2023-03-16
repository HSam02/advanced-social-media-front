import { useEffect, useState } from "react";
import { IPost } from "../../../app/slices/posts";
import { PostTitle } from "../../AppComponents";
import { MediaSlider } from "../../MediaSlider";
import { UserInteraction } from "../../AppComponents/UserInteraction";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../app/slices/user";
import scss from "./FullPost.module.scss";
import appAxios from "../../../appAxios";
import { useParams } from "react-router-dom";

type FullPostProps = {
  post?: IPost;
};

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  // const { user } = useAppSelector(selectUser);
  const { postId } = useParams();
  const [postCopy, setPostCopy] = useState(post);
  console.log("FullPost", post);
  useEffect(() => {
    if (!post) {
      (async () => {
        try {
          const { data } = await appAxios.get<IPost>("/posts/" + postId);
          setPostCopy(data);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setPostCopy(post);
    }
  }, [post, postId]);

  if (!postCopy) {
    return null;
  }

  return (
    <div className={scss.fullPost}>
      <div className={scss.media}>
        <MediaSlider
          aspect={postCopy.aspect}
          media={postCopy.media}
          arrowsType="dark-white"
          videoPlay
        />
      </div>
      <div className={scss.postInfo}>
        <div className={scss.container}>
          <PostTitle
            username={postCopy.user.username}
            avatarDest={postCopy.user.avatarDest}
          />
        </div>
        <div className={`${scss.comments} ${scss.container}`}></div>
        <div className={scss.container}>
          <UserInteraction post={postCopy} />
          <p className={scss.likes}>{postCopy.likes.length} likes</p>
          <p className={scss.date}>5 days ago</p>
        </div>
        <div className={scss.addComment}></div>
      </div>
    </div>
  );
};
