import { NavLink } from "react-router-dom";
import { LogoIcon } from "../icons";
import scss from "./AppComponent.module.scss";

type childrenPropType = {
  children?: React.ReactElement | React.ReactElement[] | string;
  gray?: boolean,
  type?: "submit" | "reset" | "button",
  disabled?: boolean,
  to?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
};

export const AppContainer: React.FC<childrenPropType> = ({ children }) => {
  return <div className={scss.container}>{children}</div>;
};

export const Avatar: React.FC<{ size?: string }> = ({ size }) => {
  return (
    <div style={{ width: size, height: size }} className={scss.avatar}>
      <img
        src="https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png"
        alt=""
      />
    </div>
  );
};

export const AppButton: React.FC<childrenPropType> = ({ children, gray, type, disabled, onClick }) => {
  return <button onClick={onClick} type={type} className={`${scss.button} ${gray && scss.gray} ${disabled && scss.disabled}`}>{children}</button>;
};

// export const AppNavLink: React.FC<childrenPropType> = ({children, to}) => {
//   return <NavLink to={to || ""} >
//     {children}
//   </NavLink>
// }

export const LoadingPage: React.FC = () => {
  return <div className={scss.loading__page}>
    <LogoIcon />
    <p>from Sam</p>
  </div>
}