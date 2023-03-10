import { useState, useRef, memo } from "react";
import { Avatar } from "../../../components";
import { LoadingIcon } from "../../../components/icons";
import scss from "./ProfileAvatar.module.scss";
import appAxios from "../../../appAxios";
import { useAppDispatch } from "../../../app/hooks";
import { updateAvatar } from "../../../app/slices/user";
import { ChangeAvatarModal } from "./ChangeAvatarModal";

type ProfileAvatarProps = {
  dest: string;
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = memo(({ dest }) => {
  console.log("ProfileAvatar");

  const dispatch = useAppDispatch();
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [showChangeAvatarModal, setShowChangeAvatarModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickAvatar = () => {
    if (!dest) {
      return inputRef.current?.click();
    }
    setShowChangeAvatarModal(true);
  };

  const handleFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsAvatarLoading(true);
      const file = inputRef.current?.files![0];
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const { data } = await appAxios.post<string>("/auth/avatar", formData);

      dispatch(updateAvatar(data));
      setIsAvatarLoading(false);
    } catch (error) {
      console.log(error);
      setIsAvatarLoading(false);
      alert("Avatar didn't update");
    }
    evt.target.value = "";
  };

  const handleRemoveAvatar = async () => {
    try {
      setIsAvatarLoading(true);
      await appAxios.delete("/auth/avatar");
      dispatch(updateAvatar(""));
      setIsAvatarLoading(false);
    } catch (error) {
      console.log(error);
      setIsAvatarLoading(false);
      alert("Avatar didn't remove");
    }
  };

  const handleCloseChangeAvatarModal = () => {
    setShowChangeAvatarModal(false);
  };

  return (
    <>
      <div
        className={scss.avatar}
        style={{ pointerEvents: isAvatarLoading ? "none" : undefined }}
        onClick={handleClickAvatar}
      >
        <Avatar size="150px" dest={dest} />
        {isAvatarLoading && (
          <div className={scss.loading}>
            <LoadingIcon />
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </div>
      {showChangeAvatarModal && (
        <ChangeAvatarModal
          inputRef={inputRef}
          onClose={handleCloseChangeAvatarModal}
          handleRemoveAvatar={handleRemoveAvatar}
        />
      )}
    </>
  );
});
