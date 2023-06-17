import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "./user";
import { getFormattedTime } from "../../utils/getTimeAgo";
import appAxios from "../../appAxios";

export interface IComment {
  _id: string;
  postId: string;
  text: string;
  user: IUser;
  liked: boolean;
  likesCount: number;
  repliesCount: number;
  replies: IReply[];
  repliesStatus: "loading" | "idle" | "error";
  createdAt: string;
  updatedAt: string;
}

export interface IReply extends Omit<IComment, "repliesCount" | "replies"> {
  parentId: string;
}

export type commentsDataType = {
  postId: string;
  comments: IComment[];
  commentsCount: number;
  status: "loading" | "idle" | "error";
};

export type repliesDataType = {
  parentId: string;
  replies: IReply[];
  repliesCount: number;
};

type initialStateType = {
  postComments: commentsDataType[];
  reply: IComment | IReply | null;
};

const initialState: initialStateType = {
  postComments: [],
  reply: null,
};

const findCommentOrReplyById = (id: string, data: commentsDataType[]) => {
  for (const commentsData of data) {
    const { comments } = commentsData;

    const comment = comments.find((comment) => comment._id === id);
    if (comment) {
      return comment;
    }

    for (const comment of comments) {
      const { replies } = comment;
      const reply = replies.find((reply) => reply._id === id);
      if (reply) {
        return reply;
      }
    }
  }

  return null;
};

export const getPostCommentsAsync = createAsyncThunk<
  commentsDataType,
  string,
  { rejectValue: string }
>(
  "comments/getPostCommentsAsync",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const lastId = (getState() as RootState).comments.postComments
        .find((comment) => comment.postId === postId)
        ?.comments.at(-1)?._id;
      const { data } = await appAxios.get<commentsDataType>(
        `comment/${postId}?limit=15${lastId ? `&lastId=${lastId}` : ""}`
      );
      data.comments.forEach((comment) => {
        comment.replies = [];
        comment.repliesStatus = "idle";
        comment.createdAt = getFormattedTime(comment.createdAt);
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error.response?.data.message || error.message || ""
      );
    }
  }
);

export const getCommentRepliesAsync = createAsyncThunk<
  repliesDataType,
  string,
  { rejectValue: string }
