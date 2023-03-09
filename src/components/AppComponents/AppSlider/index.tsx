import { memo } from "react";
import scss from "./AppSlider.module.scss";

type AppSliderProps = {
  active?: boolean;
  handleClick: () => void;
};

export const AppSlider: React.FC<AppSliderProps> = memo(
  ({ active, handleClick }) => {
    console.log("AppSlider");

    return (
      <div
        onClick={handleClick}
        className={`${scss.slider} ${active ? scss.active : ""}`}
      ></div>
    );
  }
);
