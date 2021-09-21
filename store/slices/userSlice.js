import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import UserApi from "../../services/api/userApi";

export const registerUsers = createAsyncThunk(
  "user/registerUsers",
  async (payload) => {
    return UserApi.registration(payload);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
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
    builder
      .addCase(registerUsers.fulfilled.type, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(HYDRATE, (state, action) => {
        state.posts = action.payload.user.posts;
      }),
});

export default userSlice.reducer;
export const { addCounter, setUsers } = userSlice.actions;
