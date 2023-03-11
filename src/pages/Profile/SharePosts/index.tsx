import { useState, memo } from "react";
import { UploadModal } from "../../../components";
import { ImageIcon } from "../../../components/icons";
import scss from "./SharePosts.module.scss";

export const SharePosts = memo(() => {
  console.log("SharePosts");

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleOpenModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
  };

  return (
    <div className={scss.sharePosts}>
      <div className={scss.imageIcon} onClick={handleOpenModal}>
        <ImageIcon />
      </div>
      <h3>Share Photos</h3>
      <p>When you share photos, they will appear on your profile.</p>
      <span onClick={handleOpenModal}>Share your first photo</span>
      {showUploadModal && <UploadModal onClose={handleCloseModal} />}
    </div>
  );
});
