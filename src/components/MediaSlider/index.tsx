import { memo, useState } from "react";
import { MediaBox, MediaSliderArrows, SliderDots } from "../AppComponents";
import { mediaType } from "../../app/slices/posts";
import scss from "./MediaSlider.module.scss";

type MediaSliderProps = {
  media: mediaType[];
  aspect: number;
  dataCount: number;
  videoPlay?: boolean;
};

export const MediaSlider: React.FC<MediaSliderProps> = memo(
  ({ media, aspect, dataCount, videoPlay }) => {
    console.log("CroppedMedia");
    const [currentMedia, setCurrentMedia] = useState(0);

    return (
      <div className={scss.mediaSlider}>
        <MediaBox
          media={media[currentMedia]}
          aspect={aspect}
          controls
          play={videoPlay}
        />
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
