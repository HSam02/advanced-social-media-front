import { memo, useEffect, useRef, useState } from "react";
import scss from "./MediaBox.module.scss";
import { PlayIcon, SpeakerIcon } from "../../icons";

export interface IMedia {
  type: "image" | "video";
  url: string;
  styles: {
    transform: string;
  };
}

type MediaBoxProps = {
  media: IMedia;
  aspect: number;
  width?: number;
  controls?: boolean;
  play?: boolean;
};

export const MediaBox: React.FC<MediaBoxProps> = memo(
  ({ media, width, aspect, controls, play }) => {
    console.log("MediaBox");
    const [isMute, setIsMute] = useState(
      Boolean(localStorage.getItem("isVideoMute"))
    );
    const [isPlay, setIsPlay] = useState(Boolean(play));
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current) {
        if (isPlay) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }, [isPlay]);

    useEffect(() => {
      if (videoRef.current) {
        if (isMute) {
          videoRef.current.volume = 0;
        } else {
          videoRef.current.volume = 1;
        }
      }
    }, [isMute]);

    return (
      <div
        className={scss.mediaBox}
        style={{ aspectRatio: aspect, width: width ? `${width}px` : undefined }}
      >
        {media.type === "image" ? (
          <img src={media.url} alt="" style={media.styles} />
        ) : controls ? (
          <>
            <video
              src={media.url}
              style={media.styles}
              ref={videoRef}
              onPause={() => setIsPlay(false)}
            />
            <div
              className={scss.play}
              onClick={() => setIsPlay((prev) => !prev)}
            >
              {!isPlay && <PlayIcon />}
            </div>
            <div
              className={scss.sound}
              onClick={() => {
                localStorage.setItem("isVideoMute", isMute ? "" : "true");
                setIsMute((prev) => !prev);
              }}
            >
              <SpeakerIcon active={!isMute} />
            </div>
          </>
        ) : (
          <video src={media.url} style={media.styles} />
        )}
      </div>
    );
  }
);
