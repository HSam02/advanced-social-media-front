import { IPost } from "./slices/posts";
import { AppThunk } from "./store";
// import {
//   ISavedPost,
//   addUserLike,
//   addUserSaved,
//   removeUserLike,
//   userEditPost,
//   // removeUserSaved,
//   userUnsave,
// } from "./slices/user";

// // export const addPost = (post: IPost): AppThunk => (dispatch) => {
// //   dispatch(userAddPost(post));
// //   //...
// // }

// export const addLike =
//   (postId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(addUserLike(postId));
//     //...
//   };

// export const removeLike =
//   (postId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(removeUserLike(postId));
//     //...
//   };

// export const addSaved =
//   (post: ISavedPost): AppThunk =>
//   (dispatch) => {
//     dispatch(addUserSaved(post));
//     //...
//   };

// export const removeSaved =
//   (postId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(userUnsave(postId));
//     //...
//   };

// export const editPost =
//   (id: string, newData: Partial<IPost>): AppThunk =>
//   (dispatch) => {
//     const newPost = {
//       _id: id,
//       ...newData
//     }
//     dispatch(userEditPost(newPost));
//     //...
//   };
