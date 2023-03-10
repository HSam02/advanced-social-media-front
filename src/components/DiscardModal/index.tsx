import { BoxModal, ModalBackground } from "../AppComponents";
import scss from "./DiscardModal.module.scss";

type DiscardModalProps = {
  title: string;
  text: string;
  acceptText: string;
  onClose: () => void;
  onAccept: () => void;
};

export const DiscardModal: React.FC<DiscardModalProps> = ({
  title,
  text,
  acceptText,
  onClose,
  onAccept,
}) => {
  return (
    <ModalBackground onClose={onClose}>
      <BoxModal>
        <div className={scss.discard}>
          <h6>{title}</h6>
          <p>{text}</p>
          <ul>
            <li onClick={onAccept}>{acceptText}</li>
            <li onClick={onClose}>Cancel</li>
          </ul>
        </div>
      </BoxModal>
    </ModalBackground>
  );
};
