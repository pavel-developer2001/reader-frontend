import { RootState } from "../../../app/store/reducer";
import { IUser } from "../../../shared/api/reader/models";

export const selectUser = (state: RootState) => state.user;

export const selectUserToken = (state: RootState): string =>
  selectUser(state).token;

export const selectUserData = (state: RootState): IUser=> selectUser(state).user;

export const selectUserLoading = (state: RootState): boolean =>
  selectUser(state).loading;

export const selectUserError = (state: RootState): string =>
  selectUser(state).error;
