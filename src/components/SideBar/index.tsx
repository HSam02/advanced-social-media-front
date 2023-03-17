import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectUser } from "../../app/slices/user";
import {
  ActivityIcon,
  AddIcon,
  BarsIcon,
  BellIcon,
  BookMarkIcon,
  HouseIcon,
  LogoIcon,
  MessageIcon,
  ReportIcon,
  SearchIcon,
  SettingsIcon,
  ThemeIcon,
  UserIcon,
} from "../icons";
import scss from "./SideBar.module.scss";
import { UploadModal } from "../";

export const SideBar: React.FC = () => {
  const { user } = useAppSelector(selectUser);
  const [activeLink, setActiveLink] = useState<string>("");
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hideMoreMenu = () => setShowMoreMenu(false);
    if (showMoreMenu) {
      window.addEventListener("click", hideMoreMenu);
    }

    return () => window.removeEventListener("click", hideMoreMenu);
  }, [showMoreMenu]);

  useEffect(() => {
    setActiveLink("/" + location.pathname.split("/")[1]);
  }, [location.pathname]);

  const closeModal = () => {
    setShowUploadModal(false);
    setActiveLink("/" + location.pathname.split("/")[1]);
  };

  // useEffect(() => {

  //   console.log(showUploadModal);
  // }, [showUploadModal])

  // console.log(showUploadModal);

  return (
    <>
      {showUploadModal && <UploadModal onClose={closeModal} />}
      <div className={scss.block}>
        <div className={scss.sideBar}>
          <div className={scss.logo} onClick={() => setActiveLink("/")}>
            <NavLink to="/">
              <LogoIcon />
            </NavLink>
          </div>
          <ul className={scss.links}>
            <li onClick={() => setActiveLink("/")}>
              <NavLink to="/">
                <HouseIcon active={activeLink === "/"} />
              </NavLink>
            </li>
            <li onClick={() => setActiveLink("search")}>
              <SearchIcon active={activeLink === "search"} />
            </li>
            <li onClick={() => setActiveLink("/direct")}>
              <NavLink to="/direct">
                <MessageIcon active={activeLink === "/direct"} />
              </NavLink>
            </li>
            <li onClick={() => setActiveLink("bell")}>
              <BellIcon active={activeLink === "bell"} />
            </li>
            <li
              onClick={() => {
                setActiveLink("add");
                setShowUploadModal(true);
              }}
            >
              <AddIcon active={activeLink === "add"} />
            </li>
            <li onClick={() => setActiveLink(`/${user?.username}`)}>
              <NavLink to={`/${user?.username}`}>
                <UserIcon active={activeLink === `/${user?.username}`} />
              </NavLink>
            </li>
          </ul>
          <div
            className={scss.bars}
            onClick={(e) => {
              e.stopPropagation();
              setShowMoreMenu((prev) => !prev);
            }}
          >
            <BarsIcon active={showMoreMenu} />
            {showMoreMenu && (
              <ul className={scss.more__menu}>
                <li>
                  <NavLink to="/settings">
                    <div>
                      Settings
                      <SettingsIcon />
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/saved">
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
