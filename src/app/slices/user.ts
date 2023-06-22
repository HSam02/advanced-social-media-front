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
  // saved: ISavedPost[];
  // following: IUser[];
  // followers: IUser[];
  // privateAccount: boolean;
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
  status: statusType;
  error: string | null;
};

const initialState: userStateType = {
  user: null,
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

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  try {
    if (!localStorage.getItem("token")) {
      throw new Error("No token");
    }
    const { data } = await appAxios.get<IUser>("./auth/me");
    return data;
  } catch (error) {
    console.error(error);
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
          state.user = action.payload || null;
          state.status = "fulfilled";
        }
      );
  },
});

export const { logout, updateAvatar, changePostsCount } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
