export interface IUser {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  updatedAt: string;
}
export interface ITag {
  createdAt: string;
  id: number;
  mangaId: number;
  name: string;
}
export interface IManga {
  ageRatingManga: string;
  createdAt: string;
  englishTitle: string;
  id: number;
  mangaCover: string;
  mangaDescription: string;
  originalTitle: string;
  statusManga: string;
  title: string;
  typeManga: string;
  updatedAt: string;
  userId: number;
  watchCount: "0";
  yearOfIssue: string;
}
export interface IGenre {
  createdAt: string;
  name: string;
  id: number;
  mangaId: number;
  updatedAt: string;
}
export interface IChapter {
  id: number;
  numberChapter: string;
  volumeChapter: string;
  titleChapter: string;
  language: string;
  countLikes: string;
  createdAt: string;
  updatedAt: string;
  mangaId: number;
  userId: number;
}
export interface IUpdateChapter {
  id: number;
  numberChapter: string;
  volumeChapter: string;
  titleChapter: string;
  language: string;
  countLikes: string;
  createdAt: string;
  updatedAt: string;
  mangaId: number;
  userId: number;
  manga: IManga;
}
export interface IImage {
  id: number;
  imageChapter: string;
  createdAt: string;
  updatedAt: string;
  chapterId: number;
  mangaId: number;
  userId: number;
  chapter: IChapter;
  manga: IManga;
}

export interface IComment {
  id: number;
  commentText: string;
  spoiler: boolean;
  countLikes: number;
  createdAt: string;
  updatedAt: string;
  mangaId: number;
  userId: number;
  user: IUser;
}
export interface IBookMark {
  category: string;
  createdAt: string;
  id: number;
  mangaId: number;
  updatedAt: string;
  userId: number;
}
export interface IRating {
  id: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  mangaId: number;
  userId: number;
}
export interface IMember {
  createdAt: string;
  id: number;
  roleInTeam: string;
  teamId: number;
  updatedAt: string;
  avatar: string;
  userId: number;
  user: IUser;
}
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