>(
  "comments/getCommentRepliesAsync",
  async (parentId, { rejectWithValue, getState }) => {
    try {
      const lastId = (
        findCommentOrReplyById(
          parentId,
          (getState() as RootState).comments.postComments
        ) as IComment
      )?.replies[0]?._id;
      const { data } = await appAxios.get<repliesDataType>(
        `reply/${parentId}?limit=9${lastId ? `&lastId=${lastId}` : ""}`
      );
      data.replies.forEach((replie) => {
        replie.createdAt = getFormattedTime(replie.createdAt);
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error.response?.data.message || error.message || ""
      );
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setReply: (state, action: PayloadAction<IComment | IReply>) => {
      state.reply = action.payload;
    },
    clearReply: (state) => {
      state.reply = null;
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      const newComment = {
        ...action.payload,
        createdAt: getFormattedTime(action.payload.createdAt),
      };
      const { postId } = newComment;

      const postIndex = state.postComments.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        state.postComments[postIndex].comments.unshift(newComment);
        state.postComments[postIndex].commentsCount++;
      } else {
        state.postComments.push({
          postId,
          comments: [newComment],
          commentsCount: 1,
          status: "idle",
        });
      }
    },
    addReply: (state, action: PayloadAction<IReply>) => {
      const newReply = {
        ...action.payload,
        createdAt: getFormattedTime(action.payload.createdAt),
      };

      const postIndex = state.postComments.findIndex(
        (post) => post.postId === newReply.postId
      );

      if (postIndex !== -1) {
        const commentIndex = state.postComments[postIndex].comments.findIndex(
          (comment) => comment._id === newReply.parentId
        );

        if (commentIndex !== -1) {
          state.postComments[postIndex].comments[commentIndex].replies.push(
            newReply
          );
          state.postComments[postIndex].comments[commentIndex].repliesCount++;
        }
      }

      state.reply = null;
    },
    addLike: (state, action: PayloadAction<string>) => {
      const comment = findCommentOrReplyById(
        action.payload,
        state.postComments
      );
      if (comment) {
        comment.liked = true;
        comment.likesCount++;
      }
    },
    removeLike: (state, action: PayloadAction<string>) => {
      const comment = findCommentOrReplyById(
        action.payload,
        state.postComments
      );
      if (comment) {
        comment.liked = false;
        comment.likesCount--;
      }
    },
    removeComment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      for (const commentsData of state.postComments) {
        const { comments } = commentsData;

        const commentIndex = comments.findIndex(
          (comment) => comment._id === id
        );
        if (commentIndex !== -1) {
          comments.splice(commentIndex, 1);
          commentsData.commentsCount--;
          return;
        }

        for (const comment of comments) {
          const { replies } = comment;
          const replyIndex = replies.findIndex((reply) => reply._id === id);
          if (replyIndex !== -1) {
            replies.splice(replyIndex, 1);
            comment.repliesCount--;
            return;
          }
        }
      }
    },
    updateAvatarComments: (
      state,
      action: PayloadAction<{ avatarDest: string; userId?: string }>
    ) => {
      const { avatarDest, userId } = action.payload;
      state.postComments.forEach((postComment) => {
        postComment.comments.forEach((comment) => {
          if (comment.user._id === userId) {
            comment.user.avatarDest = avatarDest;
          }
          comment.replies.forEach((reply) => {
            if (reply.user._id === userId) {
              reply.user.avatarDest = avatarDest;
            }
          });
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostCommentsAsync.fulfilled, (state, action) => {
        const commentsIndex = state.postComments.findIndex(
          (comment) => comment.postId === action.payload.postId
        );
        // if (commentsIndex === -1) {
        //   state.postComments.push({ ...action.payload, status: "idle" });
        // } else {
        state.postComments[commentsIndex]! = {
          ...action.payload,
          comments: [
            ...state.postComments[commentsIndex]!.comments,
            ...action.payload.comments,
          ],
          status: "idle",
        };
        // }
      })
      .addCase(getPostCommentsAsync.pending, (state, action) => {
        const postId = action.meta.arg;
        const postComments = state.postComments.find(
          (comments) => comments.postId === postId
        );
        if (postComments) {
          postComments.status = "loading";
        } else {
          state.postComments.push({
            postId,
            comments: [],
            commentsCount: 0,
            status: "loading",
          });
        }
      })
      .addCase(getCommentRepliesAsync.fulfilled, (state, action) => {
        const { parentId, replies } = action.payload;
        const comment = findCommentOrReplyById(
          parentId,
          state.postComments
        ) as IComment;
        if (comment) {
          comment.repliesStatus = "idle";
          if (!replies.length) {
            comment.repliesCount = comment.replies.length;
            return;
          }
          comment.replies.unshift(...replies);
        }
      })
      .addCase(getCommentRepliesAsync.pending, (state, action) => {
        const postId = action.meta.arg;
        const comment = findCommentOrReplyById(
          postId,
          state.postComments
        ) as IComment | null;
        if (comment) {
          comment.repliesStatus = "loading";
        }
      })
      .addCase(getPostCommentsAsync.rejected, (state, action) => {
        const postId = action.meta.arg;
        const postComments = state.postComments.find(
          (comments) => comments.postId === postId
        );
        if (postComments) {
          postComments.status = "error";
        }
      })
      .addCase(getCommentRepliesAsync.rejected, (state, action) => {
        const postId = action.meta.arg;
        const comment = findCommentOrReplyById(
          postId,
          state.postComments
        ) as IComment | null;
        if (comment) {
          comment.repliesStatus = "error";
        }
      });
  },
});

export const {
  setReply,
  clearReply,
  addComment,
  addReply,
  addLike,
  removeLike,
  removeComment,
  updateAvatarComments,
} = commentsSlice.actions;

export const selectReply = (state: RootState) => state.comments.reply;
export const selectPostComments = (postId: string) => (state: RootState) =>
  state.comments.postComments.find((comment) => comment.postId === postId);

export default commentsSlice.reducer;
