import { useAppDispatch } from "../../../../app/hooks";
import { removeCommentOrReply } from "../../../../app/thunks";
import appAxios from "../../../../utils/appAxios";
import { ModalBackground } from "../../../AppComponents";
import scss from "./CommentSettingsModal.module.scss";

type commentSettingsModalProps = {
  commentId: string;
  onClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommentSettingsModal: React.FC<commentSettingsModalProps> = ({
  commentId,
  onClose,
  setLoading,
}) => {
  console.log("CommentSettingsModal");

  const dispatch = useAppDispatch();

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      onClose();
      await appAxios.delete("/comment/" + commentId);
      dispatch(removeCommentOrReply(commentId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
