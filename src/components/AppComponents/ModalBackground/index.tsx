import { useDisableScroll } from "../../../utils/hooks";
import { CloseIcon } from "../../icons";
import scss from "./ModalBackground.module.scss";

type ModalBackgroundProps = {
  children?: React.ReactNode;
  closeIcon?: boolean;
  onClose: () => void;
};

export const ModalBackground: React.FC<ModalBackgroundProps> = ({
  children,
  closeIcon,
  onClose,
}) => {
  useDisableScroll();
  return (
    <div className={scss.background} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
      {closeIcon && (
        <span className={scss.close}>
          <CloseIcon />
        </span>
      )}
    </div>
  );
};
