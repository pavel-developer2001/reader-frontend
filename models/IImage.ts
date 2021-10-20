import { IChapter } from "./IChapter";
import { IManga } from "./IManga";

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
