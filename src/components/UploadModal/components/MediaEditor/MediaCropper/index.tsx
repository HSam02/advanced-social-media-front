import { memo, useRef, useEffect, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { cropMediaType } from "../../../types";

type MediaCropperType = {
  index: number;
  aspect: number;
  media: cropMediaType;
  currentMedia: number;
  handleCropChange: (location: Point, index: number) => void;
  handleCropComplete: (croppedArea: Area, index: number) => void;
};

export const MediaCropper: React.FC<MediaCropperType> = memo(
  ({
    index,
    media,
    currentMedia,
    aspect,
    handleCropChange,
    handleCropComplete,
  }) => {
    console.log("MediaCropper", index);
    const [isPlay, setIsPlay] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      if (videoRef.current && currentMedia !== index) {
        videoRef.current.pause();
      }
    }, [currentMedia, index]);

    useEffect(() => {
      if (videoRef.current && currentMedia === index && !isPlay) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    });

    return (
      <li>
        <Cropper
          style={{
            containerStyle: {
              opacity: currentMedia !== index ? 0 : 1,
              zIndex: currentMedia !== index ? 0 : 1,
            },
          }}
          image={media.type === "image" ? media.dest : undefined}
          video={media.type === "video" ? media.dest : undefined}
          crop={media.crop}
          zoom={media.zoom}
          mediaProps={{ muted: false, autoPlay: false }}
          setVideoRef={(ref) => {
            if (ref.current) {
              videoRef.current = ref.current;
              ref.current.onplay = () => setIsPlay(true);
              ref.current.onpause = () => setIsPlay(false);
            }
          }}
          zoomWithScroll={false}
          aspect={aspect}
          onCropChange={(loaction) => handleCropChange(loaction, index)}
          onCropComplete={(croppedArea) =>
            handleCropComplete(croppedArea, index)
          }
        />
      </li>
    );
  }
);
