import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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
    setUsers(state, action) {
      state.posts.push(action.payload);
    },
  },

  extraReducers: (builder) =>
    builder.addCase(HYDRATE, (state, action) => {
      state.posts = action.payload.user.posts;
    }),
});

export default userSlice.reducer;
export const { addCounter, setUsers } = userSlice.actions;
