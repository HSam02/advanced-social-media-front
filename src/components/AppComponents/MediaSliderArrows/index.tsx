import { ArrowIconButton } from "../";
import scss from "./MediaSliderArrows.module.scss";

type MediaSliderArrowsProps = {
  type: "black" | "white";
  mediaCount: number;
  currentMedia: number;
  setCurrentMedia: React.Dispatch<React.SetStateAction<number>>;
};

export const MediaSliderArrows: React.FC<MediaSliderArrowsProps> = ({
  mediaCount,
  currentMedia,
  setCurrentMedia,
}) => {
  console.log("MediaSliderArrows");
  
  return (
    <>
      {currentMedia > 0 && (
        <div
          onClick={() => {
            setCurrentMedia((prev) => prev - 1);
          }}
          className={`${scss.left} ${scss.arrow}`}
        >
          <ArrowIconButton side="left" />
        </div>
      )}
      {currentMedia < mediaCount - 1 && (
        <div
          onClick={() => {
            setCurrentMedia((prev) => prev + 1);
          }}
          className={`${scss.right} ${scss.arrow}`}
        >
          <ArrowIconButton side="right" />
        </div>
      )}
    </>
  );
};
