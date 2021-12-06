import { IBookMark } from "./types/IBookMark";
import { RootState } from "../../reducer";

export const selectBookMark = (state: RootState) => state.bookMark;

export const selectBookMarkItemData = (state: RootState): any =>
  selectBookMark(state).bookMark;

export const selectBookMarkLoading = (state: RootState): boolean =>
  selectBookMark(state).loading;

export const selectBookMarksData = (state: RootState): IBookMark[] =>
  selectBookMark(state).bookMarks;
