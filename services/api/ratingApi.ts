import ReaderApi from "../ReaderApi";

export default class RatingApi {
  static async addRatingForManga(payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
  }) {
    return ReaderApi.post("/rating/add", payload);
  }

  static async updateRatingForManga(payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
  }) {
    return ReaderApi.patch("/rating/update", payload);
  }

  static async getRatingForManga(id: string | string[] | undefined) {
    return ReaderApi.get("/rating/" + id);
  }

  static async getRatingCountForManga(id: string | string[] | undefined) {
    return ReaderApi.get("/rating/count/" + id);
  }
}
