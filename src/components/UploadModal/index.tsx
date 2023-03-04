import { useRef, useState, useEffect } from "react";
import Cropper, { Area, MediaSize, Point } from "react-easy-crop";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
import { AppButton, Avatar } from "../AppComponents";
import {
  CloseIcon,
  CropIcon,
  GalleryIcon,
  HorizontalRectangleIcon,
  ImageVideoIcon,
  LeftArrowCircleIcon,
  LeftArrowIcon,
  MediaGalleryIcon,
  PlusIcon,
  RightArrowCircleIcon,
  SquareIcon,
  VerticalRectangleIcon,
  ZoomIcon,
} from "../icons";
import scss from "./UploadModal.module.scss";
import { DiscardModal } from "../modals";

// type croppedAreaPercentType = {
//   [key: string]: string;
//   width: string;
//   height: string;
//   left: string;
//   top: string;
// };

// type mediaType = {
//   type: "image" | "video";
//   url: string;
// };

type mediaType = {
  type: "image" | "video";
  url: string;
  // croppedBlob: Blob;
  // croppedUrl: string;
  // crop: {
  //   x: number;
  //   y: number;
  // };
  // croppedArea: croppedAreaPercentType;
  // mediaSize: { naturalWidth: number; naturalHeight: number };
  styles: {
    transform: string;
    // width: string;
    // height: string;
  };
  croppedAreaPixels: Area;
  crop: Point;
  zoom: number;
};

