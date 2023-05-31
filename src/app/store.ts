import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import postsReducer from "./slices/posts";
import commentsReducer from "./slices/comments";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
