import { useAppDispatch } from "../../../app/hooks";
import { removeCommentOrReply } from "../../../app/thunks";
import appAxios from "../../../appAxios";
import { ModalBackground } from "../../AppComponents";
import scss from "./CommentSettingsModal.module.scss";

type commentSettingsModalProps = {
  commentId: string;
  onClose: () => void;
};

export const CommentSettingsModal: React.FC<commentSettingsModalProps> = ({
  commentId,
  onClose,
}) => {
  console.log("CommentSettingsModal");

  const dispatch = useAppDispatch();

  const handleDeleteComment = async () => {
    try {
      onClose();
      await appAxios.delete("/comment/" + commentId);
      dispatch(removeCommentOrReply(commentId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalBackground onClose={onClose}>
      <ul className={scss.box}>
        <li>Report</li>
        <li onClick={handleDeleteComment}>Delete</li>
        <li onClick={onClose}>Cancel</li>
      </ul>
    </ModalBackground>
  );
};
