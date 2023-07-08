import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { IPost, editPost } from "../../app/slices/posts";
import appAxios from "../../utils/appAxios";
import { ModalBackground } from "../AppComponents";
import { DiscardModal } from "../DiscardModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteUserPost } from "../../app/thunks";
import scss from "./PostSettingsModal.module.scss";

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
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUser);
  const { username } = useParams();
  const { pathname } = useLocation();

  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleDeletePost = async () => {
    try {
      navigate(pathname.split("/").slice(0, -1).join("/"));
      await appAxios.delete(`/posts/${post._id}`);
      dispatch(deleteUserPost(post._id));
    } catch (error) {
      alert("Post didn't delete");
      console.error(error);
    }
  };

  const handleSwitchHideLikes = async () => {
    try {
      const newData = {
        hideLikes: !post.hideLikes,
      };
      await appAxios.patch(`/posts/${post._id}`, newData);
      dispatch(editPost({ _id: post._id, ...newData }));
    } catch (error) {
      alert("Post didn't update");
      console.error(error);
    } finally {
      onClose();
    }
  };

  const handleSwitchHideComments = async () => {
    try {
      const newData = {
        hideComments: !post.hideComments,
      };
      await appAxios.patch(`/posts/${post._id}`, newData);
      dispatch(editPost({ _id: post._id, ...newData }));
    } catch (error) {
      alert("Post didn't update");
      console.error(error);
    } finally {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Alert copied success");
      onClose();
    } catch (error) {
      console.error(error);
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

  console.log("aaaaaaaaaaaaaa", username, user);

  return (
    <ModalBackground onClose={onClose}>
      <ul className={scss.box}>
        {user?.username === username ? (
          <>
            <li onClick={() => setShowDiscardModal(true)}>Delete</li>
            <li>Edit</li>
            <li onClick={handleSwitchHideLikes}>
              {post.hideLikes ? "Unhide like count" : "Hide like count"}
            </li>
            <li onClick={handleSwitchHideComments}>
              {post.hideComments ? "Turn on commenting" : "Turn off commenting"}
            </li>
          </>
        ) : (
          <li>Report</li>
        )}
        <li>Go to post</li>
        <li>Share to Direct</li>
        <li onClick={handleCopyLink}>Copy link</li>
        <li onClick={onClose}>Cancel</li>
      </ul>
    </ModalBackground>
  );
};
