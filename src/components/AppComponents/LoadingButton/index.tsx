import { LoadingIcon } from "../../icons";
import { AppButton } from "../AppButton";
import scss from "./LoadingButton.module.scss";

type LoadingButtonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  gray?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  gray,
  isLoading,
  disabled,
  onClick,
}) => {
  console.log("FollowButton");

  return (
    <AppButton disabled={isLoading || disabled} onClick={onClick} gray={gray}>
      <div className={`${scss.buttonInner} ${isLoading ? scss.loading : ""}`}>
        <LoadingIcon />
        <p>{children}</p>
      </div>
    </AppButton>
  );
};
