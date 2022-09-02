import { RootState } from "../../../app/store/reducer";
import { ITeam, ITeamInvitationsForUser, ITeamsForManga, ITeamsForUser } from "../../../shared/api/reader/models";

export const selectTeam = (state: RootState) => state.team;

export const selectTeamsData = (state: RootState): ITeam[] =>
  selectTeam(state).teams;

export const selectTeamLoading = (state: RootState): boolean =>
  selectTeam(state).loading;

export const selectTeamsMangaData = (state: RootState): ITeamsForManga[] =>
  selectTeam(state).teamsManga;

export const selectTeamsUserData = (state: RootState): ITeamsForUser[] =>
  selectTeam(state).teamsUser;

export const selectTeamInvitationsData = (
  state: RootState
): ITeamInvitationsForUser[] => selectTeam(state).teamInvitations;

export const selectTeamItemData = (state: RootState): any =>
  selectTeam(state).team;

export const selectTeamsForInvitationsData = (
  state: RootState
): ITeamsForUser[] => selectTeam(state).teamsForInvitations;

export const selectTeamForInvitationsLoading = (state: RootState): boolean =>
  selectTeam(state).isLoadingForTeamInvitations;
