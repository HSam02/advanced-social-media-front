import { memo } from "react";
import { CropIcon, MediaGalleryIcon, ZoomIcon } from "../../../../icons";
import { activeIconButtonType } from "../../../types";
import scss from "./SubIconButton.module.scss";

type SubIconButtonProps = {
  setActiveIconButton: React.Dispatch<
    React.SetStateAction<activeIconButtonType | null>
  >;
  name: activeIconButtonType;
  activeIconButton: activeIconButtonType | null;
};

export const SubIconButton: React.FC<SubIconButtonProps> = memo(
  ({ setActiveIconButton, name, activeIconButton }) => {
    console.log("subIcon", name);

    return (
      <div
        onClick={() =>
          setActiveIconButton((prev) => (prev === name ? null : name))
        }
        onMouseDown={(e) => e.stopPropagation()}
        className={`${scss.icon__button} ${
          activeIconButton &&
          (activeIconButton === name ? scss.active : scss.disabled)
        }`}
      >
        {name === "crop" && <CropIcon />}
        {name === "gallery" && <MediaGalleryIcon />}
        {name === "zoom" && <ZoomIcon />}
      </div>
    );
  }
);
