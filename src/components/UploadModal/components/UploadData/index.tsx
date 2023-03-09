import { FormData } from "./FormData";
import { cropMediaType, postInfoType } from "../../types";
import scss from "./UploadData.module.scss";
import { MediaSlider } from "../../../MediaSlider";

type UploadDataProps = {
  mediaData: cropMediaType[];
  aspect: number;
  postInfo: postInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<postInfoType>>;
};

export const UploadData: React.FC<UploadDataProps> = ({
  mediaData,
  aspect,
  postInfo,
  setPostInfo,
}) => {
  console.log("UploadData");

  return (
    <div className={scss.uploadData}>
      <div className={scss.croppedMedia}>
        <MediaSlider
          media={mediaData}
          aspect={aspect}
          dataCount={mediaData.length}
        />
      </div>
      {/* <CroppedMedia
        media={mediaData[currentMedia]}
        aspect={aspect}
        currentMedia={currentMedia}
        dataCount={mediaData.length}
        setCurrentMedia={setCurrentMedia}
      /> */}
      <FormData postInfo={postInfo} setPostInfo={setPostInfo} />
    </div>
  );
};
