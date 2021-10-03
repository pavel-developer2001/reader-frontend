import userSlice from "../slices/userSlice";
import mangaSlice from "../slices/mangaSlice";
import chapterSlice from "../slices/chapterSlice";
import bookMarkSlice from "../slices/bookMarkSlice";
import ratingSlice from "../slices/ratingSlice";
import commentSlice from "../slices/commentSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userSlice,
  manga: mangaSlice,
  chapter: chapterSlice,
  bookMark: bookMarkSlice,
  rating: ratingSlice,
  comment: commentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
