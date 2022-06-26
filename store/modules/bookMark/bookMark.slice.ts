import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IBookMark } from "./types/IBookMark";
import BookMarksApi from "../../../services/api/bookMarksApi";

export const addBookMark = createAsyncThunk(
  "bookMark/addBookMark",
  async (payload: { category: string; mangaId: number }) => {
    return await BookMarksApi.addBookMarkForUser(payload);
  }
);
export const updateBookMark = createAsyncThunk(
  "bookMark/updateBookMark",
  async (payload: { category: string; mangaId: number }) => {
    return await BookMarksApi.updateBookMark(payload);
  }
);
export const getBookMarks = createAsyncThunk(
  "bookMark/getBookMarks",
  async (id: string | string[] | undefined) => {
    return await BookMarksApi.getAllBookMarksForUser(id);
  }
);
export const getBookMarkToManga = createAsyncThunk(
  "bookMark/getBookMarkToManga",
  async (dataManga: { mangaId: string | string[] | undefined }) => {
    return await BookMarksApi.getBookMarkForManga(dataManga.mangaId);
  }
);
export const getBookMarkCountToManga = createAsyncThunk(
  "bookMark/getBookMarkCountToManga",
  async (id: string | string[] | undefined) => {
    return await BookMarksApi.getBookMarkCountForManga(id);
  }
);

interface BookMarkState {
  bookMarks: IBookMark[];
  bookMark: null;
  status: null | string;
  loading: boolean;
  count: number;
  isLoadingForCount: boolean;
}
const initialState: BookMarkState = {
  bookMarks: [],
  bookMark: null,
  count: 0,
  isLoadingForCount: true,
  status: null,
  loading: true,
};
const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    //@ts-ignore
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.bookMarks = action.payload.bookMark.bookMarks;
        state.loading = false;
      })
      .addCase(addBookMark.fulfilled, (state, action) => {
        if (action.payload.data.category == "Удалить из закладок") {
          return (state.bookMarks = state.bookMarks.filter(
            (item) => item.id !== action.payload.data.id
          ));
        }
        state.bookMarks.push(action.payload.data);
      })
      .addCase(updateBookMark.fulfilled, (state, action) => {
        state.bookMarks = state.bookMarks.filter(
          (item) => item.id != action.payload.data.id
        );
        state.bookMarks.push(action.payload.data);
      })
      .addCase(getBookMarks.fulfilled, (state, action) => {
        state.bookMarks = action.payload.data;
        state.loading = false;
      })
      .addCase(getBookMarkToManga.fulfilled, (state, action) => {
        state.bookMark = action.payload.data;
        state.loading = false;
      })
      .addCase(getBookMarkCountToManga.fulfilled, (state, action) => {
        state.count = action.payload.data;
        state.isLoadingForCount = false;
      }),
});

export default bookMarkSlice.reducer;
