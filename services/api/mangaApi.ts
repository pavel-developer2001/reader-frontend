import ReaderApi from "../ReaderApi";

export default class MangaApi {
  static async createManga(payload: any) {
    return ReaderApi.post("/mangas/create", payload, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