// const getCroppedImg = (media: mediaType, pixelCrop: Area): Promise<Blob> => {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   // if (media.type === "image") {
//   const image = new Image();
//   image.src = media.url;
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   ctx!.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return new Promise((resolve, reject) => {
//     canvas.toBlob(
//       (blob) => {
//         console.log("blob", blob);

//         if (!blob) {
//           reject(new Error("Canvas is empty"));
//           return;
//         }
//         resolve(blob);
//       },
//       undefined,
//       1
//     );
//   });
//   // }

//   // return new Promise((resolve, reject) => {
//   //   const video = document.createElement('video');
//   //   video.crossOrigin = 'anonymous';
//   //   video.src = media.url;
//   //   video.currentTime = 0;
//   //   video.play();

//   //   video.addEventListener('seeked', () => {
//   //     canvas.width = pixelCrop.width;
//   //     canvas.height = pixelCrop.height;
//   //     const ctx = canvas.getContext('2d');
//   //     const scale = video.videoWidth / video.clientWidth;
//   //     const startX = pixelCrop.x * scale;
//   //     const startY = pixelCrop.y * scale;
//   //     const width = pixelCrop.width * scale;
//   //     const height = pixelCrop.height * scale;

//   //     ctx!.drawImage(video, startX, startY, width, height, 0, 0, canvas.width, canvas.height);

//   //     canvas.toBlob((blob) => {
//   //       console.log(blob);

//   //       resolve(blob!);
//   //     }, 'video/mp4');
//   //   });
//   // });
// };

export const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mediaData, setMediaData] = useState<mediaType[] | null>(null);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [aspect, setAspect] = useState<number>(4 / 3);
  const [activeIconButton, setActiveIconButton] = useState<
    "crop" | "zoom" | "gallery" | null
  >(null);
  const [activeModal, setActiveModal] = useState<
    "delete" | "cancel" | "close" | null
  >(null);
  const [galleryScrollLeft, setGalleryScrollLeft] = useState(0);
  const [galleryScrollWidth, setGalleryScrollWidth] = useState(0);
  const [isCropSuccess, setIsCropSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<Array<React.RefObject<HTMLVideoElement>>>([]);

  console.log(mediaData);
  console.log(videoRefs);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    galleryRef.current?.scrollTo({ left: galleryScrollLeft });
    setGalleryScrollWidth(
      (galleryRef.current?.scrollWidth &&
        galleryRef.current.scrollWidth - galleryRef.current.clientWidth) ||
        0
    );
  }, [mediaData]);

  useEffect(() => {
    videoRefs.current.forEach(({ current }, i) => {
      if (current) {
        current.pause();
        if (i === currentMedia) {
          current.currentTime = 0;
          current.play();
        }
      }
    });
  }, [currentMedia]);

  const handleChangeFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;
    if (!fileList) {
      return;
    }
    const files = Array.from(fileList);
    const availableCount = mediaData ? 10 - mediaData.length : 10;

    if (files.length > availableCount) {
      alert("You can choose maximum 10 images");
      files.splice(10);
    }
    const newData = files.map(
      (file) =>
        ({
          type: file.type.slice(0, 5),
          url: URL.createObjectURL(file),
          crop: {
            x: 0,
            y: 0,
          },
          zoom: 1,
        } as mediaType)
    );
    setMediaData((mediaData) =>
      mediaData ? [...mediaData, ...newData] : newData
    );
  };

  const handleCropChange = (location: Point, index: number) => {
    console.log("cropChange", location, mediaData![index].crop);
    if (
      mediaData![index].crop.x === location.x &&
      mediaData![index].crop.y === location.y
    ) {
      console.log("return");
      return;
    }

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
  };

  const handleZoomChange = (zoom: number) => {
    console.log(zoom);

    setMediaData([
      ...mediaData!.slice(0, currentMedia),
      {
        ...mediaData![currentMedia],
        zoom,
      },
      ...mediaData!.slice(currentMedia + 1),
    ]);
  };

  const onCropComplete = (croppedArea: Area, index: number) => {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      // width: "calc(100% + 0.5px)",
      // height: "auto"
    };
    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      // width: transform.width,
      // height: transform.height
    };

    setMediaData((mediaData) => mediaData && [
      ...mediaData.slice(0, index),
      {
        ...mediaData[index],
        styles: imageStyle,
      },
      ...mediaData.slice(index + 1),
    ]);
    // setMediaData((mediaData) =>
    //   mediaData!.map((item, i) =>
    //     i === index ? { ...item, styles: imageStyle } : item
    //   )
    // );
  };

  // const onCropComplete = async (croppedAreaPixels: Area, index: number) => {
  //   console.log(croppedAreaPixels);

  //   try {
  //     const croppedBlob = await getCroppedImg(
  //       mediaData![index],
  //       croppedAreaPixels
  //     );
  //     console.log("croppedBlob", croppedBlob);

  //     setMediaData((media) => [
  //       ...media!.slice(0, index),
  //       {
  //         ...media![index],
  //         croppedBlob: croppedBlob,
  //         croppedUrl: URL.createObjectURL(croppedBlob),
  //       },
  //       ...media!.slice(index + 1),
  //     ]);
  //   } catch (e) {
  //     console.error(e, "load error");
  //   }
  // };

  // const onMediaLoaded = async (mediaSize: MediaSize, index: number) => {
  //   console.log(mediaSize);

  //   const defaultCropArea = {
  //     x: 0,
  //     y: 0,
  //     width: mediaSize.width,
  //     height: mediaSize.height,
  //   };
  //   const croppedAreaPixels = getCroppedAreaPixels(defaultCropArea, mediaSize);
  //   console.log("croppedAreaPicels", croppedAreaPixels);

  //   const croppedBlob = await getCroppedImg(
  //     mediaData![index],
  //     croppedAreaPixels
  //   );
  //   setMediaData((media) => [
  //     ...media!.slice(0, index),
  //     {
  //       ...media![index],
  //       // croppedBlob: croppedBlob,
  //       // croppedUrl: URL.createObjectURL(croppedBlob),
  //     },
  //     ...media!.slice(index + 1),
  //   ]);
  // };

  const getCroppedAreaPixels = (cropArea: Area, mediaSize: MediaSize) => {
    const { x, y, width, height } = cropArea;
    const scaleX = mediaSize.width / mediaSize.naturalWidth;
    const scaleY = mediaSize.height / mediaSize.naturalHeight;
    return {
      x: Math.round(x * scaleX),
      y: Math.round(y * scaleY),
      width: Math.round(width * scaleX),
      height: Math.round(height * scaleY),
    };
  };

  // const onMediaLoad = (mediaSize: MediaSize, index: number) => {
  //   const { naturalWidth, naturalHeight } = mediaSize;
  //   console.log(mediaSize);
  //   // if (!mediaData![index].mediaSize) {
  //   //   console.log("mediaSize");

  //   //   setMediaData((mediaData) => [
  //   //     ...mediaData!.slice(0, index),
  //   //     {
  //   //       ...mediaData![index],
  //   //       mediaSize: {
  //   //         naturalHeight,
  //   //         naturalWidth,
  //   //       },
  //   //     },
  //   //     ...mediaData!.slice(index + 1),
  //   //   ]);
  //   // }
  //   // const aspect = naturalWidth / naturalHeight;
  //   // console.log(aspect);
  //   const croppedArea = {
  //     x: 0,
  //     y: 0,
  //     width: 100,
  //     height: 100,
  //   };
  //   if (naturalHeight > naturalWidth) {
  //     croppedArea.height = (naturalWidth / naturalHeight) * 100;
  //     croppedArea.y = (naturalWidth / naturalHeight) * 38.888;
  //   } else if (naturalHeight < naturalWidth) {
  //     croppedArea.width = (naturalHeight / naturalWidth) * 100;
  //     croppedArea.x = (naturalHeight / naturalWidth) * 38.888;
  //   }

  //   onCropComplete(croppedArea, index);

  //   // setMediaData([
  //   //   ...mediaData!.slice(0, currentMedia),
  //   //   {
  //   //     ...mediaData![currentMedia],
  //   //     crop: {x: 0, y: 0},
  //   //     zoom: 1
  //   //   },
  //   //   ...mediaData!.slice(currentMedia + 1),
  //   // ]);
  // };

  const handleBGMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    const onMouseUp = () => {
      setActiveIconButton(null);
      if (mediaData) {
        setActiveModal("close");
      } else {
        onClose();
      }
      evt.target.removeEventListener("mouseup", onMouseUp);
    };
    evt.target.addEventListener("mouseup", onMouseUp);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleAcceptModal = () => {
    switch (activeModal) {
      case "cancel":
        setMediaData(null);
        break;
      case "close":
        onClose();
        break;
      case "delete":
        if (mediaData?.length === 1) {
          setMediaData(null);
          break;
        }
        setMediaData(
          (media) =>
            media && [
              ...media.slice(0, currentMedia),
              ...media.slice(currentMedia + 1),
            ]
        );
        if (currentMedia + 1 === mediaData?.length) {
          setCurrentMedia((prev) => prev - 1);
        }
        break;
    }
  };

  return (
    <>
      <div onMouseDown={handleBGMouseDown} className={scss.background}>
        <div onMouseDown={(e) => e.stopPropagation()} className={scss.box}>
          <div onClick={() => setActiveIconButton(null)} className={scss.title}>
            {mediaData && (
              <div onClick={() => setActiveModal("cancel")}>
                <LeftArrowIcon />
              </div>
            )}
            <h3>Create new post</h3>
            {mediaData && (
              <div onClick={() => setIsCropSuccess(true)} className={scss.next}>
                Next
              </div>
            )}
          </div>
          <div className={scss.box__inner}>
            {mediaData ? (
              // <ul className={scss.cropper}>
              //   {mediaData.map((media, i) => (
              //     <li key={media.url}>
              //       <Cropper
              //         aspectRatio={aspect}
              //         preview=".img-preview"
              //         src={media.url}
              //         dragMode="move"
              //         viewMode={1}
              //         // autoCrop={true}
              //         cropBoxMovable={false}
              //         cropBoxResizable={false}
              //         background={false}
              //         responsive={true}
              //         autoCropArea={1}
              //         checkOrientation={true}
              //         onInitialized={(instance) => console.log(instance, i)}
              //         style={{
              //           display: currentMedia !== i ? "none" : undefined,
              //           // maxHeight: "100%",
              //           // maxWidth: "100%",
              //           width: "auto",
              //           height: "100%",
              //           // opacity: currentMedia !== i ? 0 : 1,
              //           // zIndex: currentMedia !== i ? 0 : 1,
              //         }}
              //       />
              //     </li>
              //   ))}
              // </ul>

              isCropSuccess ? (
                <div className={scss.form}>
                  <div className={scss.croppedMedia}>
                    {mediaData[currentMedia].type === "image" ? (
                      <img
                        src={mediaData[currentMedia].url}
                        alt=""
                        style={mediaData[currentMedia].styles}
                      />
                    ) : (
                      <video
                        src={mediaData[currentMedia].url}
                        style={mediaData[currentMedia].styles}
                      />
                    )}
                  </div>
                  <form>
                    <div>
                      <Avatar size="28px" />
                      <p>nickname</p>
                    </div>
                    <textarea></textarea>
                  </form>
                </div>
              ) : (
                <>
                  <ul
                    onMouseDown={() => setActiveIconButton(null)}
                    className={scss.cropper}
                  >
                    {mediaData.map((media, i) => (
                      <li key={media.url}>
                        <Cropper
                          style={{
                            containerStyle: {
                              // display: currentMedia !== i ? "none" : undefined,
                              opacity: currentMedia !== i ? 0 : 1,
                              zIndex: currentMedia !== i ? 0 : 1,
                            },
                          }}
                          image={media.type === "image" ? media.url : undefined}
                          video={media.type === "video" ? media.url : undefined}
                          crop={media.crop}
                          zoom={media.zoom}
                          // setInitialCrop={(cropSize) =>}
                          mediaProps={{ muted: false, autoPlay: false }}
                          setVideoRef={(ref) => (videoRefs.current[i] = ref)}
                          // zoom={2}
                          zoomWithScroll={false}
                          // initialCroppedAreaPixels={{x: 0, y: 0, height: 0, width: 0}}
                          aspect={aspect}
                          onCropChange={(loaction) =>
                            handleCropChange(loaction, i)
                          }
                          // onZoomChange={
                          //   media.type === "image" ? handleZoomChange : undefined
                          // }
                          onCropComplete={(croppedArea) => {
                            console.log("cropComplete", i);
                            onCropComplete(croppedArea, i);
                          }}
                          // onMediaLoaded={(mediaSize) =>{console.log("mediaLoad", i)
                          //   onMediaLoad(mediaSize, i)}
                          // }
                          // onCropAreaChange={handleCropAreaChange}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* {mediaData[currentMedia].type === "video" && (
                    <video
                      autoPlay
                      loop
                      onPlay={(e) => (e.currentTarget.volume = 1)}
                      src={mediaData[currentMedia].url}
                      style={{ display: "none" }}
                    />
                  )} */}
                  {currentMedia > 0 && (
                    <div
                      onClick={() => {
                        setCurrentMedia((prev) => prev - 1);
                        setActiveIconButton(null);
                      }}
                      className={`${scss.left} ${scss.icon__button} ${scss.arrow}`}
                    >
                      <LeftArrowCircleIcon />
                    </div>
                  )}
                  {currentMedia < mediaData.length - 1 && (
                    <div
                      onClick={() => {
                        setCurrentMedia((prev) => prev + 1);
                        setActiveIconButton(null);
                      }}
                      className={`${scss.right} ${scss.icon__button} ${scss.arrow}`}
                    >
                      <RightArrowCircleIcon />
                    </div>
                  )}
                  <div className={scss.upload__sub}>
                    <div>
                      <div
                        onClick={(e) =>
                          setActiveIconButton((prev) =>
                            prev === "crop" ? null : "crop"
                          )
                        }
                        className={`${scss.icon__button} ${
                          activeIconButton &&
                          (activeIconButton === "crop"
                            ? scss.active
                            : scss.disabled)
                        }`}
                      >
                        <CropIcon />
                      </div>
                      {activeIconButton === "crop" && (
                        <ul
                          onClick={(e) => e.stopPropagation()}
                          className={scss.cropMenu}
                        >
                          <li
                            onClick={() => setAspect(4 / 3)}
                            className={
                              aspect === 4 / 3 ? scss.active : undefined
                            }
                          >
                            Original <GalleryIcon />
                          </li>
                          <li
                            onClick={() => setAspect(1)}
                            className={aspect === 1 ? scss.active : undefined}
                          >
                            1:1 <SquareIcon />
                          </li>
                          <li
                            onClick={() => setAspect(4 / 5)}
                            className={
                              aspect === 4 / 5 ? scss.active : undefined
                            }
                          >
                            4:5 <VerticalRectangleIcon />
                          </li>
                          <li
                            onClick={() => setAspect(16 / 9)}
                            className={
                              aspect === 16 / 9 ? scss.active : undefined
                            }
                          >
                            16:9 <HorizontalRectangleIcon />
                          </li>
                        </ul>
                      )}
                      <div
                        onClick={(e) =>
                          setActiveIconButton((prev) =>
                            prev === "zoom" ? null : "zoom"
                          )
                        }
                        className={`${scss.icon__button} ${
                          activeIconButton &&
                          (activeIconButton === "zoom"
                            ? scss.active
                            : scss.disabled)
                        }`}
                      >
                        <ZoomIcon />
                      </div>
                      {activeIconButton === "zoom" && (
                        <div className={scss.range}>
                          <input
                            type="range"
                            min={1}
                            max={2}
                            step={0.01}
                            value={mediaData[currentMedia].zoom}
                            onChange={(e) =>
                              handleZoomChange(e.target.valueAsNumber)
                            }
                          />
                        </div>
                      )}
                    </div>
                    {mediaData.length > 1 && (
                      <ul className={scss.dots}>
                        {mediaData.map((_, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setCurrentMedia(i);
                              setActiveIconButton(null);
                            }}
                            style={{
                              opacity: currentMedia === i ? 1 : 0.4,
                            }}
                          ></li>
                        ))}
                      </ul>
                    )}
                    <div
                      onClick={(e) =>
                        setActiveIconButton((prev) =>
                          prev === "gallery" ? null : "gallery"
                        )
                      }
                      className={`${scss.icon__button} ${
                        activeIconButton &&
                        (activeIconButton === "gallery"
                          ? scss.active
                          : scss.disabled)
                      }`}
                    >
                      <MediaGalleryIcon />
                    </div>
                    {activeIconButton === "gallery" && (
                      <div
                        // onClick={(e) => e.stopPropagation()}
                        className={scss.gallery}
                      >
                        <div className={scss.media}>
                          {galleryScrollLeft > 0 && (
                            <div className={`${scss.arrow} ${scss.left}`}>
                              <div
                                onClick={() =>
                                  galleryRef.current?.scrollTo({
                                    left: galleryScrollLeft - 300,
                                    behavior: "smooth",
                                  })
                                }
                                className={scss.icon__button}
                              >
                                <LeftArrowCircleIcon />
                              </div>
                            </div>
                          )}
                          {galleryScrollLeft < galleryScrollWidth && (
                            <div className={`${scss.arrow} ${scss.right}`}>
                              <div
                                onClick={() =>
                                  galleryRef.current?.scrollTo({
                                    left: galleryScrollLeft + 300,
                                    behavior: "smooth",
                                  })
                                }
                                className={scss.icon__button}
                              >
                                <RightArrowCircleIcon />
                              </div>
                            </div>
                          )}
                          <ul
                            onScroll={(e) =>
                              setGalleryScrollLeft(e.currentTarget.scrollLeft)
                            }
                            ref={galleryRef}
                          >
                            {mediaData.map((media, i) => (
                              <li
                                key={media.url}
                                className={
                                  currentMedia === i ? scss.active : ""
                                }
                                onClick={() => setCurrentMedia(i)}
                                style={{
                                  // paddingBottom: aspect && `${100/aspect}%`
                                  width:
                                    aspect > 1 ? "94px" : `${94 * aspect}px`,
                                  height:
                                    aspect < 1 ? "94px" : `${94 / aspect}px`,
                                }}
                              >
                                {media.type === "image" ? (
                                  <img
                                    src={media.url}
                                    alt=""
                                    style={media.styles}
                                    // style={{
                                    //   objectFit: "cover",
                                    //   width: "100%",
                                    //   height: "100%",
                                    //   transform: `translate(${media.crop.x}px, ${media.crop.y}px) scale(${media.zoom})`,
                                    // }}
                                    // style={{
                                    //   top: media.croppedArea.top,
                                    //   left: media.croppedArea.left,
                                    // }}
                                  />
                                ) : (
                                  <video src={media.url} style={media.styles} />
                                )}
                                <div onClick={() => setActiveModal("delete")}>
                                  <CloseIcon />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {mediaData.length < 10 && (
                          <div
                            className={scss.plus}
                            onClick={() => inputRef.current?.click()}
                          >
                            <PlusIcon />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <div className={scss.box__inner__upload}>
                <ImageVideoIcon />
                <p>Drag photos and videos here</p>
                <AppButton onClick={() => inputRef.current?.click()}>
                  Select from computer
                </AppButton>
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
        </div>
        <span>
          <CloseIcon />
        </span>
      </div>
      {activeModal === "cancel" && (
        <DiscardModal
          title="Discard post?"
          text="If you leave, your edits won't be saved."
          onClose={handleCloseModal}
          onAccept={handleAcceptModal}
        />
      )}
      {(activeModal === "delete" || activeModal === "close") && (
        <DiscardModal
          title="Discard photo?"
          text="This will remove the photo from your post."
          onClose={handleCloseModal}
          onAccept={handleAcceptModal}
        />
      )}
    </>
  );
};
