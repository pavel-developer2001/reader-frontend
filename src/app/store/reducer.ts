import { combineReducers } from "redux"
import bookMarkSlice from "../../entities/bookmark/model/bookMark.slice"
import chapterSlice from "../../entities/chapter/model/chapter.slice"
import commentSlice from "../../entities/comment/model/comment.slice"
import mangaSlice from "../../entities/manga/model/manga.slice"
import ratingSlice from "../../entities/rating/model/rating.slice"
import teamSlice from "../../entities/team/model/team.slice"
import userSlice from "../../entities/user/model/user.slice"

export const rootReducer = combineReducers({
  user: userSlice,
  manga: mangaSlice,
  chapter: chapterSlice,
  bookMark: bookMarkSlice,
  rating: ratingSlice,
  comment: commentSlice,
  team: teamSlice,
})

export type RootState = ReturnType<typeof rootReducer>
