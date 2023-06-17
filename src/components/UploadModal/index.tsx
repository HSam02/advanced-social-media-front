import { useRef, useState, useCallback } from "react";
import appAxios from "../../appAxios";
import { useAppDispatch } from "../../app/hooks";
import { IPost, mediaType } from "../../app/slices/posts";
import { activeModalType, cropMediaType, uploadStatusType } from "./types";
import { DiscardModal, ModalBackground } from "../";
import {
  FirstUpload,
  MediaEditor,
  UploadData,
  UploadStatus,
  UploadSub,
  UploadTitle,
} from "./components/";
import scss from "./UploadModal.module.scss";
import { addUserPost } from "../../app/thunks";

type UploadModalProps = {
  onClose: () => void;
};

export const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [mediaData, setMediaData] = useState<cropMediaType[] | null>(null);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [aspect, setAspect] = useState<number>(1);
  const [activeModal, setActiveModal] = useState<activeModalType | null>(null);
  const [isCropSuccess, setIsCropSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<uploadStatusType>("idle");
  const [postInfo, setPostInfo] = useState({
    text: "",
    hideComments: false,
    hideLikes: false,
  });

  const uploadController = useRef(new AbortController());

  const handleCloseUpload = () => {
    if (mediaData && uploadStatus !== "Post shared") {
      return setActiveModal("close");
    }
    onClose();
  };

  const handleChangeFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;

    if (!fileList) {
      return;
    }
    const files = Array.from(fileList);
    const availableCount = mediaData ? 10 - mediaData.length : 10;

    if (files.length > availableCount) {
      alert("You can choose maximum 10 images");
      files.splice(availableCount);
    }
    const allowedFiles = files.filter((file) =>
      file.type === "video/mp4"
        ? file.size < 20 * 1024 * 1024
        : file.size < 5 * 1024 * 1024
    );
    if (files.length !== allowedFiles.length) {
      alert("You can choose images (maximum 5Mb) or videos(maximum 20Mb)");
      if (allowedFiles.length === 0) {
        return;
      }
    }
    const newData = allowedFiles.map(
      (file) =>
        ({
          type: file.type.slice(0, 5),
          dest: URL.createObjectURL(file),
          file,
          crop: {
            x: 0,
            y: 0,
          },
          zoom: 1,
        } as cropMediaType)
    );

    setMediaData((mediaData) =>
      mediaData ? [...mediaData, ...newData] : newData
    );
    evt.target.value = "";
  };

  const goToForm = useCallback(() => setIsCropSuccess(true), []);

  const handleSubmit = useCallback(async () => {
    setUploadStatus("Sharing");
    try {
      const { text, hideComments, hideLikes } = postInfo;
      const formData = new FormData();
      const requestData = {
        aspect,
        text: text.trim(),
        hideComments,
        hideLikes,
        media: [] as mediaType[],
      };
      mediaData?.forEach((media) => {
        formData.append("post_media", media.file);

        requestData.media.push({
          dest: "",
          type: media.type,
          styles: media.styles,
        });
      });
      formData.append("data", JSON.stringify(requestData));

      const { data } = await appAxios.post<IPost>("/posts", formData, {
        signal: uploadController.current.signal,
      });
      dispatch(addUserPost(data));

      setUploadStatus("Post shared");
      setActiveModal(null);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Post didn't share");
      setUploadStatus("idle");
    }
  }, [postInfo, mediaData, aspect, dispatch, onClose]);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleAcceptModal = () => {
    setActiveModal(null);
    switch (activeModal) {
      case "cancel":
        setMediaData(null);
        setCurrentMedia(0);
        break;
      case "close":
        if (uploadStatus === "Sharing") {
          uploadController.current.abort();
        }
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

  const handleGoBack = useCallback(() => {
    if (isCropSuccess) {
      return setIsCropSuccess(false);
    }
    setActiveModal("cancel");
  }, [isCropSuccess]);

  return (
    <>
      <ModalBackground onClose={handleCloseUpload} closeIcon>
        <div className={scss.box}>
          <UploadTitle
            showButtos={Boolean(mediaData)}
            isCropSuccess={isCropSuccess}
            uploadStatus={uploadStatus}
            handleGoBack={handleGoBack}
            handleClickButton={isCropSuccess ? handleSubmit : goToForm}
          />
          {isCropSuccess && mediaData ? (
            <>
              {uploadStatus === "idle" ? (
                <UploadData
                  mediaData={mediaData}
                  aspect={aspect}
                  postInfo={postInfo}
                  setPostInfo={setPostInfo}
                />
              ) : (
                <UploadStatus uploadStatus={uploadStatus} />
              )}
            </>
          ) : (
            <div className={scss.box__inner}>
              {mediaData ? (
                <>
                  <MediaEditor
                    aspect={aspect}
                    currentMedia={currentMedia}
                    mediaData={mediaData}
                    setCurrentMedia={setCurrentMedia}
                    setMediaData={setMediaData}
                  />
                  <UploadSub
                    mediaData={mediaData}
                    aspect={aspect}
                    currentMedia={currentMedia}
                    handleChangeFile={handleChangeFile}
                    setMediaData={setMediaData}
                    setActiveModal={setActiveModal}
                    setAspect={setAspect}
                    setCurrentMedia={setCurrentMedia}
                  />
                </>
              ) : (
                <FirstUpload handleChangeFile={handleChangeFile} />
              )}
            </div>
          )}
        </div>
      </ModalBackground>
      {activeModal && (
        <DiscardModal
          title={`Discard ${
            activeModal === "delete" ? mediaData![currentMedia].type : "post"
          }?`}
          text={`This will remove the ${
            activeModal === "delete" ? mediaData![currentMedia].type : "post"
          } from your post.`}
          acceptText="Discard"
          onClose={handleCloseModal}
          onAccept={handleAcceptModal}
        />
      )}
    </>
  );
};
