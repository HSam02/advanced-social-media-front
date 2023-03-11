import React from "react";
import scss from "./ModalBackground.module.scss";
import { useDisableScroll } from "../../../utils/hooks";

type ModalBackgroundProps = {
  children: React.ReactNode;
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
    </div>
  );
};
