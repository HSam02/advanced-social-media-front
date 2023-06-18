import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/slices/user";
import {
  AddIcon,
  BellIcon,
  HouseIcon,
  LogoIcon,
  MessageIcon,
  ReelsIcon,
  SearchIcon,
} from "../icons";
import { Avatar, UploadModal } from "../";
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
    icon: <LogoIcon />,
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
    icon: <BellIcon />,
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
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink("/" + location.pathname.split("/")[1]);
  }, [location.pathname]);

  useEffect(() => {
    if (
      activeLink.includes("/") &&
      activeLink !== "/" + location.pathname.split("/")[1]
    ) {
      navigate(activeLink);
    }
  }, [navigate, activeLink, location.pathname]);

  useEffect(() => {
    if (!activeLink.includes("/")) {
      setActiveModal(activeLink);
    }
  }, [activeLink]);

  const closeModal = () => {
    setActiveModal(null);
    setActiveLink("/" + location.pathname.split("/")[1]);
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
              <li key={i} onClick={() => setActiveLink(link.name)}>
                {React.createElement(link.icon.type, {
                  active: activeLink === link.name,
                })}
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
              <Avatar size="28px" dest={user?.avatarDest} />
            </li>
          </ul>
          <SideBarSettings />
        </div>
      </div>
      {activeModal === "add" && <UploadModal onClose={closeModal} />}
    </>
  );
};
