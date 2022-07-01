import { IGenre } from "./types/IGenre";
import { IManga } from "./types/IManga";
import { ITag } from "./types/ITag";
import { RootState } from "../../reducer";

export const selectManga = (state: RootState) => state.manga;

export const selectMangasData = (state: RootState): IManga[] =>
  selectManga(state).mangas;

export const selectMangaLoading = (state: RootState): boolean =>
  selectManga(state).loading;

export const selectMangaItem = (state: RootState) => selectManga(state).manga;

export const selectSearchListManga = (state: RootState) =>
  selectManga(state).searchMangas;

export const selectSearchLoading = (state: RootState): boolean =>
  selectManga(state).isSearchLoading;
