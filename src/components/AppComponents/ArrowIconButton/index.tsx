import { memo } from "react";
import { LeftArrowCircleIcon, RightArrowCircleIcon } from "../../icons";
import scss from "./ArrowIconButton.module.scss";

type ArrowIconButtonProps = {
  side: "left" | "right";
  type?: "black" | "white" | "dark-white";
  size?: number;
  onClick?: () => void;
};

export const ArrowIconButton: React.FC<ArrowIconButtonProps> = memo(
  ({ side, type, size, onClick }) => {
    console.log(side, "ArrowIconButton");

    return (
      <div
        onClick={onClick}
        className={`${scss.icon__button} ${type ? scss[type] : ""}`}
        style={
          size
            ? {
                width: size + "px",
                height: size + "px",
              }
            : undefined
        }
      >
        {side === "left" ? <LeftArrowCircleIcon /> : <RightArrowCircleIcon />}
      </div>
    );
  }
);
