export interface ITeam {
  createdAt: string;
  id: number;
  teamCover: string;
  teamDescription: string;
  teamName: string;
  teamRank: string;
  teamSubtitle: string;
  updatedAt: string;
}

export interface ITeamsForUser {
  createdAt: string;
  id: number;
  roleInTeam: string;
  team: ITeam;
  teamId: number;
  updatedAt: string;
  userId: number;
}

export interface ITeamsForManga {
  createdAt: string;
  id: number;
  mangaId: number;
  team: ITeam;
  teamId: number;
  updatedAt: string;
}

export interface ITeamInvitationsForUser {
  id: number;
  rank: string;
  createdAt: string;
  updatedAt: string;
  teamId: number;
  userId: number;
  team: ITeam;
}
