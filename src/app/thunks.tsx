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
  (postId: string): AppThunk =>
  (dispatch) => {
    dispatch(addUserLike(postId));
    //...
  };

export const removeLike =
  (postId: string): AppThunk =>
  (dispatch) => {
    dispatch(removeUserLike(postId));
    //...
  };

export const addSaved =
  (post: ISavedPost): AppThunk =>
  (dispatch) => {
    dispatch(addUserSaved(post));
    //...
  };

export const removeSaved =
  (postId: string): AppThunk =>
  (dispatch) => {
    dispatch(userUnsave(postId));
    //...
  };
