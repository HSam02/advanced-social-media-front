import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import appAxios from "../../appAxios";
import { loginDataType } from "../../pages/Login";
import { registerDataType } from "../../pages/Register";
import { RootState } from "../store";

export type userType = {
  email: string;
  username: string;
  fullname?: string;
  avatarUrl?: string;
  // following: userType[];
  // followers: userType[];
  // privateAccount: boolean;
  // posts: [];
  // saved: [];
  // chats: [];
  // comments: [];
} | null;

export type statusType = "idle" | "loading" | "failed" | "loading:access" | "fulfilled";

export type errorType = {
  message?: string;
  response?: {
    data: {
      message?: string;
    };
  };
};

type userStateType = {
  user: userType | null;
  status: statusType;
  error: string | null;
};

const initialState: userStateType = {
  user: null,
  status: "idle",
  error: null
};

export const registerAsync = createAsyncThunk<userType, registerDataType, {rejectValue: string}>(
  "user/register",
  async (reqData, {rejectWithValue}) => {
    try {
      const { data } = await appAxios.post<{ user: userType; token: string }>(
        "/auth/register",
        reqData
      );
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error: any) { // problem??
			return rejectWithValue(error.response?.data.message || error.message || '');
    }
  }
);

export const loginAsync = createAsyncThunk<userType, loginDataType, {rejectValue: string}>(
	"user/login",
	async (reqData, {rejectWithValue}) => {
		try {
			const { data } = await appAxios.post<{ user: userType; token: string }>(
        "/auth/login",
        reqData
      );
			localStorage.setItem("token", data.token);
      return data.user;
		} catch (error: any) { // problem??
			return rejectWithValue(error.response?.data.message || error.message || '');
		}
	}
)

export const getUserAsync = createAsyncThunk(
	"user/getUser",
	async () => {
		try {
      if (!localStorage.getItem("token")) {
        throw new Error("No token");
      }
			const {data} = await appAxios.get<userType>("./auth/me");
			return data;
		} catch (error) {
			console.log(error);
		}
	}
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {      
      state.user = null;
      state.error = null;
      state.status = "fulfilled";
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.rejected, (state) => {
        state.user = null;
        state.error = 'No Authorized';
        state.status = "failed";
      })
      .addCase(getUserAsync.pending, (state) => {
        state.user = null;
        state.error = null;
        state.status = "loading:access";
      })
			.addMatcher(
				isPending(registerAsync, loginAsync), (state) => {
					state.user = null;
					state.status = "loading";
          state.error = null;
				}
			)
			.addMatcher(
				isRejected(registerAsync, loginAsync), (state, {payload}) => {
					state.user = null;
					state.status = "failed";
          state.error = payload || null;
				}
			)
			.addMatcher(
				isFulfilled(registerAsync, loginAsync, getUserAsync), (state, action) => {
					state.user = action.payload || null;
					state.status = "fulfilled";
				}
			);
  },
});

export const { logout } = userSlice.actions;

// export const logout = ():AppThunk => (dispatch) => {
//   dispatch(userSlice.actions.logout());
// }

export const selectUser = (state: RootState) => state.user;
// export const selectUserValue = (state: RootState) => state.user.user;
// export const selectUserStatus = (state: RootState) => state.user.status;
// export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;