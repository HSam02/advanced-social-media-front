import {
  IComment,
  IReply,
  addComment,
  addReply,
  removeComment,
  updateAvatarComments,
} from "./slices/comments";
import {
  IPost,
  addPost,
  changeCommentsCount,
  deletePost,
  updateAvatarPosts,
} from "./slices/posts";
import { changePostsCount, updateAvatar } from "./slices/user";
import { AppThunk } from "./store";

export const addPostComment =
  (newComment: IComment): AppThunk =>
  (dispatch) => {
    dispatch(addComment(newComment));
    dispatch(changeCommentsCount({ postId: newComment.postId, operation: 1 }));
  };

export const addCommentReply =
  (newReply: IReply): AppThunk =>
  (dispatch) => {
    dispatch(addReply(newReply));
    dispatch(changeCommentsCount({ postId: newReply.postId, operation: 1 }));
  };

export const removeCommentOrReply = //??????

    (id: string): AppThunk =>
    (dispatch, getState) => {
      const { comments } = getState();
      for (const commentsData of comments.postComments) {
        const { comments } = commentsData;

        const commentIndex = comments.findIndex(
          (comment) => comment._id === id
        );
        if (commentIndex !== -1) {
          dispatch(
            changeCommentsCount({
              postId: comments[commentIndex].postId,
              operation: -comments[commentIndex].repliesCount - 1,
            })
          );
          dispatch(removeComment(id));
          return;
        }

        for (const comment of comments) {
          const { replies } = comment;
          const replyIndex = replies.findIndex((reply) => reply._id === id);
          if (replyIndex !== -1) {
            dispatch(
              changeCommentsCount({
                postId: comments[replyIndex].postId,
                operation: -1,
              })
            );
            dispatch(removeComment(id));
            return;
          }
        }
      }
    };

export const addUserPost =
  (newPost: IPost): AppThunk =>
  (dispatch) => {
    dispatch(addPost(newPost));
    dispatch(changePostsCount(1));
  };

export const deleteUserPost =
  (postId: string): AppThunk =>
  (dispatch) => {
    dispatch(deletePost(postId));
    dispatch(changePostsCount(-1));
  };

export const updateUserAvatar =
  (avatarDest: string): AppThunk =>
  (dispatch, getState) => {
    const userId = getState().user.user?._id;
    dispatch(updateAvatar(avatarDest));
    dispatch(updateAvatarPosts(avatarDest));
    dispatch(updateAvatarComments({ avatarDest, userId }));
  };
