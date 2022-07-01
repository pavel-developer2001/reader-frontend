import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IGenre } from "./types/IGenre";
import { IManga } from "./types/IManga";
import { ITag } from "./types/ITag";
import MangaApi from "../../../services/api/mangaApi";

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
  async (id: string | string[] | undefined) => {
    return await MangaApi.getManga(id);
  }
);
export const searchManga = createAsyncThunk(
  "manga/searchManga",
  async (query: { title: string }) => {
    return await MangaApi.searchManga(query);
  }
);
interface MangaItems {
  manga: IManga[];
  genre: IGenre[];
  tag: ITag[];
}
interface MangaState {
  mangas: IManga[];
  manga: MangaItems;
  searchMangas: IManga[];
  isSearchLoading: boolean;
  status: null | string;
  loading: boolean;
}
const initialState: MangaState = {
  mangas: [],
  manga: { manga: [], genre: [], tag: [] },
  searchMangas: [],
  isSearchLoading: true,
  status: null,
  loading: true,
};
const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.mangas = action.payload.manga.mangas;
        state.manga = action.payload.manga.manga;
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
      })
      .addCase(searchManga.fulfilled, (state, action) => {
        state.searchMangas = action.payload.data;
        state.isSearchLoading = false;
      }),
});

export default mangaSlice.reducer;
