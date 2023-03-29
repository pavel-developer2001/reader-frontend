import { rest } from "msw"
import { commentData } from "../data/comment-data"
import { API_URL } from "../../src/shared/config/index"

export const commentHandler = [
  rest.get(`${API_URL}comments/1`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(commentData))
  ),
]
