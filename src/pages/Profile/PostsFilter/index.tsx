import { NavLink, useLocation, useParams } from "react-router-dom";
import { BookMarkIcon, ReelsIcon, WebIcon } from "../../../components/icons";
import scss from "./PostsFilter.module.scss";

export const PostsFilter: React.FC = () => {
  const { pathname } = useLocation();
  const { username } = useParams();
  const filter = pathname.includes("saved")
    ? "saved"
    : pathname.includes("reels")
    ? "reels"
    : "posts";
  console.log("PostsFilter");

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
      <li className={filter === "saved" ? scss.active : ""}>
        <NavLink to={`saved`}>
          <BookMarkIcon /> SAVED
        </NavLink>
      </li>
    </ul>
  );
};
