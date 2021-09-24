import userSlice from "../slices/userSlice";
import mangaSlice from "../slices/mangaSlice";
import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

export const rootReducer = combineReducers({
  user: userSlice,
  manga: mangaSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
