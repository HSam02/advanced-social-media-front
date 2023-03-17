import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { IPost } from "../../app/slices/posts";
import { deletePost } from "../../app/slices/user";
import appAxios from "../../appAxios";
import { ModalBackground } from "../AppComponents";
import scss from "./PostSettingsModal.module.scss";
import { DiscardModal } from "../DiscardModal";
import { useLocation, useNavigate } from "react-router-dom";

type PostSettingsModalProps = {
  post: IPost;
  onClose: () => void;
};

export const PostSettingsModal: React.FC<PostSettingsModalProps> = ({
  post,
  onClose,
}) => {
  console.log("PostSettingsModal");
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleDeletePost = async () => {
    try {
      navigate(pathname.split("/").slice(0, -1).join("/"));
      await appAxios.delete(`/posts/${post._id}`);
      dispatch(deletePost(post._id));
    } catch (error) {
      alert("Post didn't delete");
      console.log(error);
    }
  };

  if (showDiscardModal) {
    return (
      <DiscardModal
        acceptText="Delete"
        title="Delete post?"
        text="Are you sure you want to delete this post?"
        onAccept={handleDeletePost}
        onClose={onClose}
      />
    );
  }

  return (
    <ModalBackground onClose={onClose}>
      <ul className={scss.box}>
        <li onClick={() => setShowDiscardModal(true)}>Delete</li>
        <li>Edit</li>
        <li>Hide like count</li>
        <li>Turn off commenting</li>
        <li>Go to post</li>
        <li>Share to Direct</li>
        <li>Copy link</li>
        <li onClick={onClose}>Cancel</li>
      </ul>
      {/* {showDiscardModal && (
        <DiscardModal
          acceptText="Delete"
          title="Delete post?"
          text="Are you sure you want to delete this post?"
          onAccept={handleDeletePost}
          onClose={() => setShowDiscardModal(false)}
        />
      )} */}
    </ModalBackground>
  );
};
