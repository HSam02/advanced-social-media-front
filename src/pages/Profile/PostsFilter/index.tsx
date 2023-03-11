import { BookMarkIcon, WebIcon } from "../../../components/icons";
import scss from "./PostsFilter.module.scss";

type PostsFilterProps = {
  filter: "posts" | "saved";
  setFilter: React.Dispatch<React.SetStateAction<"posts" | "saved">>;
};

export const PostsFilter: React.FC<PostsFilterProps> = ({
  filter,
  setFilter,
}) => {
  console.log("PostsFilter");

  return (
    <ul className={scss.filter}>
      <li
        className={filter === "posts" ? scss.active : ""}
        onClick={() => setFilter("posts")}
      >
        <WebIcon /> POSTS
      </li>
      <li
        className={filter === "saved" ? scss.active : ""}
        onClick={() => setFilter("saved")}
      >
        <BookMarkIcon /> SAVED
      </li>
    </ul>
  );
};
