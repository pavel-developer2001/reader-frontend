import ReaderApi from "../base"

export default class ChapterApi {
  static async createChapter(payload: FormData) {
    return ReaderApi.post("/chapters/addChapter", payload, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async getChaptersForManga(id: string | string[]) {
    return ReaderApi.get(`/chapters/${id}`)
  }

  static async getImagesForChapter(id: string | string[] | undefined) {
    return ReaderApi.get(`/chapters/images/${id}`)
  }

  static async getLaterChapters() {
    return ReaderApi.get("/chapters/")
  }
}
