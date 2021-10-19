import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import CommentsApi from "../../services/api/commentsApi";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id: number) => {
    return await CommentsApi.getAllCommentsForManga(id);
  }
);
export const addComment = createAsyncThunk(
  "comment/addComment",
  async (payload) => {
    return await CommentsApi.addCommentForManga(payload);
  }
);
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (data: { id: number; payload: any }) => {
    return await CommentsApi.updateCommentForManga(data.id, data.payload);
  }
);
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id: number) => {
    return await CommentsApi.deleteCommentForManga(id);
  }
);
interface CommentState {
  comments: any;
  status: null | string;
  loading: boolean;
}
const initialState: CommentState = {
  comments: [],
  status: null,
  loading: true,
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => {
        state.comments = action.payload.comment.comments;
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload.data);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item: any) => item.id != action.payload.data.id
        );
        state.comments.push(action.payload.data);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item: any) => item.id != action.payload.data.id
        );
      }),
});

export default commentSlice.reducer;
export const { setComments } = commentSlice.actions;
