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
}
