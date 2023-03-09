import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../../../../../hooks";
import { CloseIcon, PlusIcon } from "../../../../icons";
import { ArrowIconButton } from "../../../../AppComponents/ArrowIconButton";
import { MediaBox } from "../../../../AppComponents/MediaBox";
import { activeModalType, cropMediaType } from "../../../types";
import scss from "./Gallery.module.scss";

type GalleryProps = {
  mediaData: cropMediaType[];
  aspect: number;
  currentMedia: number;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
  setActiveModal: React.Dispatch<React.SetStateAction<activeModalType | null>>;
  handleChangeFile: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
};

export const Gallery: React.FC<GalleryProps> = ({
  mediaData,
  currentMedia,
  aspect,
  setCurrentMedia,
  setActiveModal,
  handleChangeFile,
  onClose,
}) => {
  const [galleryScrollLeft, setGalleryScrollLeft] = useState(0);
  const [galleryScrollWidth, setGalleryScrollWidth] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useClickOutside(boxRef, onClose);

  console.log("Gallery");

  useEffect(() => {
    galleryRef.current?.scrollTo({ left: 106 * currentMedia - 36 });
    setGalleryScrollWidth(
      (galleryRef.current?.scrollWidth &&
        galleryRef.current.scrollWidth - galleryRef.current.clientWidth) ||
        0
    );
  }, [mediaData]);
  return (
    <div className={scss.gallery} ref={boxRef}>
      <div className={scss.media}>
        {galleryScrollLeft > 0 && (
          <div
            className={`${scss.arrow} ${scss.left}`}
            onClick={() =>
              galleryRef.current?.scrollTo({
                left: galleryScrollLeft - 300,
                behavior: "smooth",
              })
            }
          >
            <ArrowIconButton side="left" type="white" size={26} />
          </div>
        )}
        {galleryScrollLeft < galleryScrollWidth - 1 && (
          <div
            className={`${scss.arrow} ${scss.right}`}
            onClick={() =>
              galleryRef.current?.scrollTo({
                left: galleryScrollLeft + 300,
                behavior: "smooth",
              })
            }
          >
            <ArrowIconButton side="right" type="white" size={26} />
          </div>
        )}
        <ul
          onScroll={(e) =>
            setGalleryScrollLeft(Math.round(e.currentTarget.scrollLeft))
          }
          ref={galleryRef}
        >
          {mediaData.map((media, i) => (
            <li key={media.url} onClick={() => setCurrentMedia(i)}>
              <MediaBox media={media} aspect={aspect} />
              {currentMedia === i ? (
                <span onClick={() => setActiveModal("delete")}>
                  <CloseIcon />
                </span>
              ) : (
                <div className={scss.disable__gradient}></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {mediaData.length < 10 && (
        <div className={scss.plus} onClick={() => inputRef.current?.click()}>
          <PlusIcon />
        </div>
      )}
      <input
        onChange={handleChangeFile}
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, video/mp4"
        multiple
      />
    </div>
  );
};
