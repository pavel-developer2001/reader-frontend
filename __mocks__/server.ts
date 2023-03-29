import { setupServer } from "msw/node"
import { commentHandler } from "./handlers/comment-handler"

const handlers = [...commentHandler]
export const server = setupServer(...handlers)
