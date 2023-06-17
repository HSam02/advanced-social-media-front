import { LoadingIcon } from "../../../icons";
import scss from "./ShowMore.module.scss";

type ShowMoreProps = {
  status: "idle" | "loading" | "error";
  showReplies: boolean;
  count: number;
  repliesLength: number;
  onClick: () => void;
};

export const ShowMore: React.FC<ShowMoreProps> = ({
  count,
  onClick,
  repliesLength,
  showReplies,
  status,
}) => {
  console.log("ShowMore");

  return (
    <div
      onClick={onClick}
      className={`${scss.replies__button} ${
        status === "loading" ? scss.disabled : ""
      }`}
    >
      <span></span>
      {showReplies && repliesLength === count ? (
        <p>Hide replies</p>
      ) : (
        <p>View replies ({showReplies ? count - repliesLength : count})</p>
      )}
      {status === "loading" && (
        <div>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};
