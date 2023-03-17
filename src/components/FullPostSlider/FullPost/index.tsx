import { useEffect, useState } from "react";
import { IPost } from "../../../app/slices/posts";
import { ModalBackground, PostTitle } from "../../AppComponents";
import { MediaSlider } from "../../MediaSlider";
import { UserInteraction } from "../../AppComponents/UserInteraction";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../app/slices/user";
import scss from "./FullPost.module.scss";
import appAxios from "../../../appAxios";
import { useParams } from "react-router-dom";
import { PostSettingsModal } from "../../PostSettingsModal";

type FullPostProps = {
  post?: IPost;
};

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  // const { user } = useAppSelector(selectUser);
  // const { postId } = useParams();
  // const [postCopy, setPostCopy] = useState(post);
  console.log("FullPost", post);
  // useEffect(() => {
  //   if (!post) {
  //     (async () => {
  //       try {
  //         const { data } = await appAxios.get<IPost>("/posts/" + postId);
  //         setPostCopy(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   } else {
  //     setPostCopy(post);
  //   }
  // }, [post, postId]);

  if (!post) {
    return null;
  }

  return (
    <div className={scss.fullPost}>
      <div className={scss.media}>
        <MediaSlider
          aspect={post.aspect}
          media={post.media}
          arrowsType="dark-white"
          videoPlay
        />
      </div>
      <div className={scss.postInfo}>
        <div className={scss.container}>
          <PostTitle
            post={post}
          />
        </div>
        <div className={`${scss.comments} ${scss.container}`}></div>
        <div className={scss.container}>
          <UserInteraction post={post} />
          <p className={scss.likes}>{post.likes.length} likes</p>
          <p className={scss.date}>5 days ago</p>
        </div>
        <div className={scss.addComment}></div>
      </div>
    </div>
  );
};
