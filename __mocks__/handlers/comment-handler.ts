import { commentData } from "./../data/comment-data";
import { API_URL } from "./../../src/shared/config/index";
import { rest } from "msw";

export const commentHandler = [
  rest.get(`${API_URL}comments/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentData));
  }),
];
