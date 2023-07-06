import { memo } from "react";
import scss from "./AppButton.module.scss";

type AppButtonProps = {
  children?: React.ReactNode;
  gray?: boolean;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AppButton: React.FC<AppButtonProps> = memo(
  ({ children, gray, type, disabled, onClick }) => {
    console.log("AppButton");
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${scss.button} ${gray ? scss.gray : ""} ${
          disabled ? scss.disabled : ""
        }`}
      >
        {children}
      </button>
    );
  }
);
