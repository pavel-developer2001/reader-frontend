import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("user/getPosts", async () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: ["test", "test123", "test12te3"],
    counter: 0,
    status: null,
    loading: true,
    posts: [],
  },
  reducers: {
    addCounter(state) {
      state.counter++;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
      state.loading = false;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.loading = null;
    },
  },
});

export default userSlice.reducer;
export const { addCounter } = userSlice.actions;
