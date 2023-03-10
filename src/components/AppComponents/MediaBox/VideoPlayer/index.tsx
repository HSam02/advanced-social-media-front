import { useEffect, useState, useRef } from "react";
import scss from "./VideoPlayer.module.scss";
import { useIntersection } from "../../../../utils/hooks";
import { PlayIcon, SpeakerIcon } from "../../../icons";

type VideoPlayerProps = {
  url: string;
  styles: { transform: string };
  play: boolean;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  play,
  styles,
}) => {
  console.log("VideoPlayer");

  const [isMute, setIsMute] = useState(
    Boolean(localStorage.getItem("isVideoMute"))
  );
  const [isPlay, setIsPlay] = useState(Boolean(play));

  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersection(videoRef, "-50%");

  const videos = document.querySelectorAll("video");

  useEffect(() => {
    if (play) {
      setIsPlay(isVisible);
    }
  }, [isVisible]);

  useEffect(() => {
    setIsMute((prev) => prev);
    const handleStorageChange = (evt: StorageEvent) => {
      setIsMute(Boolean(localStorage.getItem("isVideoMute")));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay) {
        (async () => {
          try {
            console.log("play");

            await videoRef.current!.play();
            videos.forEach(
              (video) => video !== videoRef.current && video.pause()
            );
          } catch (error) {
            console.log(error);

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

  const handleClickSpeaker = () => {
    setIsMute((prev) => {
      localStorage.setItem("isVideoMute", !prev ? "true" : "");
      window.dispatchEvent(new Event("storage"));
      return !prev;
    });
  };
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
      <div className={scss.sound} onClick={handleClickSpeaker}>
        <SpeakerIcon active={!isMute} />
      </div>
    </>
  );
};
