import { CheckCircleIcon, LoadingIcon } from "../../../icons";
import { uploadStatusType } from "../../types";
import scss from "./UploadStatus.module.scss";

type UploadStatusProps = {
  uploadStatus: uploadStatusType;
};

export const UploadStatus: React.FC<UploadStatusProps> = ({ uploadStatus }) => {
  return (
    <div className={scss.status}>
      {uploadStatus === "Post shared" && (
        <div>
          <CheckCircleIcon />
          <p>Your post has been shared</p>
        </div>
      )}
      {uploadStatus === "Sharing" && <LoadingIcon />}
    </div>
  );
};
