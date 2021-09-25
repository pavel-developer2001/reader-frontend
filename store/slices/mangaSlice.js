import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import MangaApi from "../../services/api/mangaApi";

export const addNewManga = createAsyncThunk(
  "manga/addNewManga",
  async (payload) => {
    return await MangaApi.createManga(payload);
  }
);
export const getMangas = createAsyncThunk("manga/getMangas", async () => {
  return await MangaApi.getAllManga();
});
export const getManga = createAsyncThunk("manga/getManga", async (id) => {
  return await MangaApi.getManga(id);
});
const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    mangas: [],
    manga: [],
    status: null,
    loading: true,
  },
  reducers: {
    setMangas(state, action) {
      state.mangas = action.payload;
      state.loading = false;
    },
    setManga(state, action) {
      state.manga = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => {
        state.mangas = action.payload.manga.mangas;
        state.loading = false;
      })
      .addCase(addNewManga.fulfilled, (state, action) => {
        state.mangas.push(action.payload);
      })
      .addCase(getMangas.fulfilled, (state, action) => {
        state.mangas = action.payload.data;
        state.loading = false;
      })
      .addCase(getManga.fulfilled, (state, action) => {
        state.manga = action.payload.data;
        state.loading = false;
      }),
});

export default mangaSlice.reducer;
export const { setMangas, setManga } = mangaSlice.actions;
