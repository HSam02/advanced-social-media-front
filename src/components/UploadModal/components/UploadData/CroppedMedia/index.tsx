import { memo } from "react";
import { MediaBox, MediaSliderArrows, SliderDots } from "../../../../";
import { cropMediaType } from "../../../types";
import scss from "./CroppedMedia.module.scss";

type MediaDataProps = {
  media: cropMediaType;
  aspect: number;
  currentMedia: number;
  dataCount: number;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
};

export const CroppedMedia: React.FC<MediaDataProps> = memo(
  ({ media, aspect, currentMedia, dataCount, setCurrentMedia }) => {
    console.log("CroppedMedia");

    return (
      <div className={scss.croppedMedia}>
        <MediaBox media={media} aspect={aspect} controls />
        <MediaSliderArrows
          type="black"
          currentMedia={currentMedia}
          mediaCount={dataCount}
          setCurrentMedia={setCurrentMedia}
        />
        {dataCount > 1 && (
          <SliderDots
            count={dataCount}
            currentMedia={currentMedia}
            setCurrentMedia={setCurrentMedia}
          />
        )}
      </div>
    );
  }
);
