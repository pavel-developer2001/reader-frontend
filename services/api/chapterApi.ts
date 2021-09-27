import ReaderApi from "../ReaderApi";

export default class ChapterApi {
  static async createChapter(payload: any) {
    return ReaderApi.post("/chapters/addChapter", payload, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async getChaptersForManga(id: any) {
    return ReaderApi.get("/chapters/" + id);
  }
  static async getImagesForChapter(id: any) {
    return ReaderApi.get("/chapters/images/" + id);
  }
}
