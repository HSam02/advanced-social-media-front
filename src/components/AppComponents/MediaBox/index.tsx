import { memo } from "react";
import { mediaType } from "../../../app/slices/posts";
import { VideoPlayer } from "./VideoPlayer";
import scss from "./MediaBox.module.scss";

type MediaBoxProps = {
  media: mediaType;
  aspect: number;
  width?: number;
  controls?: boolean;
  play?: boolean;
  intersection?: boolean;
};

export const MediaBox: React.FC<MediaBoxProps> = memo(
  ({ media, width, aspect, controls, play, intersection }) => {
    console.log("MediaBox");

    const mediaUrl = media.dest.includes("blob")
      ? media.dest
      : process.env.REACT_APP_API_URL + media.dest;

    return (
      <div
        className={scss.mediaBox}
        style={{ aspectRatio: aspect, width: width ? `${width}px` : undefined }}
      >
        {media.type === "image" ? (
          <img src={mediaUrl} alt="" style={media.styles} />
        ) : controls ? (
          <>
            <VideoPlayer
              url={mediaUrl}
              styles={media.styles}
              play={Boolean(play)}
              intersection={intersection}
            />
          </>
        ) : (
          <video src={mediaUrl} style={media.styles} />
        )}
      </div>
    );
  }
);
