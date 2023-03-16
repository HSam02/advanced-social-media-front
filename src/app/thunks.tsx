import { IPost } from "./slices/posts";
import {
  ISavedPost,
  addUserLike,
  addUserSaved,
  removeUserLike,
  // removeUserSaved,
  userUnsave,
} from "./slices/user";
import { AppThunk } from "./store";

// export const addPost = (post: IPost): AppThunk => (dispatch) => {
//   dispatch(userAddPost(post));
//   //...
// }

export const addLike =
  (postId: string, userId: string): AppThunk =>
  (dispatch) => {
    dispatch(addUserLike({ postId, userId }));
    //...
  };

export const removeLike =
  (postId: string, userId: string): AppThunk =>
  (dispatch) => {
    dispatch(removeUserLike({ postId, userId }));
    //...
  };

export const addSaved =
  (post: ISavedPost, userId: string): AppThunk =>
  (dispatch) => {
    dispatch(addUserSaved(post));
    //...
  };

export const removeSaved =
  (postId: string, userId: string): AppThunk =>
  (dispatch) => {
    dispatch(userUnsave(postId));
    //...
  };
