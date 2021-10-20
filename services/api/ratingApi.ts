import ReaderApi from "../ReaderApi";

export default class RatingApi {
  static async addRatingForManga(payload: {
    rating: number;
    mangaId: string;
    userId: number;
  }) {
    return ReaderApi.post("/rating/add", payload);
  }
  static async updateRatingForManga(payload: {
    rating: number;
    mangaId: string;
    userId: number;
  }) {
    return ReaderApi.patch("/rating/update", payload);
  }
  static async getRatingForManga(id: string, userId: number) {
    return ReaderApi.get("/rating/" + id + "?userId=" + userId);
  }
}
