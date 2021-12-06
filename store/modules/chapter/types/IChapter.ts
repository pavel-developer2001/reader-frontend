import { IManga } from "../../manga/types/IManga";
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
