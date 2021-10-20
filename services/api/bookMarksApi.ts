import ReaderApi from "../ReaderApi";

export default class BookMarksApi {
  static async addBookMarkForUser(payload: {
    category: string;
    mangaId: number;
    userId: number;
  }) {
    return ReaderApi.post("/marks/add", payload);
  }
  static async getAllBookMarksForUser(id: string | string[] | undefined) {
    return ReaderApi.get("/marks/" + id);
  }
  static async updateBookMark(payload: {
    category: string;
    mangaId: number;
    userId: number;
  }) {
    return ReaderApi.patch("/marks/change", payload);
  }
  static async getBookMarkForManga(
    id: string | string[] | undefined,
    userId: number
  ) {
    return ReaderApi.get("/marks/manga/" + id + "?userId=" + userId);
  }
}
