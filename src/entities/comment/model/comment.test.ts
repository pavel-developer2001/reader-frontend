import commentSlice, { getComments } from "./comment.slice";

describe("commentSlice", () => {
  const initialState = { comments: [], status: null, loading: true };
  test("should be get data with getComments.fulfilled", () => {
    const action = {
      type: getComments.fulfilled.type,
      payload: [],
    };
    const state = commentSlice(initialState, action);
    expect(state.loading).toBe(false);
  });
});
