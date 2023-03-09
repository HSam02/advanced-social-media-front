import { CroppedMedia } from "./CroppedMedia";
import { FormData } from "./FormData";
import { cropMediaType, postInfoType } from "../../types";
import scss from "./UploadData.module.scss";

type UploadDataProps = {
  mediaData: cropMediaType[];
  aspect: number;
  currentMedia: number;
  postInfo: postInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<postInfoType>>;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
};

export const UploadData: React.FC<UploadDataProps> = ({
  mediaData,
  aspect,
  currentMedia,
  postInfo,
  setPostInfo,
  setCurrentMedia,
}) => {
  console.log("UploadData");

  return (
    <div className={scss.uploadData}>
      <CroppedMedia
        media={mediaData[currentMedia]}
        aspect={aspect}
        currentMedia={currentMedia}
        dataCount={mediaData.length}
        setCurrentMedia={setCurrentMedia}
      />
      <FormData postInfo={postInfo} setPostInfo={setPostInfo} />
    </div>
  );
};
