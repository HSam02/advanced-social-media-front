import { useCallback } from "react";
import { MediaCropper } from "./MediaCropper";
import { MediaSliderArrows } from "../../../";
import { Area, Point } from "react-easy-crop";
import { cropMediaType } from "../../types";

type MediaEditorProps = {
  mediaData: cropMediaType[];
  currentMedia: number;
  aspect: number;
  setMediaData: React.Dispatch<React.SetStateAction<cropMediaType[] | null>>;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
};

export const MediaEditor: React.FC<MediaEditorProps> = ({
  mediaData,
  currentMedia,
  aspect,
  setMediaData,
  setCurrentMedia,
}) => {
  console.log("MediaEditor");

  const handleCropChange = useCallback((location: Point, index: number) => {
    setMediaData(
      (mediaData) =>
        mediaData && [
          ...mediaData!.slice(0, index),
          {
            ...mediaData![index],
            crop: location,
          },
          ...mediaData!.slice(index + 1),
        ]
    );
  }, []);

  const handleCropComplete = useCallback((croppedArea: Area, index: number) => {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
    };
    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    };

    setMediaData(
      (mediaData) =>
        mediaData && [
          ...mediaData.slice(0, index),
          {
            ...mediaData[index],
            styles: imageStyle,
          },
          ...mediaData.slice(index + 1),
        ]
    );
  }, []);
  return (
    <>
      <ul>
        {mediaData.map((media, i) => (
          <MediaCropper
            key={media.dest}
            index={i}
            media={media}
            aspect={aspect}
            currentMedia={currentMedia}
            handleCropChange={handleCropChange}
            handleCropComplete={handleCropComplete}
          />
        ))}
      </ul>
      <MediaSliderArrows
        type="black"
        currentMedia={currentMedia}
        mediaCount={mediaData.length}
        setCurrentMedia={setCurrentMedia}
      />
    </>
  );
};
