import { useRef, useState, useEffect } from "react";
import { AppButton } from "../AppComponents";
import {
  CloseIcon,
  ImageVideoIcon,
  LeftArrowIcon,
  LoadingIcon,
  RightArrowCircleIcon,
  LeftArrowCircleIcon,
  PlusIcon,
  MediaGalleryIcon,
  CropIcon,
  ZoomIcon,
  GalleryIcon,
  VerticalRectangleIcon,
  HorizontalRectangleIcon,
} from "../icons";
import scss from "./modals.module.scss";
import appAxios from "../../appAxios";
import { DiscardModal } from ".";

export const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const smallImagesRef = useRef<HTMLUListElement>(null);
  // const currentImageRef = useRef<HTMLImageElement>(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDiscardOneModal, setShowDiscardOneModal] = useState(false);
  const [deletingImageName, setDeletingImageName] = useState<string | null>(
    null
  );
  // const [showSmallImages, setShowSmallImages] = useState(false);
  // const [showCropMenu, setShowCropMenu] = useState(false);
  // const [images, setImages] = useState<string[] | null>(null);
  const [images, setImages] = useState<
    | {
        name: string;
        layout: {
          x: number;
          y: number;
          width: number;
          height: number;
          zoom: number;
        };
      }[]
    | null
  >(null);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [cancelUpload, setCancelUpload] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const controller = useRef(new AbortController());
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [activeIconButton, setActiveIconButton] = useState<
    "gallery" | "crop" | "zoom" | null
  >(null);
  const [activeCrop, setActiveCrop] = useState<"horizontal" | "vertical">(
    "vertical"
  );
  // const [zoomValue, setZoomValue] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maxPosition, setMaxPosition] = useState({ x: 0, y: 0 });
  // const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // console.log(imageRef, containerRef);
  // console.log("offset: ", offset);
  // console.log("position: ", position);
  // console.log("maxPosition: ", maxPosition);
  // console.log("imageSize: ", imageSize);
  // console.log(images);

  // console.log(zoomValue);

  // const [mouseX, setMouseX] = useState(0);
  // const [mouseY, setMouseY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
    setActiveIconButton(null);

    // if (imageRef.current) {
    //   // const rect = imageRef.current.getBoundingClientRect();
    //   setOffset({
    //     x: e.nativeEvent.offsetX,
    //     y: e.nativeEvent.offsetY,
    //   });
    // }
    if (imageRef.current && containerRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left + containerRect.left,
        y: e.clientY - rect.top + containerRect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && imageRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMaxPosition({
        x: rect.width - imageRef.current.width,
        y: rect.height - imageRef.current.height,
      });
      let x = e.pageX - offset.x;
      let y = e.pageY - offset.y;
      x = Math.min(Math.max(x, maxPosition.x), 0);
      y = Math.min(Math.max(y, maxPosition.y), 0);
      // setPosition({ x, y });

      setImages(
        (images) =>
          images &&
          images.map((image) => ({
            ...image,
            layout: {
              ...image.layout,
              x,
              y,
            },
          }))
      );

      // setImages(
      //   (images) =>
      //     images?.map((image, i) => {
      //       if (i + 1 === currentImage) {
      //         image.layout.x = x;
      //         image.layout.y = y;
      //       }
      //       return image;
      //     }) || null
      // );
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>,
    index: number
  ) => {
    const { width, height } = e.target as HTMLImageElement;
    if (images) {
      const newImages = [...images];
      const oldImage = newImages[index];
      const newImage = {
        ...oldImage,
        layout: {
          ...oldImage.layout,
          width: activeCrop === "horizontal" ? 680 : width,
          height: activeCrop === "vertical" ? 680 : height,
          // clientHeight,
          // clientWidth
        },
      };
      newImages[index] = newImage;
      setImages(newImages);
      // newImages[index].layout.height = target.height;
      // newImages[index].layout.width = target.width;
    }

    // setImages(images => images?.map(image => ))
    // setImageSize({
    //   width: target.width,
    //   height: target.height,
    // });
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   const handleMouseUp = () => {
  //     setIsDragging(false);
  //   };
  //   window.addEventListener("mouseup", handleMouseUp);
  //   return () => window.removeEventListener("mouseup", handleMouseUp);
  // }, []);

  // useEffect(() => {
  //   const handleMouseUp = () => {
  //     setIsDragging(false);
  //   };

  //   const handleMouseLeave = () => {
  //     setIsDragging(false);
  //   };

  //   document.addEventListener("mouseup", handleMouseUp);
  //   document.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     document.removeEventListener("mouseup", handleMouseUp);
  //     document.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  // console.log(scrollLeft);
  // console.log("WIDTH: ", smallImagesRef.current!.scrollWidth - smallImagesRef.current!.clientWidth);

  useEffect(() => {
    smallImagesRef.current?.scrollTo({ left: scrollLeft });
    setScrollWidth(
      (smallImagesRef.current?.scrollWidth &&
        smallImagesRef.current.scrollWidth -
          smallImagesRef.current.clientWidth -
          1) ||
        0
    );
  }, [images]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "unset";
    };
  }, []);

  // const handleNextImage = () => {
  //   if (images && currentImage < images.length) {
  //     setCurrentImage((prev) => prev + 1);
  //   }
  // };

  // const handlePrevImage = () => {
  //   if (currentImage > 0) {
  //     setCurrentImage((prev) => prev - 1);
  //   }
  // };

  // console.log("mouseX: ", mouseX);
  // console.log("mouseY: ", mouseY);

  // useEffect(() => {
  //   // window.addEventListener("mousedown", () => {

  //   // })

  //   const mouseMove = (evt: MouseEvent) => {
  //     evt.preventDefault();
  //     console.log("mouse move");
  //     if (currentImageRef.current) {
  //       // currentImageRef.current.style.left = evt.clientX - evt.x + "px";
  //       currentImageRef.current.style.top = evt.movementY - evt.y + "px";
  //     }
  //     setMouseX(evt.x);
  //     setMouseY(evt.y);
  //   };
  //   currentImageRef.current?.addEventListener("mousedown", () => {
  //     console.log("mouse down");

  //     currentImageRef.current?.addEventListener("mousemove", mouseMove);
  //   });
  //   currentImageRef.current?.addEventListener("mouseup", () => {
  //     console.log("mouse up");

  //     currentImageRef.current?.removeEventListener("mousemove", mouseMove);
  //   });
  //   currentImageRef.current?.addEventListener("mouseleave", () => {
  //     console.log("mouse leave");

  //     currentImageRef.current?.removeEventListener("mousemove", mouseMove);
  //   });
  //   console.log(currentImageRef.current);
  // }, [currentImageRef.current]);
  // console.log(imageRef);

  // useEffect(() => {
  //   setImages(images => images && images.map)
  // }, [zoomValue])

  useEffect(() => {
    const hideIconButton = () => setActiveIconButton(null);
    if (activeIconButton) {
      window.addEventListener("click", hideIconButton);
    }

    return () => window.removeEventListener("click", hideIconButton);
  }, [activeIconButton]);

  // useEffect(() => {
  //   const hideSmallImages = () => {
  //     setShowSmallImages(false);
  //     setActiveIconButton(null);
  //   };
  //   if (showSmallImages) {
  //     window.addEventListener("click", hideSmallImages);
  //   }

  //   return () => window.removeEventListener("click", hideSmallImages);
  // }, [showSmallImages]);

  // useEffect(() => {
  //   const hideCropMenu = () => {
  //     setShowCropMenu(false);
  //     setActiveIconButton(null);
  //   };
  //   if (showSmallImages) {
  //     window.addEventListener("click", hideCropMenu);
  //   }

  //   return () => window.removeEventListener("click", hideCropMenu);
  // }, [showCropMenu]);

  const handleCloseDiscard = () => {
    setShowDiscardModal(false);
  };

  const handleCloseOneDiscard = () => {
    setDeletingImageName(null);
    setShowDiscardOneModal(false);
  };

  const handleRemoveImage = (name: string) => {
    appAxios.delete(`uploads/${name}`);
    if (images?.length === 1) {
      setImages(null);
    } else {
      setImages(
        (images) => images && images.filter((image) => image.name !== name)
      );
    }
    setDeletingImageName(null);
    if (currentImage !== 1) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const handleAcceptDiscard = () => {
    if (isImagesLoading) {
      controller.current.abort();
      onClose();
      return;
    }
    appAxios.post(
      "/uploads/delete",
      images?.map((image) => image.name)
    );
    if (cancelUpload) {
      setImages(null);
      setCurrentImage(1);
      setCancelUpload(false);
      return;
    }
    onClose();
  };

  const handleCancelUpload = () => {
    setCancelUpload(true);
    setShowDiscardModal(true);
  };

  const handleCloseUpload = () => {
    if (!images && !isImagesLoading) {
      onClose();
      return;
    }
    setShowDiscardModal(true);
  };

  const handleChangeFile = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;
    if (!fileList) {
      return;
    }

    const files = Array.from(fileList);
    const availableCount = images ? 10 - images.length : 10;

    if (files.length > availableCount) {
      alert("You can choose maximum 10 images");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append(`images`, file));
    setIsImagesLoading(true);
    try {
      const { data } = await appAxios.post<{ name: string }[]>(
        "/uploads",
        formData,
        {
          signal: controller.current.signal,
        }
      );
      const newImages = data.map((imageName) => ({
        ...imageName,
        layout: {
          height: 0,
          width: 0,
          x: 0,
          y: 0,
          zoom: 0,
        },
      }));
      setImages((images) => (images ? [...images, ...newImages] : newImages));
    } catch (error) {
      console.log(error);
    }
    setIsImagesLoading(false);
  };
  return (
    <>
      {isDragging && (
        <div
          className={scss.mouseMove}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: isDragging ? "grabbing" : undefined,
          }}
        ></div>
      )}
      <div onClick={handleCloseUpload} className={scss.background}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            // setShowSmallImages(false);
            setActiveIconButton(null);
          }}
          className={scss.box}
        >
          <div className={`${scss.title} ${scss.upload__title}`}>
            {images && (
              <div onClick={handleCancelUpload}>
                <LeftArrowIcon />
              </div>
            )}
            <p>Create new post</p>
            {images && <div className={scss.next}>Next</div>}
          </div>
          <div className={scss.upload__inner}>
            {isImagesLoading ? (
              <div className={scss.loadingSvg}>
                <LoadingIcon />
              </div>
            ) : images ? (
              <>
                {/* <div className={scss.arrows}> */}
                {currentImage > 1 && (
                  <div
                    onClick={() => setCurrentImage((prev) => prev - 1)}
                    className={`${scss.left} ${scss.icon__button} ${scss.arrow}`}
                  >
                    <LeftArrowCircleIcon />
                  </div>
                )}
                {currentImage < images.length && (
                  <div
                    onClick={() => setCurrentImage((prev) => prev + 1)}
                    className={`${scss.right} ${scss.icon__button} ${scss.arrow}`}
                  >
                    <RightArrowCircleIcon />
                  </div>
                )}
                {/* </div> */}
                <div className={scss.upload__sub}>
                  <div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIconButton((prev) =>
                          prev === "crop" ? null : "crop"
                        );
                        // setShowCropMenu(prev => !prev);
                      }}
                      className={`${scss.icon__button} ${
                        activeIconButton &&
                        (activeIconButton === "crop"
                          ? scss.active
                          : scss.disabled)
                      }`}
                    >
                      <CropIcon />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIconButton((prev) => (prev ? null : "zoom"));
                      }}
                      className={`${scss.icon__button} ${
                        activeIconButton &&
                        (activeIconButton === "zoom"
                          ? scss.active
                          : scss.disabled)
                      }`}
                    >
                      <ZoomIcon />
                    </div>
                  </div>
                  {images.length > 1 && (
                    <ul className={scss.dots}>
                      {images.map((_, i) => (
                        <li
                          key={i}
                          onClick={() => setCurrentImage(i + 1)}
                          style={{
                            opacity: currentImage === i + 1 ? 1 : 0.4,
                          }}
                        ></li>
                      ))}
                    </ul>
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      // setShowSmallImages((prev) => !prev);
                      setActiveIconButton((prev) =>
                        prev === "gallery" ? null : "gallery"
                      );
                    }}
                    className={`${scss.icon__button} ${
                      activeIconButton &&
                      (activeIconButton === "gallery"
                        ? scss.active
                        : scss.disabled)
                    }`}
                  >
                    <MediaGalleryIcon />
                  </div>
                </div>
                <ul
                  className={scss.upload__images}
                  style={{ left: (currentImage - 1) * -100 + "%" }}
                >
                  {images.map((image, i) => (
                    <li
                      key={image.name}
                      ref={currentImage === i + 1 ? containerRef : undefined}
                      // onMouseMove={handleMouseMove}
                      // onMouseUp={handleMouseUp}
                      // onMouseLeave={handleMouseLeave}
                    >
                      {/* {currentImage}, {i} */}
                      <img
                        ref={currentImage === i + 1 ? imageRef : undefined}
                        // ref={imageRef}
                        src={"http://localhost:5555/uploads/" + image.name}
                        alt=""
                        onLoad={(e) => handleImageLoad(e, i)}
                        onMouseDown={handleMouseDown}
                        onDragStart={handleDragStart}
                        style={{
                          left:
                            image.layout.x ||
                            image.layout.width +
                              image.layout.width * (image.layout.zoom / 100) >=
                              680
                              ? `${image.layout.x}px`
                              : "unset",
                          top:
                            image.layout.y ||
                            image.layout.height +
                              image.layout.height * (image.layout.zoom / 100) >=
                              680
                              ? `${image.layout.y}px`
                              : "unset",
                          // height:
                          //   activeCrop === "vertical"
                          //     ? `${100 + image.layout.zoom}%`
                          //     : undefined,
                          // width:
                          //   activeCrop === "horizontal"
                          //     ? `${100 + image.layout.zoom}%`
                          //     : undefined,
                          transform: `scale(${1 + image.layout.zoom / 100})`
                          // left: `${position.x}px`,
                          // top: `${position.y}px`,
                          // cursor: isDragging ? "grabbing" : "grab",
                        }}
                      />
                      {activeIconButton === "zoom" &&
                        currentImage === i + 1 && (
                          <div
                            className={scss.zoom}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="range"
                              onChange={(e) => {
                                if (containerRef.current && imageRef.current) {
                                  const newImages = [...images];
                                  const oldImage = images[currentImage - 1];

                                  const rect =
                                    containerRef.current.getBoundingClientRect();
                                  const x = rect.width - imageRef.current.width;
                                  const y = rect.height - imageRef.current.height;
                                  // setMaxPosition({
                                  //   x: rect.width - imageRef.current.width,
                                  //   y: rect.height - imageRef.current.height,
                                  // });

                                  console.log("x, y ", x, y);
                                  console.log(
                                    "maxPosition x, y ",
                                    maxPosition.x,
                                    maxPosition.y
                                  );

                                  const newImage = {
                                    ...oldImage,
                                    layout: {
                                      ...oldImage.layout,
                                      x: Math.min(
                                        Math.max(x, oldImage.layout.x, 0)
                                      ),
                                      y: Math.min(
                                        Math.max(y, oldImage.layout.y, 0)
                                      ),
                                      zoom: e.target.valueAsNumber,
                                    },
                                  };
                                  newImages[currentImage - 1] = newImage;
                                  setImages(newImages);
                                }
                              }}
                              value={image.layout.zoom}
                            />
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
                {activeIconButton === "crop" && (
                  <ul
                    onClick={(e) => e.stopPropagation()}
                    className={scss.cropMenu}
                  >
                    {/* <li
                      onClick={() => {
                        setActiveCrop("original");
                      }}
                      className={
                        activeCrop === "original" ? scss.active : undefined
                      }
                    >
                      Original <GalleryIcon />
                    </li> */}
                    {/* <li>1:1</li> */}
                    <li
                      onClick={() => {
                        setActiveCrop("vertical");
                        setImages(
                          (images) =>
                            images &&
                            images.map((image) => ({
                              ...image,
                              layout: {
                                ...image.layout,
                                height: 680,
                                width:
                                  (image.layout.width * 680) /
                                  image.layout.height,
                                y: 0,
                              },
                            }))
                        );
                      }}
                      className={
                        activeCrop === "vertical" ? scss.active : undefined
                      }
                    >
                      4:5 <VerticalRectangleIcon />
                    </li>
                    <li
                      onClick={() => {
                        setActiveCrop("horizontal");
                        setImages(
                          (images) =>
                            images &&
                            images.map((image) => ({
                              ...image,
                              layout: {
                                ...image.layout,
                                width: 680,
                                height:
                                  (image.layout.height * 680) /
                                  image.layout.width,
                                x: 0,
                              },
                            }))
                        );
                      }}
                      className={
                        activeCrop === "horizontal" ? scss.active : undefined
                      }
                    >
                      16:9 <HorizontalRectangleIcon />
                    </li>
                  </ul>
                )}
                {activeIconButton === "gallery" && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={scss.upload__images__small}
                  >
                    <div className={scss.images}>
                      {scrollLeft > 0 && (
                        <div className={`${scss.arrow} ${scss.left}`}>
                          <div
                            onClick={() =>
                              smallImagesRef.current?.scrollTo({
                                left: scrollLeft - 300,
                                behavior: "smooth",
                              })
                            }
                            className={scss.icon__button}
                          >
                            <LeftArrowCircleIcon />
                          </div>
                        </div>
                      )}
                      {scrollLeft < scrollWidth && (
                        <div className={`${scss.arrow} ${scss.right}`}>
                          <div
                            onClick={() =>
                              smallImagesRef.current?.scrollTo({
                                left: scrollLeft + 300,
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
                          setScrollLeft(e.currentTarget.scrollLeft)
                        }
                        ref={smallImagesRef}
                      >
                        {/* <li
                        className={`${scss.arrow} ${scss.left}`}
                      >
                        <div className={scss.icon__button}>
                          <LeftArrowCircleIcon />
                        </div>
                      </li>
                      <li
                        className={`${scss.arrow} ${scss.right}`}
                      >
                        <div className={scss.icon__button}>
                          <RightArrowCircleIcon />
                        </div>
                      </li> */}
                        {images.map((image, i) => (
                          <li
                            key={image.name + i}
                            className={
                              currentImage === i + 1 ? scss.active : ""
                            }
                            onClick={() => setCurrentImage(i + 1)}
                          >
                            <img
                              src={
                                "http://localhost:5555/uploads/" + image.name
                              }
                              alt=""
                              style={{
                                left:
                                  image.layout.x || image.layout.width > 680
                                    ? `${(image.layout.x * 94) / 680}px`
                                    : "unset",
                                top:
                                  image.layout.y || image.layout.height > 680
                                    ? `${(image.layout.y * 94) / 680}px`
                                    : "unset",
                                height:
                                  activeCrop === "vertical"
                                    ? `${100 + image.layout.zoom}%`
                                    : undefined,
                                width:
                                  activeCrop === "horizontal"
                                    ? `${100 + image.layout.zoom}%`
                                    : undefined,
                                // left: `${(image.layout.x * 94) / 680}px`,
                                // top: `${(image.layout.y * 94) / 680}px`,
                                // width: `${(image.layout.width * 94) / 680}px`,
                                // height: `${(image.layout.height * 94) / 680}px`,
                                // left: `${position.x}px`,
                                // top: `${position.y}px`,
                                // cursor: isDragging ? "grabbing" : "grab",
                              }}
                            />
                            <div
                              onClick={() => {
                                setShowDiscardOneModal(true);
                                setDeletingImageName(image.name);
                              }}
                            >
                              <CloseIcon />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {images.length < 10 && (
                      <div
                        className={scss.plus}
                        onClick={() => inputRef.current?.click()}
                      >
                        <PlusIcon />
                      </div>
                    )}
                    <input
                      onChange={handleChangeFile}
                      ref={inputRef}
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <ImageVideoIcon />
                <p>Drag photos and videos here</p>
                <AppButton onClick={() => inputRef.current?.click()}>
                  Select from computer
                </AppButton>
                <input
                  onChange={handleChangeFile}
                  ref={inputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                />
              </>
            )}
          </div>
        </div>
        <span>
          <CloseIcon />
        </span>
      </div>
      {showDiscardModal && (
        <DiscardModal
          title="Discard post?"
          text="If you leave, your edits won't be saved."
          onClose={handleCloseDiscard}
          onAccept={handleAcceptDiscard}
        />
      )}
      {showDiscardOneModal && (
        <DiscardModal
          title="Discard photo?"
          text="This will remove the photo from your post."
          onClose={handleCloseOneDiscard}
          onAccept={() => handleRemoveImage(deletingImageName as string)}
        />
      )}
    </>
  );
};
