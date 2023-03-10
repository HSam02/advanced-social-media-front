import { memo } from "react";
import scss from "./Avatar.module.scss";

type AvatarProps = {
  dest?: string;
  size?: string;
};

export const Avatar: React.FC<AvatarProps> = memo(({ dest, size }) => {
  console.log("Avatar", dest);

  const imageUrl = Boolean(dest)
    ? process.env.REACT_APP_API_URL + dest!
    : process.env.PUBLIC_URL + "/assets/avatar.jpg";

  return (
    <div style={{ width: size, height: size }} className={scss.avatar}>
      <img src={imageUrl} alt="" />
    </div>
  );
});
