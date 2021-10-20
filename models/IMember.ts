import { IUser } from "./IUser";

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
