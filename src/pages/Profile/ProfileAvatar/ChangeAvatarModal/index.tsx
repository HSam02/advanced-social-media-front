import { BoxModal, ModalBackground } from "../../../../components";
import scss from "./ChangeAvatarModal.module.scss";

type ChangeAvatarModalProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  onClose: () => void;
  handleRemoveAvatar: () => void;
};

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  inputRef,
  onClose,
  handleRemoveAvatar,
}) => {
  console.log("ChangeAvatarModal");

  const handleClickUpload = () => {
    inputRef.current?.click();
    onClose();
  };

  return (
    <ModalBackground onClose={onClose}>
      <BoxModal>
        <div className={scss.box} onClick={() => console.log("box")}>
          <h4>Change Profile Photo</h4>
          <ul>
            <li onClick={handleClickUpload}>Upload Photo</li>
            <li
              onClick={() => {
                onClose();
                handleRemoveAvatar();
              }}
            >
              Remove Current Photo
            </li>
            <li onClick={onClose}>Cancel</li>
          </ul>
        </div>
      </BoxModal>
    </ModalBackground>
  );
};
