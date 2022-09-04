import { RootState } from "../../../app/store/reducer";
import { IComment } from "../../../shared/api/reader/models";


export const selectComment = (state: RootState) => state.comment;

export const selectCommentsData = (state: RootState): IComment[] =>
  selectComment(state).comments;

export const selectCommentLoading = (state: RootState): boolean =>
  selectComment(state).loading;
