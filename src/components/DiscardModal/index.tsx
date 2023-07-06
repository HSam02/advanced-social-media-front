import { ModalBackground } from "../AppComponents";
import scss from "./DiscardModal.module.scss";

type DiscardModalProps = {
  title: string;
  text: string;
  acceptText: string;
  cancelText?: string;
  onClose: () => void;
  onAccept: () => void;
};

export const DiscardModal: React.FC<DiscardModalProps> = ({
  title,
  text,
  acceptText,
  cancelText,
  onClose,
  onAccept,
}) => {
  return (
    <ModalBackground onClose={onClose}>
      <div className={scss.discard}>
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
