import { memo } from "react";
import { LeftArrowIcon } from "../../../icons";
import { uploadStatusType } from "../../types";
import { TextButton } from "../../../AppComponents";
import scss from "./UploadTitle.module.scss";

type UploadTitleProps = {
  isCropSuccess: boolean;
  uploadStatus: uploadStatusType;
  showButtos: boolean;
  handleGoBack: () => void;
  handleClickButton: () => void;
};

export const UploadTitle: React.FC<UploadTitleProps> = memo(
  ({
    isCropSuccess,
    uploadStatus,
    showButtos,
    handleGoBack,
    handleClickButton,
  }) => {
    console.log("UploadTitle");

    return (
      <div className={scss.title}>
        {uploadStatus === "idle" ? (
          <>
            {showButtos && (
              <div onClick={handleGoBack}>
                <LeftArrowIcon />
              </div>
            )}
            <h3>Create new post</h3>
            {showButtos && (
              <TextButton onClick={handleClickButton}>
                {isCropSuccess ? "Share" : "Next"}
              </TextButton>
            )}
          </>
        ) : (
          <h3>{uploadStatus}</h3>
        )}
      </div>
    );
  }
);
