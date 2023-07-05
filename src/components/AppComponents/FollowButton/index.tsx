import { IUser } from "../../../app/slices/user";
import { LoadingIcon } from "../../icons";
import { AppButton } from "../AppButton";
import scss from "./FollowButton.module.scss";

type FollowButtonProps = {
  children?: React.ReactNode;
  user: IUser;
  onClick: () => void;
};

export const FollowButton: React.FC<FollowButtonProps> = ({
  children,
  user,
  onClick,
}) => {
  console.log("FollowButton");

  return (
    <AppButton
      disabled={user.followData.status === "loading"}
      onClick={onClick}
      gray={user.followData.followed}
    >
      <div
        className={`${scss.followBtn} ${
          user.followData.status === "loading" ? scss.followLoading : ""
        }`}
      >
        <LoadingIcon />
        {children ? (
          children
        ) : user.followData.followed ? (
          <p>Unfollow</p>
        ) : (
          <p>Follow{user.followData.following ? " Back" : ""}</p>
        )}
      </div>
    </AppButton>
  );
};
