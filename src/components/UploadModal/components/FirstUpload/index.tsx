import { useRef } from "react";
import { AppButton } from "../../../AppComponents";
import { ImageVideoIcon } from "../../../icons";
import scss from "./FirstUpload.module.scss";

type FirstUploadProps = {
  handleChangeFile: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FirstUpload: React.FC<FirstUploadProps> = ({ handleChangeFile }) => {
  console.log('FirstUpload');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={scss.box__inner__upload}>
      <ImageVideoIcon />
      <p>Drag photos and videos here</p>
      <AppButton onClick={() => inputRef.current?.click()}>
        Select from computer
      </AppButton>
      <input
        onChange={handleChangeFile}
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, video/mp4"
        multiple
      />
    </div>
  );
};
