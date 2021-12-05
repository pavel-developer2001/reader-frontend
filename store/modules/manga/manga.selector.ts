import { IGenre } from "../../../models/IGenre";
import { IManga } from "../../../models/IManga";
import { ITag } from "../../../models/ITag";
import { RootState } from "../../reducer";

export const selectManga = (state: RootState) => state.manga;

export const selectMangasData = (state: RootState): IManga[] =>
  selectManga(state).mangas;

export const selectMangaLoading = (state: RootState): boolean =>
  selectManga(state).loading;

export const selectMangaTags = (state: RootState): ITag[] =>
  selectManga(state).manga.tag;

export const selectMangaGenres = (state: RootState): IGenre[] =>
  selectManga(state).manga.genre;

export const selectMangaItem = (state: RootState) =>
  selectManga(state).manga.manga;
