import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import appAxios from "../../appAxios";
import { loginDataType } from "../../pages/Login";
import { registerDataType } from "../../pages/Register";
import { RootState } from "../store";
import { IPost } from "./posts";

export interface ISavedPost extends IPost {
  deleted?: boolean;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  fullname?: string;
  bio?: string;
  avatarDest?: string;
  postsCount: number;
  privateAccount: boolean;
  followData: {
    followed?: boolean;
    following?: boolean;
    followersCount: number;
    followingCount: number;
    status: "idle" | "loading";
  };
  // following: IUser[];
  // followers: IUser[];
  // chats: [];
}

type statusType =
  | "idle"
  | "loading"
  | "failed"
  | "loading:access"
  | "fulfilled";

// export type errorType = {
//   message?: string;
//   response?: {
//     data: {
//       message?: string;
//     };
//   };
// };

type userStateType = {
  user: IUser | null;
  otherUser: {
    user: IUser | null;
    status: "loading" | "idle";
  };
  status: statusType;
  error: string | null;
};

const initialState: userStateType = {
  user: null,
  otherUser: {
    user: null,
    status: "idle",
  },
  status: "idle",
  error: null,
};

export const registerAsync = createAsyncThunk<
  IUser,
  registerDataType,
  { rejectValue: string }
>("user/register", async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post<{ user: IUser; token: string }>(
      "/auth/register",
      reqData
    );
    localStorage.setItem("token", data.token);
    data.user.followData = {
      followersCount: 0,
      followingCount: 0,
      status: "idle",
    };
    return data.user;
  } catch (error: any) {
    // problem??
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const loginAsync = createAsyncThunk<
  IUser,
  loginDataType,
  { rejectValue: string }
>("user/login", async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post<{ user: IUser; token: string }>(
      "/auth/login",
      reqData
    );
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error: any) {
    // problem??
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const getUserAsync = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>("user/getUser", async (_, { rejectWithValue }) => {
  try {
    if (!localStorage.getItem("token")) {
      throw new Error("No token");
    }
    const { data } = await appAxios.get<IUser>("/user");
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const getOtherUserAsync = createAsyncThunk<
  IUser,
  string,
  { rejectValue: string }
>("user/getOtherUser", async (username, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get<IUser>("/user/" + username);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const followUserAsync = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("user/followUser", async (_, { rejectWithValue, getState }) => {
  try {
    await appAxios.post(
      "/follow/" + (getState() as RootState).user.otherUser.user?._id
    );
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const unfollowUserAsync = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("user/unfollowUser", async (_, { rejectWithValue, getState }) => {
  try {
    await appAxios.delete(
      "/follow/" + (getState() as RootState).user.otherUser.user?._id
    );
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || error.message || "");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.status = "fulfilled";
      localStorage.removeItem("token");
    },
    clearOtherUser: (state) => {
      state.otherUser = {
        user: null,
        status: "idle",
      };
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatarDest = action.payload;
      }
    },
    changePostsCount: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.postsCount += action.payload;
      }
    },
    changeFollowingCount: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.followData.followingCount += action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.rejected, (state) => {
        state.user = null;
        state.error = "No Authorized";
        state.status = "failed";
      })
      .addCase(getUserAsync.pending, (state) => {
        state.user = null;
        state.error = null;
        state.status = "loading:access";
      })
      .addCase(getOtherUserAsync.pending, (state) => {
        state.otherUser.user = null;
        state.otherUser.status = "loading";
      })
      .addCase(getOtherUserAsync.fulfilled, (state, action) => {
        state.otherUser.user = action.payload;
        state.otherUser.status = "idle";
        state.otherUser.user.followData.status = "idle";
      })
      .addCase(getOtherUserAsync.rejected, (state) => {
        state.otherUser.status = "idle";
      })
      .addCase(followUserAsync.fulfilled, (state) => {
        if (state.otherUser.user && state.user) {
          state.otherUser.user.followData.followed = true;
          state.otherUser.user.followData.followersCount++;
          state.user.followData.followingCount++;
          state.otherUser.user.followData.status = "idle";
        }
      })
      .addCase(unfollowUserAsync.fulfilled, (state) => {
        if (state.otherUser.user && state.user) {
          state.otherUser.user.followData.followed = false;
          state.otherUser.user.followData.followersCount--;
          state.user.followData.followingCount--;
          state.otherUser.user.followData.status = "idle";
        }
      })
      .addMatcher(isPending(followUserAsync, unfollowUserAsync), (state) => {
        if (state.otherUser.user) {
          state.otherUser.user.followData.status = "loading";
        }
      })
      .addMatcher(isRejected(followUserAsync, unfollowUserAsync), (state) => {
        if (state.otherUser.user) {
          state.otherUser.user.followData.status = "idle";
        }
      })
      .addMatcher(isPending(registerAsync, loginAsync), (state) => {
        state.user = null;
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        isRejected(registerAsync, loginAsync),
        (state, { payload }) => {
          state.user = null;
          state.status = "failed";
          state.error = payload || null;
        }
      )
      .addMatcher(
        isFulfilled(registerAsync, loginAsync, getUserAsync),
        (state, action) => {
          state.user = action.payload;
          state.status = "fulfilled";
        }
      );
  },
});

export const {
  logout,
  updateAvatar,
  changePostsCount,
  clearOtherUser,
  changeFollowingCount,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserId = (state: RootState) => state.user.user?._id;
export const selectOtherUser = (state: RootState) => state.user.otherUser;

export default userSlice.reducer;
