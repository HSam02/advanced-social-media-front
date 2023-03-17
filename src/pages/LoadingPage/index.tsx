import { LogoIcon } from "../../components/icons";
import scss from "./LoadingPage.module.scss";

export const LoadingPage: React.FC = () => {
  return (
    <div className={scss.loading__page}>
      <LogoIcon />
      <p>from Sam</p>
    </div>
  );
};
