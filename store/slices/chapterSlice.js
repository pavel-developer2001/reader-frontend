import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ChapterApi from "../../services/api/chapterApi";

export const addNewChapter = createAsyncThunk(
  "chapter/addNewChapter",
  async (payload) => {
    return await ChapterApi.createChapter(payload);
  }
);
const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapters: [],
    status: null,
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) =>
    builder.addCase(addNewChapter.fulfilled, (state, action) => {
      state.chapters.push(action.payload);
    }),
});

export default chapterSlice.reducer;
export const {} = chapterSlice.actions;
