import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import { NavLink } from "react-router-dom";
import {
  AddIcon,
  ExploreIcon,
  HeartIcon,
  HouseIcon,
  LogoIcon,
  MessageIcon,
  ReelsIcon,
  SearchIcon,
} from "../icons";
import { Avatar, Search, UploadModal } from "../";
import { SideBarSettings } from "./SideBarSettings";
import scss from "./SideBar.module.scss";

const sideBarList = [
  {
    name: "/",
    icon: <HouseIcon />,
  },
  {
    name: "search",
    icon: <SearchIcon />,
  },
  {
    name: "/explore",
    icon: <ExploreIcon />,
  },
  {
    name: "/reels",
    icon: <ReelsIcon />,
  },
  {
    name: "/direct",
    icon: <MessageIcon />,
  },
  {
    name: "bell",
    icon: <HeartIcon />,
  },
  {
    name: "add",
    icon: <AddIcon />,
  },
];

export const SideBar: React.FC = () => {
  console.log("SideBar");

  const { user } = useAppSelector(selectUser);
  const [activeLink, setActiveLink] = useState<string>("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const location = useLocation();

  const pathValue = useMemo(() => location.pathname.split("/")[1], [location]);

  useEffect(() => {
    setActiveLink("/" + pathValue);
  }, [pathValue]);

  useEffect(() => {
    if (!activeLink.includes("/")) {
      setActiveModal(activeLink);
    }
  }, [activeLink]);

  const closeModal = () => {
    setActiveModal(null);
    setActiveLink("/" + pathValue);
  };

  return (
    <>
      <div className={scss.block}>
        <div className={scss.sideBar}>
          <div className={scss.logo} onClick={() => setActiveLink("/")}>
            <LogoIcon />
          </div>
          <ul className={scss.links}>
            {sideBarList?.map((link, i) => (
              <li
                key={i}
                onClick={() =>
                  activeLink === link.name
                    ? closeModal()
                    : setActiveLink(link.name)
                }
                onMouseDown={(e) => e.stopPropagation()}
              >
                {link.name.includes("/") ? (
                  <NavLink to={link.name}>
                    {React.createElement(link.icon.type, {
                      active: activeLink === link.name,
                    })}
                  </NavLink>
                ) : (
                  React.createElement(link.icon.type, {
                    active: activeLink === link.name,
                  })
                )}
              </li>
            ))}
            <li
              onClick={() => setActiveLink(`/${user?.username}`)}
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
      {activeModal === "add" && <UploadModal onClose={closeModal} />}
      {activeModal === "search" && <Search onClose={closeModal} />}
    </>
  );
};
