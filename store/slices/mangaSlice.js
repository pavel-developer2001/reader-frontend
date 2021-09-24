import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import MangaApi from "../../services/api/mangaApi";

export const addNewManga = createAsyncThunk(
  "manga/addNewManga",
  async (payload) => {
    return await MangaApi.createManga(payload);
  }
);

const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    manga: [],
    status: null,
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) =>
    builder.addCase(addNewManga.fulfilled, (state, action) => {
      state.manga.push(action.payload);
    }),

  // .addCase(HYDRATE, (state, action) => {
  //   state.posts = action.payload.user.posts;
  // }),
});

export default mangaSlice.reducer;
export const {} = mangaSlice.actions;
