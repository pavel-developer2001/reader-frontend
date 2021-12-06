import { IUser } from "../../user/types/IUser";

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
