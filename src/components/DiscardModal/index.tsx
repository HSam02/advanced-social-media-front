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
    <div
      className={scss.background}
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={scss.discard}
      >
        <h6>{title}</h6>
        <p>{text}</p>
        <ul>
          <li onClick={onAccept}>{acceptText}</li>
          <li onClick={onClose}>Cancel</li>
        </ul>
      </div>
    </div>
  );
};
