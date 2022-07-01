import { IUser } from "./types/IUser";
import { RootState } from "../../reducer";

export const selectUser = (state: RootState) => state.user;

export const selectUserToken = (state: RootState): string =>
  selectUser(state).token;

export const selectUserData = (state: RootState): IUser =>
  //@ts-ignore
  selectUser(state).user;

export const selectUserLoading = (state: RootState): boolean =>
  selectUser(state).loading;
