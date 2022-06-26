import { IBookMark } from "./types/IBookMark";
import { RootState } from "../../reducer";

export const selectBookMark = (state: RootState) => state.bookMark;

export const selectBookMarkItemData = (state: RootState): any =>
  selectBookMark(state).bookMark;

export const selectBookMarkLoading = (state: RootState): boolean =>
  selectBookMark(state).loading;

export const selectBookMarksData = (state: RootState): IBookMark[] =>
  selectBookMark(state).bookMarks;

export const selectBookMarkCount = (state: RootState): number =>
  selectBookMark(state).count;

export const selectBookMarkLoadingForCount = (state: RootState): boolean =>
  selectBookMark(state).isLoadingForCount;
