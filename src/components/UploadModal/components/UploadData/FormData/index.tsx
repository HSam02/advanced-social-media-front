import { memo } from "react";
import { Avatar } from "../../../../";
import { AdvancedSettings } from "./AdvancedSettings";
import { postInfoType } from "../../../types";
import scss from "./FormData.module.scss";
import { useAppSelector } from "../../../../../app/hooks";
import { selectUser } from "../../../../../app/slices/user";

type FormDataProps = {
  postInfo: postInfoType;
  setPostInfo: React.Dispatch<React.SetStateAction<postInfoType>>;
};

export const FormData: React.FC<FormDataProps> = memo(
  ({ postInfo, setPostInfo }) => {
    const { user } = useAppSelector(selectUser);
    console.log("FormData");

    return (
      <div className={scss.formData}>
        <div className={scss.user}>
          <Avatar dest={user?.avatarDest} size={28} />
          <h3>{user?.username}</h3>
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
