import ReaderApi from "../ReaderApi";

export default class BookMarksApi {
  static async addBookMarkForUser(payload: any) {
    return ReaderApi.post("/marks/add", payload);
  }
  static async getAllBookMarksForUser(id: any) {
    return ReaderApi.get("/marks/" + id);
  }
  static async updateBookMark(payload: any) {
    return ReaderApi.patch("/marks/change", payload);
  }
  static async getBookMarkForManga(id: any, userId: any) {
    return ReaderApi.get("/marks/manga/" + id + "?userId=" + userId);
  }
}
