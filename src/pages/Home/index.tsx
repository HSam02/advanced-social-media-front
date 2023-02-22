import { AppContainer, Post } from "../../components";
import scss from "./Home.module.scss";

export const Home: React.FC = () => {
  return (
    <>
      <AppContainer>
        <ul>
          <Post />
          <Post />
          <Post />
          <Post />
        </ul>
      </AppContainer>
    </>
  );
};
