import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
} from "@reduxjs/toolkit";
import appAxios from "../../appAxios";
import { RootState } from "../store";
import { IUser } from "./user";
import { getTimeAgo } from "../../utils/getTimeAgo";

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
  commentsCount?: number;
  hideLikes: boolean;
  likes: string[];
  liked: boolean;
  saved: boolean;
  createdAt: string;
}

export type postsDataType = {
  posts?: IPost[];
  // pages: number;
  postsCount?: number;
  status: "loading" | "idle";
};

type initialStateType = {
  userPosts: postsDataType;
  savedPosts: postsDataType;
  userReels: postsDataType;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: initialStateType = {
  userPosts: {
    status: "idle",
  },
  savedPosts: {
    status: "idle",
  },
  userReels: {
    status: "idle",
  },
  status: "idle",
  error: null,
};

export const getUserPostsAsync = createAsyncThunk<
  postsDataType,
  string,
  { rejectValue: string }
>(
  "posts/getUserPostsAsync",
  async (username, { rejectWithValue, getState }) => {
    try {
      const lastId = (getState() as RootState).posts.userPosts.posts?.at(
        -1
      )?._id;

      const { data } = await appAxios.get<postsDataType>(
        `/user/posts/${username}?limit=10${lastId ? `&lastId=${lastId}` : ""}`
      );
      data.posts?.forEach(
        (post) => (post.createdAt = getTimeAgo(post.createdAt))
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error.response?.data.message || error.message || ""
      );
    }
  }
);

export const getUserReelsAsync = createAsyncThunk<
  postsDataType,
  string,
  { rejectValue: string }
>(
  "posts/getUserReelsAsync",
  async (username, { rejectWithValue, getState }) => {
    try {
      const lastId = (getState() as RootState).posts.userReels.posts?.at(
        -1
      )?._id;

      const { data } = await appAxios.get<postsDataType>(
        `/user/reels/${username}?limit=10${lastId ? `&lastId=${lastId}` : ""}`
      );

      data.posts?.forEach(
        (post) => (post.createdAt = getTimeAgo(post.createdAt))
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error.response?.data.message || error.message || ""
      );
    }
  }
);

export const getUserSavedPostsAsync = createAsyncThunk<
  postsDataType,
  undefined,
  { rejectValue: string }
>("posts/getUserSavedPostsAsync", async (_, { rejectWithValue, getState }) => {
  try {
    const lastId = (getState() as RootState).posts.savedPosts.posts?.at(
      -1
    )?._id;

    const { data } = await appAxios.get<postsDataType>(
      `/user/saved?limit=10${lastId ? `&lastId=${lastId}` : ""}`
    );

    data.posts?.forEach(
      (post) => (post.createdAt = getTimeAgo(post.createdAt))
    );
    return data;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostSlice: (state) => {
      state.userPosts = {
        status: "idle",
      };
      state.userReels = {
        status: "idle",
      };
      state.savedPosts = {
        status: "idle",
      };
      state.error = null;
      state.status = "idle";
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      const post = {
        ...action.payload,
        createdAt: getTimeAgo(action.payload.createdAt),
      };
      if (state.userPosts.posts && state.userPosts.postsCount) {
        state.userPosts.posts.unshift(post);
        state.userPosts.postsCount++;
      }
      if (
        state.userReels.posts &&
        state.userReels.postsCount &&
        post.media.length === 1 &&
        post.media[0].type === "video"
      ) {
        state.userReels.posts.unshift(post);
        state.userReels.postsCount++;
      }
    },
    addLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const { postId, userId } = action.payload;
      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) =>
        array?.find((post) => {
          if (post._id === postId) {
            post.likes && post.likes.unshift(userId);
            post.liked = true;
            return true;
          }
          return false;
        })
      );
    },
    removeLike: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const { postId, userId } = action.payload;
      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) =>
        array?.find((post) => {
          if (post._id === postId) {
            post.likes = post.likes.filter((user) => user !== userId);
            post.liked = false;
            return true;
          }
          return false;
        })
      );
    },
    editPost: (state, action: PayloadAction<Partial<IPost>>) => {
      if (!state.userPosts) {
        return;
      }
      const newData = action.payload;

      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) => {
        if (!array) {
          return;
        }
        const postId = array?.findIndex((post) => post._id === newData._id);
        if (postId !== -1) {
          array[postId] = {
            ...array[postId],
            ...newData,
          };
        }
      });
    },
    addToSaved: (state, action: PayloadAction<IPost>) => {
      if (!state.userPosts) {
        return;
      }
      const savingPost = { ...action.payload, saved: true };
      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) => {
        if (!array) {
          return;
        }
        array.find((post) => {
          if (post._id === savingPost._id) {
            post.saved = true;
            return true;
          }
          return false;
        });
      });
      if (
        !Boolean(
          state.savedPosts.posts?.find((post) => post._id === savingPost._id)
        )
      ) {
        state.savedPosts.posts?.unshift(savingPost);
      }
    },
    unsavePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) => {
        if (!array) {
          return;
        }
        array.find((post) => {
          if (post._id === postId) {
            post.saved = false;
            return true;
          }
          return false;
        });
      });
    },
    clearUnsavedPosts: (state) => {
      if (state.savedPosts.posts) {
        state.savedPosts.posts = state.savedPosts.posts.filter((post) => {
          if (post.saved) {
            state.savedPosts.postsCount && state.savedPosts.postsCount--;
            return true;
          }
          return false;
        });
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      if (state.userPosts.posts && state.userPosts.postsCount) {
        state.userPosts.posts = state.userPosts.posts.filter(
          (post) => post._id !== postId
        );
        state.userPosts.postsCount--;
      }
      if (state.savedPosts.posts && state.savedPosts.postsCount) {
        state.savedPosts.posts = state.savedPosts.posts.filter(
          (post) => post._id !== postId
        );
        state.savedPosts.postsCount--;
      }
      if (state.userReels.posts && state.userReels.postsCount) {
        state.userReels.posts = state.userReels.posts.filter(
          (post) => post._id !== postId
        );
        state.userReels.postsCount--;
      }
    },
    changeCommentsCount: (
      state,
      action: PayloadAction<{ postId: string; operation: number }>
    ) => {
      const { postId, operation } = action.payload;
      [
        state.userPosts?.posts,
        state.savedPosts?.posts,
        state.userReels?.posts,
      ].forEach((array) =>
        array?.find((post) => {
          if (post._id === postId && post.commentsCount !== undefined) {
            post.commentsCount += operation;
            return true;
          }
          return false;
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPostsAsync.fulfilled, (state, action) => {
        if (!state.userPosts.posts) {
          state.userPosts = action.payload;
        } else {
          state.userPosts = {
            ...action.payload,
            posts: [...state.userPosts.posts, ...action.payload.posts!],
          };
        }
        state.userPosts.status = "idle";
        state.status = "idle";
      })
      .addCase(getUserSavedPostsAsync.fulfilled, (state, action) => {
        if (!state.savedPosts.posts) {
          state.savedPosts = action.payload;
        } else {
          state.savedPosts = {
            ...action.payload,
            posts: [...state.savedPosts.posts, ...action.payload.posts!],
          };
        }
        state.savedPosts.status = "idle";
        state.status = "idle";
      })
      .addCase(getUserReelsAsync.fulfilled, (state, action) => {
        if (!state.userReels.posts) {
          state.userReels = action.payload;
        } else {
          state.userReels = {
            ...action.payload,
            posts: [...state.userReels.posts, ...action.payload.posts!],
          };
        }
        state.userReels.status = "idle";
        state.status = "idle";
      })
      .addCase(getUserPostsAsync.pending, (state) => {
        if (state.userPosts) {
          state.userPosts.status = "loading";
        }
      })
      .addCase(getUserReelsAsync.pending, (state) => {
        if (state.userReels) {
          state.userReels.status = "loading";
        }
      })
      .addCase(getUserSavedPostsAsync.pending, (state) => {
        if (state.savedPosts) {
          state.savedPosts.status = "loading";
        }
      })
      .addMatcher(
        isPending(getUserPostsAsync, getUserReelsAsync, getUserSavedPostsAsync),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const {
  addPost,
  addLike,
  removeLike,
  addToSaved,
  unsavePost,
  clearUnsavedPosts,
  editPost,
  deletePost,
  clearPostSlice,
  changeCommentsCount,
} = PostsSlice.actions;

export const selectUserPosts = (state: RootState) => state.posts.userPosts;
export const selectUserReels = (state: RootState) => state.posts.userReels;
export const selectUserSavedPosts = (state: RootState) =>
  state.posts.savedPosts;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export default PostsSlice.reducer;
