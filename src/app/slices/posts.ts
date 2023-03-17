import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./user";
import appAxios from "../../appAxios";
import { AppThunk, RootState } from "../store";

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
  user: IUser;
  hideComments: boolean;
  hideLikes: boolean;
  likes: string[];
  saves: number;
  saved: boolean;
  liked: boolean;
  // comments: [];
}

type initialStateType = {
  userPosts: IPost[];
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: initialStateType = {
  userPosts: [],
  status: "idle",
  error: null,
};

// export const getUserPostsAsync = createAsyncThunk(
//   "posts/getUserPostsAsync",
//   async () => {
//     try {
//       const { data } = await appAxios.get<IPost[]>("/user/posts");
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // setUserPosts: (state, action: PayloadAction<IPost[]>) => {
    //   state.userPosts = action.payload;
    // },
    // postsAddPost: (state, action: PayloadAction<IPost>) => {
    //   if (state.userPosts) {
    //     state.userPosts.unshift(action.payload);
    //   }
    // },
    // addLike: (
    //   state,
    //   action: PayloadAction<{ postId: string; userId: string }>
    // ) => {
    //   const { postId, userId } = action.payload;
    //   state.userPosts.find(
    //     (post) => post._id === postId && post.likes.unshift(userId)
    //   );
    // },
    // removeLike: (
    //   state,
    //   action: PayloadAction<{ postId: string; userId: string }>
    // ) => {
    //   const { postId, userId } = action.payload;
    //   state.userPosts.find((post) => {
    //     if (post._id === postId) {
    //       post.likes = post.likes.filter((user) => user !== userId);
    //       return true;
    //     }
    //     return false;
    //   });
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(getUserPostsAsync.fulfilled, (state, action) => {
    //   state.userPosts = action.payload || [];
    // });
  },
});

// export const { setUserPosts, addLike, removeLike, postsAddPost } =
//   PostsSlice.actions;

// export const selectPosts = (state: RootState) => state.posts;

// export const addPost =
//   (post: IPost): AppThunk =>
//   async (dispatch, getState) => {
//     dispatch(postsAddPost(post));
//   };

export default PostsSlice.reducer;
