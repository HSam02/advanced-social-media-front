import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./user";
import appAxios from "../../appAxios";
import { RootState } from "../store";

export interface IComment {
  _id: string;
  postId: string;
  text: string;
  user: IUser;
  liked: boolean;
  likesCount: number;
  repliesCount: number;
  replies: IReply[];
  // inputRef?: React.RefObject<HTMLTextAreaElement>;
  createdAt: string;
}

export interface IReply extends Omit<IComment, "repliesCount" | "replies"> {
  parentId: string;
}

export type commentsDataType = {
  postId: string;
  comments: IComment[];
  pages: number;
  commentsCount: number;
};

export type repliesDataType = {
  parentId: string;
  replies: IReply[];
  pages: number;
  commentsCount: number;
};

type initialStateType = {
  postComments: commentsDataType[];
  reply: IComment | IReply | null;
  // focusTextarea: (() => void) | null;
};

const initialState: initialStateType = {
  postComments: [],
  reply: null,
  // focusTextarea: null,
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
  { postId: string; page: number },
  { rejectValue: string }
>(
  "comments/getPostCommentsAsync",
  async ({ postId, page }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get<commentsDataType>(
        `comment/${postId}?limit=10&page=${page}`
      );
      data.comments.forEach((comment) => (comment.replies = []));
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
  { parentId: string; page: number },
  { rejectValue: string }
>(
  "comments/getCommentRepliesAsync",
  async ({ parentId, page }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get<repliesDataType>(
        `reply/${parentId}?limit=10&page=${page}`
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
    // setFocusTextarea: (state, action: PayloadAction<(() => void) | null>) => {
    //   state.focusTextarea = action.payload;
    // },
    addComment: (state, action: PayloadAction<IComment>) => {
      const newComment = action.payload;
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
          pages: 1,
        });
      }
    },
    addReply: (state, action: PayloadAction<IReply>) => {
      const newReply = action.payload;

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostCommentsAsync.fulfilled, (state, action) => {
        const commentsIndex = state.postComments.findIndex(
          (comment) => comment.postId === action.payload.postId
        );
        if (commentsIndex === -1) {
          state.postComments.push(action.payload);
        } else {
          state.postComments[commentsIndex]! = {
            ...action.payload,
            comments: [
              ...state.postComments[commentsIndex]!.comments,
              ...action.payload.comments,
            ],
          };
        }
      })
      .addCase(getCommentRepliesAsync.fulfilled, (state, action) => {
        const { parentId, replies } = action.payload;
        const comment = findCommentOrReplyById(
          parentId,
          state.postComments
        ) as IComment;
        if (comment) {
          comment.replies.push(...replies);
        }
      });
  },
});

export const {
  setReply,
  clearReply,
  // setFocusTextarea,
  addComment,
  addReply,
  addLike,
  removeLike,
  removeComment,
} = commentsSlice.actions;

export const selectReply = (state: RootState) => state.comments.reply;
// export const selectTextareaRef = (state: RootState) =>
//   state.comments.focusTextarea;
export const selectPostComments = (postId: string) => (state: RootState) =>
  state.comments.postComments.find((comment) => comment.postId === postId);

export default commentsSlice.reducer;
