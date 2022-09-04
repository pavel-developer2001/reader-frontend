import { RootState } from "../../../app/store/reducer";
import {
  IChapter,
  IImage,
  IUpdateChapter,
} from "../../../shared/api/reader/models";

export const selectChapter = (state: RootState) => state.chapter;

export const selectChapterLoading = (state: RootState): boolean =>
  selectChapter(state).loading;

export const selectUpdateChapterData = (state: RootState): IUpdateChapter[] =>
  selectChapter(state).updateChapter;

export const selectChaptersData = (state: RootState): IChapter[] =>
  selectChapter(state).chapters;

export const selectChapterImagesData = (state: RootState): IImage[] =>
  selectChapter(state).images;

export const selectChapterError = (state: RootState): string=>
  selectChapter(state).error;
