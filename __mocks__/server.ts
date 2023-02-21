import { commentHandler } from "./handlers/comment-handler";
import { setupServer } from "msw/node";

const handlers = [...commentHandler];
export const server = setupServer(...handlers);
