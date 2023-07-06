import { createContext } from "react";
import {
  AddIcon,
  ExploreIcon,
  HeartIcon,
  HouseIcon,
  MessageIcon,
  ReelsIcon,
  SearchIcon,
} from "../icons";

export const sideBarList = [
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

export const OnCloseContext = createContext<() => void>(() => {});
