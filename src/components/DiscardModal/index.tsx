import { Avatar, ModalBackground } from "../AppComponents";
import scss from "./DiscardModal.module.scss";

type DiscardModalProps = {
  title: string;
  text?: string;
  acceptText: string;
  avatarDest?: string;
  cancelText?: string;
  onClose: () => void;
  onAccept: () => void;
};

export const DiscardModal: React.FC<DiscardModalProps> = ({
  title,
  text,
  acceptText,
  avatarDest,
  cancelText,
  onClose,
  onAccept,
}) => {
  return (
    <ModalBackground onClose={onClose}>
      <div className={scss.discard}>
        {avatarDest !== undefined && <Avatar dest={avatarDest} size={88} />}
        <h6>{title}</h6>
        <p>{text}</p>
        <ul>
          <li
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            {acceptText}
          </li>
          <li onClick={onClose}>{cancelText || "Cancel"}</li>
        </ul>
      </div>
    </ModalBackground>
  );
};
