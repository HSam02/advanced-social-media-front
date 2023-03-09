import { memo } from "react";
import { Avatar } from "../../../../AppComponents";
import { AdvancedSettings } from "./AdvancedSettings";
import { postInfoType } from "../../../types";
import scss from "./FormData.module.scss";

type FormDataProps = {
  postInfo: postInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<postInfoType>>;
};

export const FormData: React.FC<FormDataProps> = memo(
  ({ postInfo, setPostInfo }) => {
    console.log("FormData");

    return (
      <div className={scss.formData}>
        <div className={scss.user}>
          <Avatar size="28px" />
          <h3>nickname</h3>
        </div>
        <textarea
          placeholder="Write a caption..."
          onChange={(e) =>
            setPostInfo((prev) => ({
              ...prev,
              text: e.target.value,
            }))
          }
          value={postInfo.text}
        ></textarea>
        <AdvancedSettings postInfo={postInfo} setPostInfo={setPostInfo} />
      </div>
    );
  }
);
