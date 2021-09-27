import userSlice from "../slices/userSlice";
import mangaSlice from "../slices/mangaSlice";
import chapterSlice from "../slices/chapterSlice";
import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

export const rootReducer = combineReducers({
  user: userSlice,
  manga: mangaSlice,
  chapter: chapterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
