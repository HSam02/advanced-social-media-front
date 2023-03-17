import { memo, useState } from "react";
import { MediaBox, MediaSliderArrows, SliderDots } from "../AppComponents";
import { mediaType } from "../../app/slices/posts";
import scss from "./MediaSlider.module.scss";

type MediaSliderProps = {
  media: mediaType[];
  aspect: number;
  videoPlay?: boolean;
  intersection?: boolean;
  arrowsType?: "black" | "white" | "dark-white"
};

export const MediaSlider: React.FC<MediaSliderProps> = memo(
  ({ media, aspect, videoPlay, intersection, arrowsType }) => {
    console.log("MediaSlider");
    const [currentMedia, setCurrentMedia] = useState(0);

    return (
      <div className={scss.mediaSlider}>
        <MediaBox
          media={media[currentMedia]}
          aspect={aspect}
          controls
          play={videoPlay}
          intersection={intersection}
        />
        <MediaSliderArrows
          type={arrowsType || "black"}
          currentMedia={currentMedia}
          mediaCount={media.length}
          setCurrentMedia={setCurrentMedia}
        />
        {media.length > 1 && (
          <SliderDots
            count={media.length}
            currentMedia={currentMedia}
            setCurrentMedia={setCurrentMedia}
          />
        )}
      </div>
    );
  }
);
