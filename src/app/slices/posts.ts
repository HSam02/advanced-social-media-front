import { IUser } from "./user";

export type mediaType = {
  dest: string;
  type: "video" | "image";
  styles: {
    transform: string;
  };
};

export interface IPost {
  _id: string;
  text: string;
  aspect: number;
  media: mediaType[];
  readonly user: IUser;
  hideComments: boolean;
  hideLikes: boolean;
  // likes: [];
  // comments: [];
}
