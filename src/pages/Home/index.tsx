import { Post } from "../../components";
import scss from "./Home.module.scss";

export const Home: React.FC = () => {
  return (
    <>
      <ul className={scss.container}>
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
    </>
  );
};
