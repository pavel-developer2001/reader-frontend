import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IGenre } from "../../models/IGenre";
import { IManga } from "../../models/IManga";
import { ITag } from "../../models/ITag";
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
export const getManga = createAsyncThunk(
  "manga/getManga",
  async (id: string) => {
    return await MangaApi.getManga(id);
  }
);
interface MangaItems {
  manga: IManga[];
  genres: IGenre[];
  tags: ITag[];
}
interface MangaState {
  mangas: IManga[];
  manga: MangaItems;
  status: null | string;
  loading: boolean;
}
const initialState: MangaState = {
  mangas: [],
  manga: { manga: [], genres: [], tags: [] },
  status: null,
  loading: true,
};
const mangaSlice = createSlice({
  name: "manga",
  initialState,
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
      .addCase(HYDRATE, (state, action: any) => {
        state.mangas = action.payload.manga.mangas;
        state.loading = false;
      })
      .addCase(addNewManga.fulfilled, (state, action: any) => {
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
