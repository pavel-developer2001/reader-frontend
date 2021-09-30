import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ChapterApi from "../../services/api/chapterApi";

export const addNewChapter = createAsyncThunk(
  "chapter/addNewChapter",
  async (payload) => {
    return await ChapterApi.createChapter(payload);
  }
);
export const getChapters = createAsyncThunk(
  "chapter/getChapters",
  async (id) => {
    return await ChapterApi.getChaptersForManga(id);
  }
);
export const getImages = createAsyncThunk("chapter/getImages ", async (id) => {
  return await ChapterApi.getImagesForChapter(id);
});
export const getUpdateChapters = createAsyncThunk(
  "chapter/getUpdateChapters",
  async () => {
    return await ChapterApi.getLaterChapters();
  }
);
const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapters: [],
    status: null,
    loading: true,
    images: [],
    updateChapter: [],
  },
  reducers: {
    setChapters(state, action) {
      state.chapters = action.payload;
      state.loading = false;
    },
    setImages(state, action) {
      state.images = action.payload;
      state.loading = false;
    },
    setUpdateChapter(state, action) {
      state.updateChapter = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => {
        state.chapters = action.payload.chapter.chapters;
        state.loading = false;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.chapters = action.payload.data;
        state.loading = false;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.images = action.payload.data;
        state.loading = false;
      })
      .addCase(getUpdateChapters.fulfilled, (state, action) => {
        state.updateChapter = action.payload.data;
        state.loading = false;
      })
      .addCase(addNewChapter.fulfilled, (state, action) => {
        state.chapters.push(action.payload);
      }),
});

export default chapterSlice.reducer;
export const { setChapters, setImages, setUpdateChapter } =
  chapterSlice.actions;
