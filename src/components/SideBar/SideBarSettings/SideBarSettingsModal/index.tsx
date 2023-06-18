import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useClickOutside } from "../../../../utils/hooks";
import { logout, selectUser } from "../../../../app/slices/user";
import { NavLink } from "react-router-dom";
import {
  ActivityIcon,
  BookMarkIcon,
  ReportIcon,
  SettingsIcon,
  ThemeIcon,
} from "../../../icons";
import scss from "./SideBarSettingsModal.module.scss";

type SideBarSettingsProps = {
  onClose: () => void;
};

export const SideBarSettingsModal: React.FC<SideBarSettingsProps> = ({
  onClose,
}) => {
  console.log("SideBarSettingsModal");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

  const boxRef = useRef<HTMLUListElement>(null);
  useClickOutside(boxRef, onClose);

  return (
    <ul ref={boxRef} className={scss.more__menu}>
      <li>
        <NavLink to="/settings">
          <div>
            Settings
            <SettingsIcon />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/${user?.username}/saved`}>
          <div>
            Saved
            <BookMarkIcon />
          </div>
        </NavLink>
      </li>
      <li>
        <div>
          Switch apperance
          <ThemeIcon />
        </div>
      </li>
      <li>
        <NavLink to="/your_activity">
          <div>
            Your activity
            <ActivityIcon />
          </div>
        </NavLink>
      </li>
      <li>
        <div>
          Report a problem <ReportIcon />
        </div>
      </li>
      <li>
        <div onClick={() => dispatch(logout())}>Log out</div>
      </li>
    </ul>
  );
};
