import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import UserApi from "../../services/api/userApi";

export const registerUsers = createAsyncThunk(
  "user/registerUsers",
  async (payload) => {
    return await UserApi.registration(payload);
  }
);
export const loginUsers = createAsyncThunk(
  "user/loginUsers",
  async (payload) => {
    return await UserApi.login(payload);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    token: "",
    status: null,
    loading: true,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.user.push(action.payload.data.user);
        window.localStorage.setItem("token", action.payload.data.token);
        state.loading = false;
        state.token = action.payload.data.token;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.user.push(action.payload.data.user);
        window.localStorage.setItem("token", action.payload.data.token);
        state.loading = false;
        state.token = action.payload.data.token;
      }),
  // .addCase(HYDRATE, (state, action) => {
  //   state.posts = action.payload.user.posts;
  // }),
});

export default userSlice.reducer;
export const { setToken } = userSlice.actions;
