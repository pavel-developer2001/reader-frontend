import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import ChapterApi from "../../../shared/api/reader/apis/chapterApi";
import {
  IChapter,
  IImage,
  IUpdateChapter,
} from "../../../shared/api/reader/models";

export const addNewChapter = createAsyncThunk(
  "chapter/addNewChapter",
  async (payload: FormData) => {
    return await ChapterApi.createChapter(payload);
  }
);
export const getChapters = createAsyncThunk(
  "chapter/getChapters",
  async (id: string | string[], thunkApi) => {
    try {
      return await ChapterApi.getChaptersForManga(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getImages = createAsyncThunk(
  "chapter/getImages ",
  async (id: string | string[] | undefined, thunkApi) => {
    try {
      return await ChapterApi.getImagesForChapter(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getUpdateChapters = createAsyncThunk(
  "chapter/getUpdateChapters",
  async (_, thunkApi) => {
    try {
      return await ChapterApi.getLaterChapters();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
interface ChapterState {
  chapters: IChapter[];
  loading: boolean;
  images: IImage[];
  updateChapter: IUpdateChapter[];
  error: string;
}
const initialState: ChapterState = {
  chapters: [],
  loading: true,
  images: [],
  updateChapter: [],
  error: "",
};
const chapterSlice = createSlice({
  name: "chapter",
  initialState,
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
      .addCase(HYDRATE, (state, action: any) => {
        state.chapters = action.payload.chapter.chapters;
        state.images = action.payload.chapter.images;
        state.loading = false;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.chapters = action.payload.data;
        state.loading = false;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.error = (action.payload as any).message;
        state.loading = false;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.images = action.payload.data;
        state.loading = false;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.error = (action.payload as any).message;
        state.loading = false;
      })
      .addCase(getUpdateChapters.fulfilled, (state, action) => {
        state.updateChapter = action.payload.data;
        state.loading = false;
      })
      .addCase(getUpdateChapters.rejected, (state, action) => {
        state.error = (action.payload as any).message;
        state.loading = false;
      })
      .addCase(addNewChapter.fulfilled, (state, action: any) => {
        state.chapters.push(action.payload);
      }),
});

export default chapterSlice.reducer;
export const { setChapters, setImages, setUpdateChapter } =
  chapterSlice.actions;
