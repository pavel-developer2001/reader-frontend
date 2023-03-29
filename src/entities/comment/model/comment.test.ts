import { commentData } from "../../../../__mocks__/data/comment-data"
import commentSlice, { getComments } from "./comment.slice"

describe("commentSlice", () => {
  const initialState = { comments: [], status: null, loading: true }
  test("should be get data with getComments.fulfilled", () => {
    const action = {
      type: getComments.fulfilled.type,
      payload: [],
    }
    const state = commentSlice(initialState, action)
    expect(state.loading).toBe(false)
  })
})
describe("comment Async Thunk", () => {
  let dispatch: jest.Mock<any, any>
  beforeEach(() => {
    dispatch = jest.fn()
  })
  test("should getComments with data", async () => {
    const thunk = getComments("1")
    // @ts-ignore
    await thunk(dispatch, () => ({}))
    const { calls } = dispatch.mock
    const [start, end] = calls
    expect(end[0].payload.data).toEqual(commentData)
  })
})
