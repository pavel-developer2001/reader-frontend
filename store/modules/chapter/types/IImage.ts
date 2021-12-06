import { IChapter } from "./IChapter";
import { IManga } from "../../manga/types/IManga";

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
