import ReaderApi from "../base";

export default class MangaApi {
  static async createManga(payload: FormData) {
    return ReaderApi.post("/mangas/create", payload, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async getAllManga() {
    return ReaderApi.get("/mangas/");
  }
  static async getManga(id: string | string[] | undefined) {
    return ReaderApi.get("/mangas/" + id);
  }
  static async searchManga(query: { title: string }) {
    return ReaderApi.get("/mangas/search", { params: query });
  }
}
