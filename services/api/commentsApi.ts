import ReaderApi from "../ReaderApi";

export default class CommentsApi {
  static async getAllCommentsForManga(id: number) {
    return ReaderApi.get("/comments/" + id);
  }
  static async addCommentForManga(payload: {
    commentText: string;
    mangaId: string;
    spoiler: boolean;
    userId: number;
  }) {
    return ReaderApi.post("/comments/add", payload);
  }
  static async updateCommentForManga(
    id: number,
    payload: { commentText: string; spoiler: boolean }
  ) {
    return ReaderApi.patch(`/comments/update/${id}`, payload);
  }
  static async deleteCommentForManga(id: number) {
    return ReaderApi.delete("/comments/" + id);
  }
}
