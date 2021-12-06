import { IChapter, IUpdateChapter } from "./types/IChapter";
import { IImage } from "./types/IImage";
import { RootState } from "../../reducer";

export const selectChapter = (state: RootState) => state.chapter;

export const selectChapterLoading = (state: RootState): boolean =>
  selectChapter(state).loading;

export const selectUpdateChapterData = (state: RootState): IUpdateChapter[] =>
  selectChapter(state).updateChapter;

export const selectChaptersData = (state: RootState): IChapter[] =>
  selectChapter(state).chapters;

export const selectChapterImagesData = (state: RootState): IImage[] =>
  selectChapter(state).images;
