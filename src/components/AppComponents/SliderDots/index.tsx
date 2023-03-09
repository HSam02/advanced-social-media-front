import { memo } from "react";
import scss from "./SliderDots.module.scss";

type SliderDotsProps = {
  count: number;
  currentMedia: number;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
};

export const SliderDots: React.FC<SliderDotsProps> = memo(
  ({ count, currentMedia, setCurrentMedia }) => {
    console.log("SliderDots");
    return (
      <ul className={scss.dots}>
        {new Array(count).fill("").map((_, i) => (
          <li
            key={i}
            onClick={() => setCurrentMedia(i)}
            style={{
              opacity: currentMedia === i ? 1 : 0.4,
            }}
          ></li>
        ))}
      </ul>
    );
  }
);
