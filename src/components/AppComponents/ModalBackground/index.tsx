import React from "react";
import scss from "./ModalBackground.module.scss";
import { useDisableScroll } from "../../../utils/hooks";
import { CloseIcon } from "../../icons";

type ModalBackgroundProps = {
  children?: React.ReactNode;
  closeIcon?: boolean;
  onClose: () => void;
};

export const ModalBackground: React.FC<ModalBackgroundProps> = ({
  children,
  onClose,
}) => {
  useDisableScroll();
  return (
    <div className={scss.background} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
      {CloseIcon && (
        <span className={scss.close}>
          <CloseIcon />
        </span>
      )}
    </div>
  );
};
