import { Point } from "react-easy-crop";

export type cropMediaType = {
  type: "image" | "video";
  url: string;
  file: File;
  styles: {
    transform: string;
  };
  crop: Point;
  zoom: number;
};

export type postInfoType = {
  text: string;
  hideComments: boolean;
  hideLikes: boolean;
};

export type activeModalType = "delete" | "cancel" | "close";

export type uploadStatusType = "idle" | "Sharing" | "Post shared";

export type activeIconButtonType = "crop" | "zoom" | "gallery";