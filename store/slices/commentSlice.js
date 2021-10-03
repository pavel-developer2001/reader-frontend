import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import CommentsApi from "../../services/api/commentsApi";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id) => {
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
  async (data) => {
    return await CommentsApi.updateCommentForManga(data.id, data.payload);
  }
);
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id) => {
    return await CommentsApi.deleteCommentForManga(id);
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    status: null,
    loading: true,
  },
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
        state.comments.push(action.payload.data);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item) => item.id != action.payload.data.id
        );
        state.comments.push(action.payload.data);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item) => item.id != action.payload.data.id
        );
      }),
});

export default commentSlice.reducer;
export const { setComments } = commentSlice.actions;
