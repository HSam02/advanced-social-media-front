import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./user";
import appAxios from "../../appAxios";

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

type initialStateType = {
  posts: IPost[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: initialStateType = {
  posts: null,
  status: "idle",
  error: null,
};

export const getUserPostsAsync = createAsyncThunk(
  "posts/getUserPostsAsync",
  async () => {
    try {
      const { data } = await appAxios.get<IPost>("/posts");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default PostsSlice.reducer;
