import userSlice from "../modules/user/userSlice";
import mangaSlice from "../modules/manga/manga.slice";
import chapterSlice from "../modules/chapter/chapterSlice";
import bookMarkSlice from "../modules/bookMark/bookMarkSlice";
import ratingSlice from "../modules/rating/ratingSlice";
import commentSlice from "../modules/comment/commentSlice";
import teamSlice from "../modules/team/teamSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userSlice,
  manga: mangaSlice,
  chapter: chapterSlice,
  bookMark: bookMarkSlice,
  rating: ratingSlice,
  comment: commentSlice,
  team: teamSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
