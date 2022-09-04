import {
  IChapter,
  IManga,
  IMember,
  ITeam,
  ITeamInvitationsForUser,
  ITeamsForManga,
  ITeamsForUser,
} from "../../../shared/api/reader/models";

export type MangasType = {
  createdAt: string;
  id: number;
  manga: IManga;
  team: ITeam;
  updatedAt: string;
};
export type ChapterTeamType = {
  chapter: IChapter;
  createdAt: string;
  id: number;
  manga: IManga;
  team: ITeam;
  updatedAt: string;
};
export interface TeamItems {
  team: ITeam;
  members: IMember[];
  mangas: MangasType[];
  chapters: ChapterTeamType[];
}
export interface TeamState {
  teams: ITeam[];
  team: TeamItems;
  teamsUser: ITeamsForUser[];
  teamsManga: ITeamsForManga[];
  teamInvitations: ITeamInvitationsForUser[];
  status: null;
  loading: boolean;
  teamsForInvitations: ITeamsForUser[];
  isLoadingForTeamInvitations: boolean;
}
