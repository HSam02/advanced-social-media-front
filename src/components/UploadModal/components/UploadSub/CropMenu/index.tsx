import { useRef } from "react";
import { useClickOutside } from "../../../../../utils/hooks";
import {
  GalleryIcon,
  HorizontalRectangleIcon,
  SquareIcon,
  VerticalRectangleIcon,
} from "../../../../icons";
import scss from "./CropMenu.module.scss";

type CropMenuProps = {
  aspect: number;
  setAspect: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
};

export const CropMenu: React.FC<CropMenuProps> = ({
  aspect,
  setAspect,
  onClose,
}) => {
  console.log("CropMenu");
  const boxRef = useRef<HTMLUListElement>(null);

  useClickOutside(boxRef, onClose);

  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className={scss.cropMenu}
      ref={boxRef}
    >
      <li
        onClick={() => setAspect(4 / 3)}
        className={aspect === 4 / 3 ? scss.active : undefined}
      >
        Original <GalleryIcon />
      </li>
      <li
        onClick={() => setAspect(1)}
        className={aspect === 1 ? scss.active : undefined}
      >
        1:1 <SquareIcon />
      </li>
      <li
        onClick={() => setAspect(4 / 5)}
        className={aspect === 4 / 5 ? scss.active : undefined}
      >
        4:5 <VerticalRectangleIcon />
      </li>
      <li
        onClick={() => setAspect(16 / 9)}
        className={aspect === 16 / 9 ? scss.active : undefined}
      >
        16:9 <HorizontalRectangleIcon />
      </li>
    </ul>
  );
};
