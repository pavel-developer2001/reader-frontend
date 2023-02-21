import ReaderApi from "../base"

export default class CommentsApi {
  static async getAllCommentsForManga(id: string | string[]) {
    return ReaderApi.get("/comments/" + id)
  }
  static async addCommentForManga(payload: {
    commentText: string
    mangaId: string | string[] | undefined
    spoiler: boolean
  }) {
    return ReaderApi.post("/comments/add", payload)
  }
  static async updateCommentForManga(
    id: number,
    payload: { commentText: string; spoiler: boolean }
  ) {
    return ReaderApi.patch(`/comments/update/${id}`, payload)
  }
  static async deleteCommentForManga(id: number) {
    return ReaderApi.delete("/comments/" + id)
  }
}
