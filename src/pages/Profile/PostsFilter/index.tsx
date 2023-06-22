import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { usePostFilter } from "../../../utils/hooks";
import { selectUser } from "../../../app/slices/user";
import { BookMarkIcon, ReelsIcon, WebIcon } from "../../../components/icons";
import scss from "./PostsFilter.module.scss";

export const PostsFilter: React.FC = () => {
  console.log("PostsFilter");

  const { user } = useAppSelector(selectUser);
  const { username } = useParams();
  const filter = usePostFilter();

  return (
    <ul className={scss.filter}>
      <li className={filter === "posts" ? scss.active : ""}>
        <NavLink to={`/${username}`}>
          <WebIcon /> POSTS
        </NavLink>
      </li>
      <li className={filter === "reels" ? scss.active : ""}>
        <NavLink to={`reels`}>
          <ReelsIcon /> REELS
        </NavLink>
      </li>
      {user?.username === username && (
        <li className={filter === "saved" ? scss.active : ""}>
          <NavLink to={`saved`}>
            <BookMarkIcon /> SAVED
          </NavLink>
        </li>
      )}
    </ul>
  );
};
