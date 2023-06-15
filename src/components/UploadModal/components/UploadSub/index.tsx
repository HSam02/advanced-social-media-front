import { useState, useCallback } from "react";
import { SliderDots } from "../../..";
import { CropMenu } from "./CropMenu";
import { Gallery } from "./Gallery";
import { SubIconButton } from "./SubIconButton";
import { Zoom } from "./Zoom";
import {
  activeIconButtonType,
  activeModalType,
  cropMediaType,
} from "../../types";
import scss from "./UploadSub.module.scss";

type UploadSubProps = {
  mediaData: cropMediaType[];
  currentMedia: number;
  aspect: number;
  setMediaData: React.Dispatch<React.SetStateAction<cropMediaType[] | null>>;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
  setAspect: React.Dispatch<React.SetStateAction<number>>;
  setActiveModal: React.Dispatch<React.SetStateAction<activeModalType | null>>;
  handleChangeFile: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadSub: React.FC<UploadSubProps> = ({
  mediaData,
  currentMedia,
  aspect,
  setMediaData,
  setCurrentMedia,
  setAspect,
  setActiveModal,
  handleChangeFile,
}) => {
  const [activeIconButton, setActiveIconButton] =
    useState<activeIconButtonType | null>(null);

  console.log("UploadSub");

  const onClose = useCallback(() => {
    setActiveIconButton(null);
  }, []);
  
  return (
    <div className={scss.upload__sub}>
      <div>
        <SubIconButton
          name="crop"
          activeIconButton={activeIconButton}
          setActiveIconButton={setActiveIconButton}
        />
        {activeIconButton === "crop" && (
          <CropMenu aspect={aspect} setAspect={setAspect} onClose={onClose} />
        )}
        <SubIconButton
          name="zoom"
          activeIconButton={activeIconButton}
          setActiveIconButton={setActiveIconButton}
        />
        {activeIconButton === "zoom" && (
          <Zoom
            currentMedia={currentMedia}
            mediaData={mediaData}
            setMediaData={setMediaData}
            onClose={onClose}
          />
        )}
      </div>
      {mediaData.length > 1 && (
        <SliderDots
          count={mediaData.length}
          currentMedia={currentMedia}
          setCurrentMedia={setCurrentMedia}
        />
      )}
      <SubIconButton
        name="gallery"
        activeIconButton={activeIconButton}
        setActiveIconButton={setActiveIconButton}
      />
      {activeIconButton === "gallery" && (
        <Gallery
          mediaData={mediaData}
          aspect={aspect}
          currentMedia={currentMedia}
          setActiveModal={setActiveModal}
          setCurrentMedia={setCurrentMedia}
          handleChangeFile={handleChangeFile}
          onClose={onClose}
        />
      )}
    </div>
  );
};
