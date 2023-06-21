import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { OnCloseContext, sideBarList } from "./utils";
import { NavLink } from "react-router-dom";
import { LogoIcon } from "../icons";
import { Avatar, Search, UploadModal } from "../";
import { SideBarSettings } from "./SideBarSettings";
import scss from "./SideBar.module.scss";

export const SideBar: React.FC = () => {
  console.log("SideBar");

  const { user } = useAppSelector(selectUser);
  const location = useLocation();
  
  const [activeLink, setActiveLink] = useState<string>("");
  const [activeSideMenu, setActiveSideMenu] = useState<string | null>(null);
  const [sideMenuLeft, setSideMenuLeft] = useState<string | undefined>();
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathValue = useMemo(() => location.pathname.split("/")[1], [location]);

  const closeSideMenu = useCallback(() => {
    if (!timeoutRef.current && activeSideMenu) {
      setSideMenuLeft("-400px");
    }
    if (timeoutRef.current && activeSideMenu) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setSideMenuLeft("77px");
      return;
    }
    timeoutRef.current = setTimeout(() => {
      setActiveSideMenu(null);
      setActiveLink("/" + pathValue);
      timeoutRef.current = null;
    }, 500);
  }, [pathValue, activeSideMenu]);

  const handleClickLink = (linkName: string) => {
    if (linkName.includes("/")) {
      setActiveLink(linkName);
    } else {
      setActiveSideMenu(linkName);
    }
  };

  useEffect(() => {
    setActiveLink("/" + pathValue);
  }, [pathValue]);

  useEffect(() => {
    if (activeSideMenu) {
      setSideMenuLeft("77px");
    } else {
      setActiveLink("/" + pathValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSideMenu]);

  return (
    <>
      <div className={scss.block}>
        <div className={scss.sideBar}>
          <div className={scss.logo} onClick={() => handleClickLink("/")}>
            <LogoIcon />
          </div>
          <ul className={scss.links}>
            {sideBarList?.map((link, i) => (
              <li
                key={i}
                onClick={() =>
                  activeSideMenu ? closeSideMenu() : handleClickLink(link.name)
                }
                onMouseDown={(e) => e.stopPropagation()}
              >
                {link.name.includes("/") ? (
                  <NavLink to={link.name}>
                    {React.createElement(link.icon.type, {
                      active: activeSideMenu
                        ? activeSideMenu === link.name
                        : activeLink === link.name,
                    })}
                  </NavLink>
                ) : (
                  React.createElement(link.icon.type, {
                    active: activeSideMenu
                      ? activeSideMenu === link.name
                      : activeLink === link.name,
                  })
                )}
              </li>
            ))}
            <li
              onClick={() => handleClickLink(`/${user?.username}`)}
              className={
                activeLink === `/${user?.username}`
                  ? scss.avatarActive
                  : undefined
              }
            >
              <NavLink to={`/${user?.username}`}>
                <Avatar size="28px" dest={user?.avatarDest} />
              </NavLink>
            </li>
          </ul>
          <SideBarSettings />
        </div>
      </div>
      <OnCloseContext.Provider value={closeSideMenu}>
        {activeSideMenu === "add" && <UploadModal onClose={closeSideMenu} />}
        {activeSideMenu === "search" && (
          <div className={scss.sideMenu} style={{ left: sideMenuLeft }}>
            <Search />
          </div>
        )}
      </OnCloseContext.Provider>
    </>
  );
};
