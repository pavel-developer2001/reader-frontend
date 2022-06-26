import { IRating } from "./types/IRating";
import { RootState } from "../../reducer";

export const selectRating = (state: RootState) => state.rating;

export const selectRatingItemData = (state: RootState): IRating[] =>
  selectRating(state).rating;

export const selectRatingLoading = (state: RootState): boolean =>
  selectRating(state).loading;

export const selectRatingCountLoading = (state: RootState): boolean =>
  selectRating(state).isLoadingForRating;

export const selectRatingCount = (state: RootState) =>
  selectRating(state).count;
