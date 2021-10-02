import ReaderApi from "../ReaderApi";

export default class RatingApi {
  static async addRatingForManga(payload: any) {
    return ReaderApi.post("/rating/add", payload);
  }
  static async updateRatingForManga(payload: any) {
    return ReaderApi.patch("/rating/update", payload);
  }
  static async getRatingForManga(id: any, userId: any) {
    return ReaderApi.get("/rating/" + id + "?userId=" + userId);
  }
}
