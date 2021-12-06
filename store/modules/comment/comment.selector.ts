import { IComment } from "./types/IComment";
import { RootState } from "../../reducer";

export const selectComment = (state: RootState) => state.comment;

export const selectCommentsData = (state: RootState): IComment[] =>
  selectComment(state).comments;

export const selectCommentLoading = (state: RootState): boolean =>
  selectComment(state).loading;
