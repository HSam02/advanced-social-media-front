import { useRef } from "react";
import { useClickOutside } from "../../../../../utils/hooks";
import { cropMediaType } from "../../../types";
import scss from "./Zoom.module.scss";

type ZoomProps = {
  mediaData: cropMediaType[];
  currentMedia: number;
  setMediaData: React.Dispatch<React.SetStateAction<cropMediaType[] | null>>;
  onClose: () => void;
};

export const Zoom: React.FC<ZoomProps> = ({
  mediaData,
  currentMedia,
  setMediaData,
  onClose,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  useClickOutside(boxRef, onClose);
  return (
    <div className={scss.range} ref={boxRef}>
      <input
        type="range"
        min={1}
        max={2}
        step={0.01}
        value={mediaData[currentMedia].zoom}
        onChange={(e) =>
          setMediaData([
            ...mediaData!.slice(0, currentMedia),
            {
              ...mediaData![currentMedia],
              zoom: e.target.valueAsNumber,
            },
            ...mediaData!.slice(currentMedia + 1),
          ])
        }
      />
    </div>
  );
};
