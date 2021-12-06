import userSlice from "../modules/user/user.slice";
import mangaSlice from "../modules/manga/manga.slice";
import chapterSlice from "../modules/chapter/chapter.slice";
import bookMarkSlice from "../modules/bookMark/bookMark.slice";
import ratingSlice from "../modules/rating/rating.slice";
import commentSlice from "../modules/comment/comment.slice";
import teamSlice from "../modules/team/team.slice";
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
