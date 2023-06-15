import { useEffect, useState, useRef } from "react";
import scss from "./VideoPlayer.module.scss";
import { useIntersection, useVideoMute } from "../../../../utils/hooks";
import { PlayIcon, SpeakerIcon } from "../../../icons";

type VideoPlayerProps = {
  url: string;
  styles: { transform: string };
  play: boolean;
  intersection?: boolean;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  play,
  intersection,
  styles,
}) => {
  console.log("VideoPlayer");

  const [isPlay, setIsPlay] = useState(Boolean(play));
  const {isMute, toggleIsMute} = useVideoMute();

  const videoRef = useRef<HTMLVideoElement>(null);
  let isVisible = useIntersection(videoRef, "-50%");
  if (!intersection) {
    isVisible = isPlay
  }

  useEffect(() => {
    if (play) {
      setIsPlay(isVisible);
    }
  }, [isVisible, play]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay) {
        (async () => {
          try {
            const videos = document.querySelectorAll("video");

            await videoRef.current!.play();
            videos.forEach(
              (video) => video !== videoRef.current && video.pause()
            );
          } catch (error) {
            console.error(error);

            setIsPlay(false);
          }
        })();
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
    <>
      <video
        src={url}
        style={styles}
        ref={videoRef}
        onPause={() => setIsPlay(false)}
      />
      <div className={scss.play} onClick={() => setIsPlay((prev) => !prev)}>
        {!isPlay && <PlayIcon />}
      </div>
      <div className={scss.sound} onClick={toggleIsMute}>
        <SpeakerIcon active={!isMute} />
      </div>
    </>
  );
};
