import scss from "./Avatar.module.scss";

type AvatarProps = {
  size?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <div style={{ width: size, height: size }} className={scss.avatar}>
      <img
        src="https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png"
        alt=""
      />
    </div>
  );
};
